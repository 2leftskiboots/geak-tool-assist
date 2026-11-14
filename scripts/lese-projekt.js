// Liest ein Projekt aus dem GEAK-Tool aus und legt es lokal ab (nur lesen).
// Aufruf:  npm run lese-projekt            (nimmt das Projekt, wenn die Liste nur eines enthält)
//          npm run lese-projekt -- 567444  (bestimmtes Projekt)
// Ablage:  daten/projekte/<ID>/projekt.json und zusammenfassung.txt (nicht eingecheckt, Kundendaten)

import { starteBrowser, oeffneGeak } from '../src/browser.js';
import { leseProjektliste, leseProjekt, speichereProjekt, zusammenfassung } from '../src/geak/lesen.js';

const { kontext, seite } = await starteBrowser();
try {
  await oeffneGeak(seite);
  let id = Number(process.argv[2]);
  if (!id) {
    const liste = await leseProjektliste(seite);
    if (liste.length !== 1) {
      console.log(`Die Projektliste hat ${liste.length} Einträge. Bitte die ID angeben:`);
      for (const p of liste) console.log(`  ${p.id}  ${p.projektnummer}  ${p.objekt}`);
      process.exitCode = 1;
    } else {
      id = liste[0].id;
    }
  }
  if (id) {
    const ergebnis = await leseProjekt(seite, id);
    const datei = speichereProjekt(ergebnis);
    console.log(zusammenfassung(ergebnis).join('\n'));
    console.log(`\n✓ Gespeichert: ${datei}`);
  }
} catch (fehler) {
  console.error('✗', fehler.message);
  process.exitCode = 1;
} finally {
  await kontext.close();
}
