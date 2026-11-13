// Prüft auf Cyrils PC, ob das GEAK-Tool im lokalen Browser lädt (Azure-Schutz)
// und ob die Anmeldung klappt (Profil, Umgebungsvariablen oder von Hand).
// Ändert nichts im GEAK-Tool.

import { starteBrowser, oeffneGeak } from '../src/browser.js';

const { kontext, seite } = await starteBrowser();

const abgelehnt = [];
seite.on('response', (antwort) => {
  if (antwort.status() === 403) abgelehnt.push(antwort.url());
});

const ART = {
  profil: 'Profil war noch angemeldet',
  automatisch: 'automatisch mit GEAK_USER / GEAK_PASSWORT angemeldet',
  hand: 'von Hand angemeldet',
};

try {
  const art = await oeffneGeak(seite);
  console.log('✓ Das GEAK-Tool lädt.');
  console.log(`✓ Angemeldet (${ART[art]}).`);
  console.log('Seitentitel:', await seite.title(), '| Adresse:', seite.url().split('?')[0]);
} catch (fehler) {
  if (abgelehnt.some((url) => url.includes('/_next/static/'))) {
    console.log('✗ Das GEAK-Tool lädt nicht (Zugriffsschutz). Nichts umgehen – Ergebnis an Claude melden.');
  } else {
    console.log('✗', fehler.message);
  }
  console.log('Umgebungsvariablen gesetzt:', process.env.GEAK_USER ? 'GEAK_USER ja' : 'GEAK_USER nein', '/', process.env.GEAK_PASSWORT ? 'GEAK_PASSWORT ja' : 'GEAK_PASSWORT nein');
  process.exitCode = 1;
}

await kontext.close();
