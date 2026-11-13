# 0002 – Automatische Anmeldung mit lokalen Umgebungsvariablen

- Datum: 2026-11-13
- Status: angenommen (getestet auf Cyrils PC am 2026-11-14)
- Ergänzt 0001 (dort: Anmeldung nur von Hand)

## Ausgangslage

Nach 0001 meldet sich Cyril im Edge-Fenster von Hand an, das Profil merkt sich die Anmeldung. Laut Cyril verliert das GEAK-Tool die Anmeldung aber immer wieder. Er möchte später auch über Remote Control (z. B. vom Handy) arbeiten, ohne am PC zu sein.

## Grundlage

- Rückmeldung Cyril vom 2026-11-13.
- Die Claude-Desktop-App kennt **lokale Umgebungen** mit eigenen Umgebungsvariablen. Diese bleiben auf Cyrils PC und gelangen nicht ins Repository (Regel «Secrets nie ins Repository» bleibt eingehalten).
- Der Unterstützer-Account kann nicht veröffentlichen und nicht löschen; das Risiko bei Missbrauch ist begrenzt.

## Entscheid

- Lokale Umgebung «GEAK-Tool-Assist» in der Desktop-App, Ordner `geak-tool-assist`, mit den Variablen `GEAK_USER` und `GEAK_PASSWORT`.
- `oeffneGeak()` in `src/browser.js`: zuerst gespeichertes Profil; ist es abgemeldet, Anmeldung mit den Variablen; klappt das nicht (z. B. reCAPTCHA), Anmeldung von Hand bzw. klare Fehlermeldung, wenn niemand am Terminal ist.
- Passwort wird nie ausgegeben oder protokolliert, nur «gesetzt ja/nein».

## Konsequenzen

- Über Remote Control kann ohne Anwesenheit am PC gearbeitet werden, solange das GEAK-Tool beim Login kein reCAPTCHA verlangt. Verlangt es eines, wird das nicht umgangen: Cyril meldet sich am PC an.
- Login-Formular auf `/login`: Felder `#Username` und `#Password`, Knopf «Login» (geprüft 2026-11-14). Ändert das GEAK-Tool das Formular, `src/browser.js` anpassen.
- Test 2026-11-14: im Profil abgemeldet, `npm run test-zugang` meldet sich automatisch an und landet auf `/portfolio`. Kein reCAPTCHA beim Login.
- Ändert Cyril das Passwort, muss er es in der lokalen Umgebung nachführen.
