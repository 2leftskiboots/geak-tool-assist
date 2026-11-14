# CLAUDE.md

Kontext für Claude Code in diesem Repository.

## Projekt

KI-Unterstützung beim Ausfüllen des GEAK-Tools (`www.geak-tool.ch`) für DTplan (Cyril Degen, GEAK-Experte, Thun). Gearbeitet wird mit einem **Unterstützer-Account**: Er kann Projekte bearbeiten, aber nicht veröffentlichen und nicht löschen. Die Nutzung durch eine KI ist mit dem Betreiber abgesprochen. Veröffentlichen macht immer Cyril selbst.

Verwandte Repositories: `2leftskiboots/dtplan` (Offert- und Rechnungstool, Projektdaten in `formular_original.json`).

Cyril programmiert selbst wenig: Entscheide kurz und verständlich erklären.

## Masterplan

**Vor jeder Arbeit lesen:** `docs/masterplan.md` (Ziel, Bausteine, Grundsätze, Etappen) und die Datei der eigenen Etappe in `docs/etappen/`. Etappen-Sitzungen bleiben im Umfang ihrer Etappe, setzen am Ende Status und Ergebnis und notieren Planabweichungen unter «Rückmeldungen an den Masterplan». Den Masterplan selbst ändert nur die Masterplan-Sitzung, mit Entscheid.

Kernsätze (0003): Das GEAK-Tool ist Master (vor jeder Änderung auslesen). Das Übergabeformat vom Destillation Tool gibt der Assist vor. Fehlende Daten: Standardwert, markieren, gesammelt zeigen. Varianten gibt Cyril vor. Erst lesen und prüfen, dann schreiben. Wartung (0004): Feldzugriffe nur über die Feldkarte; unbekanntes Feld → nicht speichern, melden; neue GEAK-Version in der Fusszeile → nur lesend arbeiten, bis die Wartung sie bestätigt hat (Release Notes: `https://www.geak-tool.ch/expertInfo`).

## Konventionen

- Sprache für Dokumentation, Commit-Messages und fachliche Begriffe: Deutsch (Schweizer Schreibweise, «ss» statt «ß»).
- **Jeder Design- oder Fachentscheid wird mit Begründung festgehalten** in `docs/entscheide/NNNN-titel.md` (Vorlage `0000-vorlage.md`). Commit-Messages nennen den Grund.
- Unklare fachliche Punkte nicht raten: mit `// OFFEN:` markieren und melden.
- Etappe für Etappe arbeiten; nach jeder Etappe Zusammenfassung und auf OK warten.
- **Nie veröffentlichen, einreichen oder löschen** im GEAK-Tool, auch wenn es technisch möglich wäre. Vor dem Speichern grösserer Änderungen zeigen, was geändert wird.
- **Secrets nie ins Repository.** Zugangsdaten nur als `GEAK_USER` / `GEAK_PASSWORT` in der lokalen Umgebung der Desktop-App (0002); nie ausgeben oder protokollieren.
- **Git selbständig:** pullen, committen, pushen und in `main` übernehmen, ohne nachzufragen (Cyril, 2026-11-14). Nur melden bei grossem Risiko (Konflikte, die Inhalte überschreiben könnten, Force-Push, Löschen von Branches oder Historie).
- Den Zugriffsschutz des GEAK-Tools (Azure WAF, reCAPTCHA) nie umgehen oder tarnen. Wird blockiert: melden, Betreiber fragen.

## Technik

- Node.js, Playwright. Läuft **lokal auf Cyrils Windows-PC** mit sichtbarem Edge (`channel: 'msedge'`) und gespeichertem Browserprofil unter `%LOCALAPPDATA%\geak-tool-assist\profil` (ausserhalb des Repositorys). Begründung: Entscheid 0001.
- Gemeinsam: `src/browser.js` – `starteBrowser()`, `oeffneGeak()` (Profil → Umgebungsvariablen → von Hand, 0002).
- `src/geak/feldkarte.js` (alle Feldzugriffe, erwartete Struktur), `src/geak/lesen.js` (Lesen). `npm run lese-projekt [-- ID]` liest ein Projekt aus (Antwort der Seite mitlesen, Entscheid 0006) nach `daten/projekte/` (nicht eingecheckt, Kundendaten). `npm run feldkatalog` erzeugt `docs/geak-tool/feldkatalog.md`.
- `npm run test-zugang`: prüft, ob das GEAK-Tool lädt und wie die Anmeldung zustande kam.
- Gearbeitet wird in der **lokalen** Umgebung «GEAK-Tool-Assist» der Desktop-App (auch per Remote Control). Aus der Cloud blockiert das GEAK-Tool den Zugriff (0001).
- Unter Windows liegt Node in `C:\Program Files\nodejs`; Repo lokal unter `C:\Users\CyrilDegenDTplan\code\geak-tool-assist`.

## Stand (2026-11-14)

Grundgerüst angelegt; Zugang auf Cyrils PC getestet und bestätigt (Entscheid 0001 angenommen). Nach der Anmeldung landet man auf `/portfolio` («GEAK Portfolio»). Anmeldung bleibt im Profil erhalten (zweiter Test ohne Login). Weiterarbeit in einer lokalen Claude-Code-Sitzung auf Cyrils PC. Automatische Anmeldung (0002) getestet und angenommen: Abmelden über «Abmelden» oben rechts führt auf `/login`, das Skript meldet sich mit `#Username` / `#Password` wieder an (kein reCAPTCHA). Masterplan erstellt (0003 angenommen), Wartung ergänzt (0004 angenommen). E01 gebaut (2026-11-14): Projekt 567444 vollständig gelesen; wartet auf Stichproben und OK von Cyril, Entscheid 0006 (Lese-Technik) wartet auf OK. Danach: W01 und E02.
