// Prüft auf Cyrils PC, ob das GEAK-Tool im lokalen Browser lädt (Azure-Schutz)
// und ob die Anmeldung im gespeicherten Profil besteht. Ändert nichts im GEAK-Tool.

import { GEAK_URL, starteBrowser, istAngemeldet, warteAufEnter } from '../src/browser.js';

const { kontext, seite } = await starteBrowser();

const abgelehnt = [];
seite.on('response', (antwort) => {
  if (antwort.status() === 403) abgelehnt.push(antwort.url());
});

await seite.goto(GEAK_URL, { waitUntil: 'networkidle', timeout: 60000 });
await seite.waitForTimeout(3000);

const programmteileBlockiert = abgelehnt.some((url) => url.includes('/_next/static/'));
const text = (await seite.locator('body').innerText()).trim();

if (programmteileBlockiert || text.length === 0) {
  console.log('✗ Das GEAK-Tool lädt nicht (Zugriffsschutz). Abgelehnt:');
  for (const url of abgelehnt) console.log('   ', url.slice(0, 100));
  console.log('Nichts umgehen – Ergebnis an Claude melden (siehe Entscheid 0001).');
} else {
  console.log('✓ Das GEAK-Tool lädt.');
  if (!(await istAngemeldet(seite))) {
    await warteAufEnter('Bitte im Browserfenster mit dem Unterstützer-Account anmelden, dann hier Enter drücken … ');
    await seite.waitForLoadState('networkidle');
  }
  console.log((await istAngemeldet(seite)) ? '✓ Angemeldet – das Profil merkt sich die Anmeldung.' : '✗ Keine Anmeldung erkannt.');
  console.log('Seitentitel:', await seite.title(), '| Adresse:', seite.url().split('?')[0]);
}

await kontext.close();
