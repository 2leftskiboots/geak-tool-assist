// Gemeinsamer Browserstart für alle Skripte (Entscheid 0001):
// sichtbares Edge mit eigenem, gespeichertem Profil ausserhalb des Repositorys.
// Kein Passwort im Code: Cyril meldet sich im Fenster selbst an.

import { chromium } from 'playwright';
import path from 'node:path';
import os from 'node:os';
import readline from 'node:readline/promises';

export const GEAK_URL = 'https://www.geak-tool.ch/';

export function profilOrdner() {
  const basis = process.env.LOCALAPPDATA || path.join(os.homedir(), '.local', 'share');
  return path.join(basis, 'geak-tool-assist', 'profil');
}

export async function starteBrowser() {
  const kontext = await chromium.launchPersistentContext(profilOrdner(), {
    channel: process.env.GEAK_BROWSER || 'msedge',
    headless: false,
    viewport: null,
    locale: 'de-CH',
  });
  const seite = kontext.pages()[0] || (await kontext.newPage());
  return { kontext, seite };
}

// Angemeldet: nach dem Login leitet das GEAK-Tool auf /portfolio weiter
// (Test 2026-11-13). Zusätzlich darf kein Passwortfeld sichtbar sein.
export async function istAngemeldet(seite) {
  const passwortFelder = await seite.locator('input[type=password]:visible').count();
  return passwortFelder === 0 && new URL(seite.url()).pathname.startsWith('/portfolio');
}

// Öffnet das GEAK-Tool und sorgt für eine Anmeldung (Entscheid 0002):
// 1. Profil ist noch angemeldet → fertig.
// 2. Sonst mit GEAK_USER / GEAK_PASSWORT aus der lokalen Umgebung der Desktop-App anmelden.
// 3. Klappt das nicht (z. B. reCAPTCHA): nichts umgehen, Cyril meldet sich von Hand an.
export async function oeffneGeak(seite) {
  await seite.goto(GEAK_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await seite.waitForTimeout(2000);
  if (await istAngemeldet(seite)) return 'profil';

  const benutzer = process.env.GEAK_USER;
  const passwort = process.env.GEAK_PASSWORT;
  if (benutzer && passwort) {
    // OFFEN: Feldnamen des Login-Formulars noch nicht bekannt; allgemeine Auswahl,
    // nach dem ersten Lauf auf Cyrils PC an die echten Felder anpassen.
    const passwortFeld = seite.locator('input[type=password]:visible').first();
    const benutzerFeld = seite
      .locator('input[type=email]:visible, input[name*=user i]:visible, input[name*=mail i]:visible, input[type=text]:visible')
      .first();
    if ((await passwortFeld.count()) && (await benutzerFeld.count())) {
      await benutzerFeld.fill(benutzer);
      await passwortFeld.fill(passwort);
      await passwortFeld.press('Enter');
      try {
        await seite.waitForURL((url) => url.pathname.startsWith('/portfolio'), { timeout: 30000 });
        if (await istAngemeldet(seite)) return 'automatisch';
      } catch {
        // weiter zur Anmeldung von Hand
      }
    }
    console.log('Automatische Anmeldung hat nicht geklappt (evtl. reCAPTCHA oder andere Felder).');
  }

  if (!process.stdin.isTTY) {
    throw new Error('Nicht angemeldet. Bitte im Edge-Fenster von Hand anmelden und erneut starten.');
  }
  await warteAufEnter('Bitte im Browserfenster mit dem Unterstützer-Account anmelden, dann hier Enter drücken … ');
  await seite.waitForLoadState('networkidle');
  if (await istAngemeldet(seite)) return 'hand';
  throw new Error('Keine Anmeldung erkannt.');
}

export async function warteAufEnter(frage) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await rl.question(frage);
  rl.close();
}
