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

export async function warteAufEnter(frage) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await rl.question(frage);
  rl.close();
}
