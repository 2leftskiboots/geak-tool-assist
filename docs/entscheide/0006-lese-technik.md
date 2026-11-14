# 0006 – Lese-Technik: Antwort der Seite mitlesen

- Datum: 2026-11-14
- Status: vorgeschlagen (wartet auf OK Cyril)
- Etappe: E01

## Frage

Wie liest der Assist ein Projekt aus dem GEAK-Tool: den sichtbaren Seiteninhalt (Text, Felder) oder die Daten, die die Seite selbst abruft?

## Befund (Erkundung 2026-11-14, GEAK 7.0.1)

- Öffnet man ein Projekt (`/portfolio/{id}`), ruft die Seite **eine** Datenabfrage ab: `GET /api/projects/{id}`. Die Antwort (JSON, ca. 400 KB) enthält das ganze Projekt: Auftraggeberschaft, Standort, Gebäude, Ist-Zustand mit allen Bauteilen und Haustechnik, Massnahmen, Varianten, Tarife, Förderbeiträge, Kosten, Ergebnisse, Texte, Aufbauten (U-Werte) und die Prüfergebnisse des Tools.
- Die Reiter laden nur Hilfsdaten nach (Länderliste, Wetterstationen, Glossar, Fotos).
- Die Projektliste kommt ebenfalls so (`GET /api/portfolio/findprojects`).

## Entscheid

Der Assist **liest die Antwort mit, die die Seite im sichtbaren Edge ohnehin abruft** (Playwright `waitForResponse`). Er schickt keine eigenen Abfragen und ruft keine Adresse auf, die die Seite nicht selbst aufruft.

## Begründung

- Vollständig und genau: Jeder Wert steht im Datensatz, nichts geht durch das Abschreiben von Bildschirmtext verloren, und Zahlen, Auswahlwerte und Kennungen sind eindeutig.
- Robust: Sichtbare Texte und Layout ändern sich bei Releases eher als der Datensatz.
- Umgeht nichts: Dieselbe Sitzung, derselbe Browser, derselbe Seitenaufruf wie bei Cyril von Hand. Der Zugriffsschutz (Azure WAF, reCAPTCHA) wird weder angetastet noch getarnt.
- Nur lesen: Es wird nur mitgeschrieben. Der Assist klickt nichts, was speichert.
- Wartung (0004): Der Datensatz hat feste Feldnamen. Die Feldkarte prüft sie bei jedem Lesen und meldet fehlende oder unbekannte Felder.

## Folgen

- Die Namen im Datensatz sind englisch und technisch (`ExteriorWalls`, `GValue`). Der Feldkatalog ordnet sie den Reitern und Beschriftungen des Tools zu.
- **Schreiben (E06 ff.) ist ein anderes Thema**: Dort wird über die Oberfläche geschrieben, nicht über die Datenabfragen. Das wird in E06 separat entschieden.
- Ausgelesene Projektdaten liegen in `daten/projekte/` (nicht eingecheckt, Kundendaten, Ordner liegt auf Cyrils PC).
- Auswahlwerte (Aufzählungen) zeigt der Datensatz nur so weit, wie sie im gelesenen Projekt vorkommen. Vollständige Listen holt E06 aus den Auswahllisten der Oberfläche.
- Fotos: Der Datensatz enthält nur die Foto-Kennungen (`ImageKey…`). Die Bilddateien holt E09.

## Verworfen

- **Sichtbaren Text abschreiben:** unvollständig, anfällig, Aufwand je Feld.
- **Eigene Abfragen an `/api/` schicken:** wäre technisch möglich, geht aber über das hinaus, was die Seite selbst tut, und liegt näher am Zugriffsschutz. Nicht nötig.
