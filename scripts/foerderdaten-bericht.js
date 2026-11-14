// npm run foerder-bericht
// Änderungsbericht gegenüber dem letzten Stand (Vormonat): vergleicht die Förderdaten mit
// foerderdaten/berichte/letzter-stand.json, schreibt foerderdaten/berichte/JJJJ-MM.md und
// setzt den Stand neu. Mit --nur-anzeigen wird nichts geschrieben.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ladeAlle, flach, vergleiche, WURZEL } from '../src/foerderdaten.js';

const nurAnzeigen = process.argv.includes('--nur-anzeigen');
const dir = join(WURZEL, 'berichte');
const standDatei = join(dir, 'letzter-stand.json');
const heute = new Date().toISOString().slice(0, 10);

const neu = flach(ladeAlle());
const hatAlt = existsSync(standDatei);
const alt = hatAlt ? JSON.parse(readFileSync(standDatei, 'utf8')).werte : {};
const alterTag = hatAlt ? JSON.parse(readFileSync(standDatei, 'utf8')).datum : null;
const d = vergleiche(alt, neu);

const zeile = (k) => '- ' + k.replaceAll('|', ' › ');
let md = `# Änderungsbericht Förderdatenbank ${heute}\n\n`;
md += hatAlt ? `Vergleich mit dem Stand vom ${alterTag}.\n\n` : 'Erster Lauf: alle Einträge gelten als neu (kein Vormonat zum Vergleichen).\n\n';
md += `- neu: ${d.neu.length}\n- geändert: ${d.geaendert.length}\n- entfallen: ${d.weg.length}\n`;
if (hatAlt) {
  for (const [t, l] of [['Geändert', d.geaendert], ['Neu', d.neu], ['Entfallen', d.weg]]) {
    if (l.length) md += `\n## ${t}\n\n${l.map(zeile).join('\n')}\n`;
  }
}
console.log(md);

if (!nurAnzeigen) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${heute.slice(0, 7)}.md`), md);
  writeFileSync(standDatei, JSON.stringify({ datum: heute, werte: neu }, null, 1) + '\n');
  console.log(`Bericht geschrieben: foerderdaten/berichte/${heute.slice(0, 7)}.md`);
}
