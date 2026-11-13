# 0001 – Lokaler Browser auf Cyrils PC statt Cloud

- Datum: 2026-11-13
- Status: angenommen (Test auf Cyrils PC am 2026-11-13 erfolgreich)

## Ausgangslage

Claude soll Cyril beim Ausfüllen des GEAK-Tools (`www.geak-tool.ch`) unterstützen. Dafür gibt es einen Unterstützer-Account (Benutzername und Passwort, keine Zwei-Faktor-Bestätigung). Er kann Projekte bearbeiten, aber nicht veröffentlichen und nicht löschen; die Nutzung durch eine KI ist mit dem Betreiber abgesprochen.

Geplant war zuerst, dass sich Claude in einer Cloud-Umgebung («GEAK Tool Assist», nur `geak-tool.ch` freigegeben) selbst anmeldet, mit Zugangsdaten als Umgebungsvariablen.

## Grundlage

Test vom 2026-11-13 aus der Cloud-Umgebung mit Playwright:

- Vor dem GEAK-Tool steht eine Azure Web Application Firewall mit JavaScript-Prüfung. Die Prüfung wird bestanden, die Programmteile der Seite (`/_next/static/...`) werden danach aber mit 403 abgelehnt. Die Seite bleibt leer, kein Login sichtbar.
- Die Sicherheitsrichtlinie der Seite erlaubt Google reCAPTCHA; beim Login ist eine «Ich bin kein Roboter»-Prüfung möglich.
- Wahrscheinliche Ursache: Zugriff aus einem Rechenzentrum mit unsichtbarem Browser.

Test vom 2026-11-13 auf Cyrils PC (`npm run test-zugang`): Seite lädt, Anmeldung von Hand im Edge-Fenster, danach Weiterleitung auf `/portfolio` (Titel «GEAK Portfolio»).

Den Schutz zu umgehen (Browser tarnen o. ä.) kommt nicht in Frage: Der Betreiber will genau das verhindern, die Absprache betrifft den Account, nicht die Technik.

## Entscheid

Playwright läuft **lokal auf Cyrils PC**:

- sichtbares Edge-Fenster (`channel: 'msedge'`, auf Windows vorhanden, kein Browser-Download),
- eigenes, gespeichertes Browserprofil unter `%LOCALAPPDATA%\geak-tool-assist\profil` (ausserhalb des Repositorys),
- **kein gespeichertes Passwort**: Ist die Anmeldung abgelaufen, öffnet das Skript die Login-Seite und wartet, bis Cyril sich angemeldet hat. Das Profil merkt sich die Anmeldung.

Verworfen:

- Cloud mit Passwort in Umgebungsvariablen: vom Zugriffsschutz blockiert.
- Eingebauter Browser der Claude-Desktop-App ohne Skript: geht auch, aber langsamer und nicht wiederholbar; bleibt als Ausweichweg.

## Konsequenzen

- Läuft nur, wenn Cyrils PC an ist. Cyril sieht zu, was ausgefüllt wird.
- Das Passwort liegt nirgends, reCAPTCHA löst Cyril selbst.
- Blockiert das GEAK-Tool auch lokal: nichts tarnen, beim Betreiber (Verein GEAK / ELCA) Freischaltung oder Schnittstelle anfragen.
- Die Cloud-Umgebung «GEAK Tool Assist» bleibt bestehen für den Fall, dass der Betreiber später eine Schnittstelle anbietet; Cloud-Sitzungen schreiben nur Code.
