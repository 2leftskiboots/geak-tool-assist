# geak-tool-assist

KI-Unterstützung beim Ausfüllen des GEAK-Tools für DTplan. Läuft lokal auf dem PC mit sichtbarem Edge-Fenster; Veröffentlichen bleibt Handarbeit (Entscheid 0001).

## Einrichten (einmalig, Windows)

```
cd C:\Users\CyrilDegenDTplan\code
git clone https://github.com/2leftskiboots/geak-tool-assist.git
cd geak-tool-assist
npm install
```

Edge ist auf Windows vorhanden, ein zusätzlicher Browser-Download ist nicht nötig.

## Zugang testen

```
npm run test-zugang
```

Öffnet das GEAK-Tool in einem eigenen Edge-Fenster. Beim ersten Mal im Fenster mit dem Unterstützer-Account anmelden und im Terminal Enter drücken. Die Anmeldung bleibt im Profil `%LOCALAPPDATA%\geak-tool-assist\profil` gespeichert (ausserhalb des Repositorys).

## Automatische Anmeldung (Entscheid 0002)

In der Claude-Desktop-App eine **lokale** Umgebung «GEAK-Tool-Assist» mit dem Ordner `geak-tool-assist` anlegen und unter Umgebungsvariablen `GEAK_USER` und `GEAK_PASSWORT` eintragen. Ist das Profil abgemeldet, meldet sich das Skript damit an. Verlangt das GEAK-Tool ein reCAPTCHA, wird von Hand angemeldet.
