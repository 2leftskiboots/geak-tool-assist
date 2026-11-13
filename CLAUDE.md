# CLAUDE.md

Kontext für Claude Code in diesem Repository.

## Projekt

KI-Unterstützung beim Ausfüllen des GEAK-Tools (`www.geak-tool.ch`) für DTplan (Cyril Degen, GEAK-Experte, Thun). Gearbeitet wird mit einem **Unterstützer-Account**: Er kann Projekte bearbeiten, aber nicht veröffentlichen und nicht löschen. Die Nutzung durch eine KI ist mit dem Betreiber abgesprochen. Veröffentlichen macht immer Cyril selbst.

Verwandte Repositories: `2leftskiboots/dtplan` (Offert- und Rechnungstool, Projektdaten in `formular_original.json`).

Cyril programmiert selbst wenig: Entscheide kurz und verständlich erklären.

## Konventionen

- Sprache für Dokumentation, Commit-Messages und fachliche Begriffe: Deutsch (Schweizer Schreibweise, «ss» statt «ß»).
- **Jeder Design- oder Fachentscheid wird mit Begründung festgehalten** in `docs/entscheide/NNNN-titel.md` (Vorlage `0000-vorlage.md`). Commit-Messages nennen den Grund.
- Unklare fachliche Punkte nicht raten: mit `// OFFEN:` markieren und melden.
- Etappe für Etappe arbeiten; nach jeder Etappe Zusammenfassung und auf OK warten.
- **Nie veröffentlichen, einreichen oder löschen** im GEAK-Tool, auch wenn es technisch möglich wäre. Vor dem Speichern grösserer Änderungen zeigen, was geändert wird.
- **Secrets nie ins Repository.** Kein Passwort im Code; Cyril meldet sich im Browserfenster selbst an (siehe 0001).
- Den Zugriffsschutz des GEAK-Tools (Azure WAF, reCAPTCHA) nie umgehen oder tarnen. Wird blockiert: melden, Betreiber fragen.

## Technik

- Node.js, Playwright. Läuft **lokal auf Cyrils Windows-PC** mit sichtbarem Edge (`channel: 'msedge'`) und gespeichertem Browserprofil unter `%LOCALAPPDATA%\geak-tool-assist\profil` (ausserhalb des Repositorys). Begründung: Entscheid 0001.
- Gemeinsamer Browserstart: `src/browser.js`.
- `npm run test-zugang`: prüft, ob das GEAK-Tool lädt und ob die Anmeldung besteht.
- In der Cloud-Sitzung (Umgebung «GEAK Tool Assist») blockiert das GEAK-Tool den Zugriff; dort nur Code schreiben, nicht gegen das GEAK-Tool testen.
- Unter Windows liegt Node in `C:\Program Files\nodejs`; Repo lokal unter `C:\Users\CyrilDegenDTplan\code\geak-tool-assist`.

## Stand (2026-11-13)

Grundgerüst angelegt; Zugang auf Cyrils PC getestet und bestätigt (Entscheid 0001 angenommen). Nach der Anmeldung landet man auf `/portfolio` («GEAK Portfolio»). Noch zu bestätigen: Anmeldung bleibt beim nächsten Start im Profil erhalten. Nächste Etappe: festlegen, welche Teile des GEAK ausgefüllt werden.
