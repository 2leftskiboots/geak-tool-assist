# E04 – Förderbeiträge bestimmen und prüfen

- Status: offen
- Meilenstein: M1 Prüfassistent
- Hängt ab von: E01 (Projekt auslesen), E03 (Förderdatenbank)
- Teil des Strangs Förderung: E03 → **E04** → E08 (Entscheid 0005)

## Ziel

Für ein Projekt werden die Förderbeiträge je Variante **bestimmt**: welche Programme (Bund, Kanton Bern, Gemeinde) greifen, für welche Massnahme, mit welchem Betrag, frankengenau, wie es der Kanton Bern kontrolliert. Dieselbe Berechnung dient zum **Prüfen** (Vergleich mit dem Erfassten) und später zum **Eintragen** (E08).

## Umfang

- **Förderrechner:** Eingaben sind Standort (Gemeinde), Massnahmen und Varianten (aus dem ausgelesenen Projekt, E01) und die Förderdatenbank (E03). Ergebnis je Variante und Massnahme: Programm, Betrag, Rechenweg, Bedingungen, Quelle.
- Kombinierbarkeit und Maximalbeträge berücksichtigen (z. B. Bund und Kanton für dieselbe Massnahme).
- Bedingungen, die der Rechner nicht aus den Daten beurteilen kann, als Frage an Cyril ausweisen statt zu raten.
- **Prüfung:** Ergebnis mit den im GEAK-Tool erfassten Beiträgen vergleichen; Abweichungen, fehlende Programme und falsche Zuordnungen zu Varianten melden.
- Ausgabe als Übersicht für Cyril und als Datei, die E08 zum Eintragen verwendet.

## Nicht im Umfang

- Beiträge ins GEAK-Tool eintragen (E08).

## Fertig, wenn

- [ ] für mindestens zwei echte Berner Projekte bestimmt; Cyril bestätigt die Beträge
- [ ] jeder Betrag ist mit Programm, Rechenweg und Quelle nachvollziehbar
- [ ] Prüfung erkennt eine absichtlich falsch erfasste Zahl und einen fehlenden Gemeindebeitrag

## Offene Punkte

- OFFEN: Regeln fest als Daten hinterlegt oder Bestimmung durch die KI mit Quellenangabe (oder gemischt: einfache Ansätze als Daten, Sonderfälle mit Rückfrage).
- OFFEN: Welche Angaben das GEAK-Tool pro Förderbeitrag erwartet (Felder aus dem Feldkatalog E01).
- **Vorarbeit aus dem Test E01 + E03 zuerst lesen:** `docs/tests/2026-11-test-e01-e03.md`. Darin stehen: welche Felder in `projekt.json` direkt passen, die nötige Zuordnungstabelle Förderposition → Programm-ID, fehlende Eingaben (Leistung WP, PV-Bauart, eine oder mehrere Anlagen), die beiden Orte der Beiträge (`Subsidies` und `Measure.SubsidyValue`) und eine Stichprobe mit Abweichungen im Testprojekt.
- Voraussetzung aus dem Test: Die Stufen des Kantons Bern (Heizung bis/ab 15 und 70 kW, Klassen, Hülle A/B/C) müssen in `foerderdaten/` als Daten vorliegen (Aufgabe E03, vor E04).

## Ergebnis

## Rückmeldungen an den Masterplan
