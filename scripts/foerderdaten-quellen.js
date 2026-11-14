// npm run foerder-quellen
// Quellenwächter: lädt jedes Originaldokument der Förderdatenbank (nur lesend, im Speicher),
// bildet einen Fingerabdruck (SHA-256 des Inhalts) und vergleicht mit dem letzten Lauf.
// Geänderte oder nicht mehr erreichbare Dokumente werden gemeldet; sie müssen in einer
// Aktualisierungs-Sitzung neu gelesen werden. Nichts wird auf Platte gespeichert ausser
// foerderdaten/quellen/fingerabdruecke.json (nur Hashes, Datum, Statuscode).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ladeAlle, WURZEL } from '../src/foerderdaten.js';

const DATEI = join(WURZEL, 'quellen', 'fingerabdruecke.json');
const heute = new Date().toISOString().slice(0, 10);
const alt = existsSync(DATEI) ? JSON.parse(readFileSync(DATEI, 'utf8')) : {};
const neu = {};

const { gemeinden, kanton, bund } = ladeAlle();
const quellen = new Map(); // url -> Träger
for (const { daten } of [...gemeinden, kanton, bund].filter(Boolean)) {
  for (const d of daten.dokumente || []) if (d.url) quellen.set(d.url, daten.traeger);
}

async function hole(url) {
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'geak-tool-assist/0.1 (Foerderdaten-Quellenwaechter, lesend)' }, signal: AbortSignal.timeout(30000) });
    const buf = Buffer.from(await r.arrayBuffer());
    return { status: r.status, bytes: buf.length, hash: r.ok ? createHash('sha256').update(buf).digest('hex') : null };
  } catch (e) {
    return { status: 0, bytes: 0, hash: null, fehler: String(e.message || e) };
  }
}

const bericht = { neu: [], geaendert: [], gleich: 0, fehler: [] };
for (const [url, traeger] of quellen) {
  const r = await hole(url);
  neu[url] = { traeger, datum: heute, ...r };
  const v = alt[url];
  if (!r.hash) bericht.fehler.push(`${traeger}: ${url} (Status ${r.status}${r.fehler ? ', ' + r.fehler : ''})`);
  else if (!v || !v.hash) bericht.neu.push(`${traeger}: ${url}`);
  else if (v.hash !== r.hash) bericht.geaendert.push(`${traeger}: ${url} (zuletzt gleich am ${v.datum})`);
  else bericht.gleich++;
  await new Promise((res) => setTimeout(res, 500)); // höflich: kein Dauerfeuer auf Gemeindeseiten
}

mkdirSync(join(WURZEL, 'quellen'), { recursive: true });
writeFileSync(DATEI, JSON.stringify(neu, null, 2) + '\n');

console.log(`${quellen.size} Dokumente geprüft: ${bericht.gleich} unverändert, ${bericht.geaendert.length} geändert, ${bericht.neu.length} neu erfasst, ${bericht.fehler.length} nicht erreichbar.`);
for (const [t, l] of [['Geändert (neu lesen!)', bericht.geaendert], ['Neu erfasst', bericht.neu], ['Nicht erreichbar', bericht.fehler]]) {
  if (l.length) console.log(`\n${t}:\n` + l.map((x) => ' - ' + x).join('\n'));
}
console.log('\nHinweis: Seiten mit wechselndem Inhalt (Datum, Zähler) können als «geändert» erscheinen; dann in der Aktualisierungs-Sitzung kurz gegenlesen.');
