# E03 – Förderdatenbank

- Status: gebaut, Abnahme durch Cyril offen (Stichproben, Nachprüfung von 6 Gemeinden)
- Meilenstein: M1 Prüfassistent
- Hängt ab von: – (parallel zu E01/E02 möglich)

## Ziel

Eine lokale Datei mit den aktuellen Förderprogrammen, auf die der Assist zurückgreift, statt jedes Mal neu zu recherchieren.

## Umfang

- Ebenen: **Bund** (u. a. PV), **Kanton Bern**, **Gemeinden der Region Thun** mit eigenen Programmen.
- Je Programm: Träger, Massnahme, Bedingungen, Ansatz (Fr. pro m², kW, pauschal …), Maximalbeträge, Kombinierbarkeit, gültig ab/bis, Quelle (URL), Abrufdatum.
- Routine, die die Daten **monatlich** aktualisiert und Änderungen gegenüber dem Vormonat anzeigt.

## Nicht im Umfang

- Beiträge für ein Projekt bestimmen und prüfen (E04) oder eintragen (E08).

## Fertig, wenn

- [x] Datei für Bund, Kanton Bern und die festgelegten Gemeinden vorhanden (45 Gemeinden, `foerderdaten/`)
- [ ] monatliche Aktualisierung eingerichtet (Werkzeuge laufen, erster Lauf mit Bericht gemacht; geplante Aufgabe wartet auf OK Cyril)
- [ ] Cyril hat Stichproben gegen die Originalquellen geprüft

## Offene Punkte

- ERLEDIGT (Entscheid 0007): Gemeindeliste = 45 Gemeinden im 10-km-Umkreis; Format JSON im Repository.
- OFFEN: Wo die monatliche Routine läuft (Vorschlag: geplante Aufgabe in der Desktop-App auf Cyrils PC).
- OFFEN: 6 Gemeinden sind `unklar`, weil ihre Reglementssammlung nicht abrufbar war: Wichtrach, Wimmis, Heiligenschwendi, Oberhofen, Sigriswil, Thierachern. Im Browser sichten oder bei der Gemeinde nachfragen.
- OFFEN: Bei 33 Gemeinden steht `kein_programm`. Belegt sind Reglementsliste und Konzessionsabgabe; schwächer bei Hilterfingen, Wachseldorn, Därstetten, Wattenwil, Eriz (Hinweise in Suchvorschauen) sowie Buchholterberg, Stocken-Höfen, Kirchdorf (gescannte Richtlinien nicht gelesen). Zweiter Durchgang, sobald die Websuche nicht mehr gedrosselt ist.
- ERLEDIGT (Cyril, 2026-11-14): Schwellenregel «ab X kW»: bis zur Schwelle Fixbetrag, ab der Schwelle gesamte Leistung x Ansatz (19 kW = Fixbetrag, 21 kW = 21 x Ansatz). Erfasst als `ansatz.schwelle` bei Spiez (3 Programme) und Steffisburg. Steffisburg «vor 2000» = Baujahr des Gebäudes.
- ERLEDIGT: Unklarheiten werden maschinenlesbar im Feld `luecken` markiert (Schema: `foerderdaten/SCHEMA.md`). Allgemeine Fachregeln von Cyril (kW-Formeln auf Gesamtleistung, nur aktuell gültige Werte, Impulsberatung und Steuerabzug weglassen, Kumulation) stehen im SCHEMA. Stand: 20 Lücken (Kanton Bern 1: Degression; Bund 3: PV ab 100 kW, Pronovo-Richtlinie, ProKilowatt; Jaberg, Oberdiessbach, 6 unklare, 8 schwach belegte Gemeinden).
- OFFEN (fachlich, für E04): Kanton Bern Degression über Fr. 200'000 (AUE, foerderung.aue@be.ch); PV-EIV ab 100 kW (Gesamtleistung x 250 widerspräche der Monotonie, vermutlich Rechnung nach Leistungsklassen; gegen Pronovo/Fedlex prüfen).
- OFFEN: Jaberg-Beträge stammen aus dem Stand Dezember 2024 (Leistungskatalog wird jährlich festgelegt).

## Ergebnis

**Stand 2026-11-14.** `foerderdaten/` enthält je Gemeinde eine JSON-Datei (45), dazu `kanton-bern.json` (22 Programme) und `bund.json` (8 Programme). Schema: `foerderdaten/SCHEMA.md`.

| Status | Gemeinden |
|---|---|
| Programm (6) | Thun (15 Programme), Spiez (18), Heimberg (9), Uetendorf (7), Steffisburg (6), Jaberg (4) |
| kein Programm (33) | alle übrigen ausser den sechs unklaren |
| unklar (6) | Wichtrach, Wimmis, Heiligenschwendi, Oberhofen, Sigriswil, Thierachern |

Wichtige Erkenntnisse:
- **Energiefranken ist unvollständig:** Es kennt nur Thun, Steffisburg, Uetendorf und Spiez. Heimberg (neues Reglement ab 1.1.2026) und Jaberg fehlen dort. Deshalb sind die Originaldokumente die Quelle (Entscheid 0007).
- Die Gemeindeprogramme sind klein und stark verschieden (Thun Gebäudehülle max. Fr. 20'000, Steffisburg Fr. 10'000, Jaberg Pauschalen mit Maximum Fr. 1'000). Detailbestimmungen (Gesuch vor/nach Realisierung, Wartelisten, Keine Doppelförderung mit dem Kanton, Baujahr vor 2000) stehen je Datei unter `allgemein` und `bedingungen`.
- Oberdiessbach hatte bis 31.12.2025 Energieförderrichtlinien (Gesuchsfrist bis 30.4.2026), jetzt aufgehoben.
- Energieversorger-Programme (BKW, Energie Thun AG) sind nicht erfasst.

Werkzeuge (alle nur lesend): `npm run foerder-pruefen` (Form und Übersicht), `npm run foerder-quellen` (Fingerabdruck der 42 Originaldokumente, Änderungen melden), `npm run foerder-bericht` (Änderungsbericht gegenüber dem Vormonat; erster Lauf 2026-11, Bericht in `foerderdaten/berichte/`).

Arbeitsweise: Die Recherche lief in sieben parallelen Sitzungen je Gruppe von Gemeinden. Die Websuche war dabei gedrosselt, deshalb wurden viele Gemeinden direkt über ihre Reglementssammlung geprüft. Gescannte PDFs wurden zum Teil als Bild gelesen.

## Rückmeldungen an den Masterplan

- Die Förderdatenbank ist ohne Nachprüfung nicht abschliessend; die Masterplan-Risikozeile «Förderregeln unvollständig oder veraltet» trifft zu und gilt hier besonders für `kein_programm`. E04 sollte bei Gemeinden mit Status `unklar` oder schwacher Evidenz eine Rückfrage an Cyril ausweisen.
- Die monatliche Aktualisierung braucht eine Claude-Sitzung (neu lesen, was der Quellenwächter als geändert meldet) plus Suche nach neuen Programmen in Gemeinden ohne Programm.
- Testsitzung 2026-11-14 (`docs/tests/2026-11-test-e01-e03.md`): Verbindung zu E01 über die BFS-Nummer (`Location.MunicipalityId`) funktioniert direkt. Vor E04 nötig: Stufen des Kantons Bern (Heizung, GEAK-Klassen, Hülle A/B/C) als Daten statt nur im Text `ansatz.beschreibung`. Der Quellenwächter meldet HTML-Seiten von Kanton und Bund schon am selben Tag als geändert (vermutlich wechselnde Seitenteile, Textvergleich statt Fingerabdruck der ganzen Seite). Der Änderungsbericht überschreibt bei einem zweiten Lauf im selben Monat Bericht und Vergleichsbasis. Nachprüfen: Bonus Hülle nach Erhöhung Januar 2026, Wohnungslüftung (in Cyrils Vorlage, nicht in der Datenbank), Oberhofen (0007 nennt ein Reglement, Datei sagt `unklar`).
