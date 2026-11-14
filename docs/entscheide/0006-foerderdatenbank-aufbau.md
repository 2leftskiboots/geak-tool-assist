# 0006 – Aufbau der Förderdatenbank (E03)

- Datum: 2026-11-14
- Status: vorgeschlagen (OK Cyril ausstehend)
- Ergänzt 0003, 0005

## Ausgangslage

E03 braucht eine lokale Datei mit den Förderprogrammen von Bund, Kanton Bern und den Gemeinden der Region Thun. Offen waren: welche Gemeinden, welches Format, ob im Repository, woher die Daten stammen und wie sie aktuell bleiben.

## Grundlage

- Auftrag Cyril (2026-11-14): Gemeinden im Umkreis von 10 km von Thun systematisch absuchen.
- Rückmeldung Cyril (2026-11-14): Nicht nur auf energiefranken.ch vertrauen. Lokale Programme je Gemeinde prüfen, sie stehen oft in einem PDF und enthalten wichtige Detailbestimmungen.
- Prüfung: Energiefranken kennt für die 45 Gemeinden nur 4 mit eigenem Programm (Thun, Steffisburg, Uetendorf, Spiez). Heimberg und Oberhofen haben nachweislich Reglemente, die dort fehlen. Energiefranken ist also unvollständig.
- Kanton Bern prüft frankengenau (Masterplan, Risiken).

## Entscheid

1. **Gemeinden:** alle Gemeinden, deren Gebiet den Kreis von 10 km um das Thuner Rathaus berührt. Berechnet aus den amtlichen Gemeindegrenzen 2025 (swisstopo). Ergebnis: **45 Gemeinden** (`foerderdaten/gemeinden.json`). Diemtigen (10,25 km) liegt knapp ausserhalb. Begründung: Ein Objekt liegt oft am Gemeinderand; massgebend ist das Gemeindegebiet, nicht der Gemeindemittelpunkt.
2. **Quellenregel:** Beträge und Bedingungen stammen **nur aus dem Originaldokument** (Reglement, Verordnung, Wegleitung, Merkblatt) mit URL und Artikel/Seite. Energiefranken.ch dient nur als Wegweiser. Jede Gemeinde wird auch dann geprüft, wenn Energiefranken nichts kennt; «kein Programm» gilt erst, wenn die geprüften Seiten in der Datei stehen.
3. **Format:** JSON, eine Datei je Gemeinde plus `bund.json` und `kanton-bern.json` (Schema: `foerderdaten/SCHEMA.md`). Begründung: maschinenlesbar für den Förderrechner (E04), von Hand lesbar und in git nachvollziehbar. Die Detailbestimmungen stehen als Text (`allgemein`, `bedingungen`), nicht als erzwungene Zahlen; der Rechner in E04 entscheidet, was er daraus rechnet und was er Cyril als Frage vorlegt.
4. **Ablage:** im Repository unter `foerderdaten/` (öffentliche Daten, enthalten nichts aus Kundenprojekten). Die Versionsgeschichte in git ist zugleich das Archiv der Vormonate.
5. **Aktualisierung monatlich in zwei Teilen:**
   - *Mechanisch* (`npm run foerder-quellen`): lädt jedes Originaldokument, bildet einen Fingerabdruck und meldet neue, geänderte und nicht mehr erreichbare Dokumente.
   - *Fachlich* (Claude-Sitzung): liest nur die gemeldeten Dokumente neu, passt die JSON-Dateien an, sucht nach neuen Programmen in Gemeinden ohne Programm; danach `npm run foerder-pruefen` und `npm run foerder-bericht` (Änderungsbericht gegenüber dem Vormonat in `foerderdaten/berichte/`).
6. **Stichproben:** Cyril prüft einzelne Beträge gegen die Originale. Jede Datei nennt dafür Quelle und Stelle.

## Konsequenzen

- E04 liest `foerderdaten/` direkt; die Regeln bleiben als Daten mit Quelle, Sonderfälle als Rückfrage (Entscheid dazu in E04).
- Die monatliche Ausführung kann als geplante Aufgabe in der Desktop-App laufen (öffentliche Daten, kein GEAK-Zugang nötig). Einrichtung erst nach OK von Cyril.
- Energieversorger (BKW, Energie Thun AG, …) sind **nicht** erfasst (Masterplan nennt Bund, Kanton, Gemeinden). Stösst die Recherche auf solche Programme, steht das unter `offen`.
- Gemeinden können fusionieren oder Programme jederzeit ändern; deshalb Abrufdatum und Stand je Datei.
