# E01 – GEAK-Projekt auslesen

- Status: offen (als Nächstes)
- Meilenstein: M1 Prüfassistent
- Hängt ab von: E00

## Ziel

Ein bestehendes Projekt im GEAK-Tool wird komplett ausgelesen und als JSON-Datei lokal abgelegt. Das ist die Grundlage für jede Prüfung (E02, E04), für das Übergabeformat (E05) und für das Nachführen (E10), weil das GEAK-Tool Master ist.

## Umfang

- Aufbau des GEAK-Tools erkunden: Seiten, Reiter, Felder, Listen (Bauteile, Massnahmen, Varianten, Förderbeiträge, Texte, Fotos).
- Feldkatalog anlegen (z. B. `docs/geak-tool/feldkatalog.md`): welche Felder es gibt, Typ, Einheit, Pflicht ja/nein.
- Skript, das ein Projekt ausliest und als JSON speichert. Ablage in einem Ordner, der nicht eingecheckt wird (Kundendaten).
- **Feldkarte** (z. B. `src/geak/feldkarte.js`): alle Feldzugriffe an einer Stelle, möglichst über sichtbare Beschriftungen. Grundlage für die Wartung (Masterplan Abschnitt 5, W01).
- Fehlt ein erwartetes Feld, meldet das Auslesen die Stelle klar, statt still leere Werte zu liefern.

## Nicht im Umfang

- Schreiben ins GEAK-Tool.
- Prüfungen.

## Fertig, wenn

- [ ] Feldkatalog für alle Bereiche des GEAK Plus vorhanden
- [ ] ein echtes Projekt lässt sich vollständig auslesen, Cyril hat Stichproben mit dem Tool verglichen
- [ ] Entscheid zur Lese-Technik festgehalten

## Offene Punkte

- OFFEN: Seiteninhalt auslesen oder die Datenabfragen nutzen, die die Seite selbst macht? Nur, was der Zugriffsschutz erlaubt; nichts tarnen.
- OFFEN: Welches Testprojekt (Cyril wählt eines aus).
- OFFEN: Wo die ausgelesenen Projektdaten lokal liegen (Datenschutz Kundendaten).

## Ergebnis

## Rückmeldungen an den Masterplan
