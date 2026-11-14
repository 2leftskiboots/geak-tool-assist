// npm run foerder-pruefen
// Prüft alle Dateien der Förderdatenbank formal und zeigt eine Übersicht über die 45 Gemeinden.
import { ladeAlle, pruefeDatei } from '../src/foerderdaten.js';

const { gemeinden, kanton, bund, liste } = ladeAlle();
const meldungen = [];

for (const g of gemeinden) meldungen.push(...pruefeDatei(g));
for (const e of [kanton, bund]) if (e) meldungen.push(...pruefeDatei(e, { gemeinde: false }));
if (!kanton) meldungen.push('kanton-bern.json fehlt');
if (!bund) meldungen.push('bund.json fehlt');

const vorhanden = new Map(gemeinden.map((g) => [g.daten.bfs, g.daten]));
console.log('Gemeinden im Umkreis 10 km von Thun:\n');
console.log('BFS  Gemeinde                  Status         Programme  Abgerufen');
let fehlend = 0;
for (const g of liste.gemeinden) {
  const d = vorhanden.get(g.bfs);
  if (!d) {
    fehlend++;
    console.log(`${String(g.bfs).padEnd(4)} ${g.name.padEnd(24)} FEHLT`);
    continue;
  }
  console.log(`${String(g.bfs).padEnd(4)} ${g.name.padEnd(24)} ${String(d.status).padEnd(14)} ${String((d.programme || []).length).padStart(9)}  ${d.abgerufen}`);
}
const offen = gemeinden.reduce((n, g) => n + (g.daten.offen || []).length, 0);
console.log(`\n${liste.gemeinden.length - fehlend}/${liste.gemeinden.length} Gemeinden erfasst, ${offen} offene Punkte in den Dateien.`);
if (meldungen.length) {
  console.log(`\n${meldungen.length} Meldung(en):`);
  for (const m of meldungen) console.log(' - ' + m);
  process.exitCode = 1;
} else {
  console.log('Formal in Ordnung.');
}
