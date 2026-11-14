# E01 – GEAK-Projekt auslesen

- Status: gebaut, wartet auf Stichproben und OK von Cyril (2026-11-14)
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

- [x] Feldkatalog für alle Bereiche des GEAK Plus vorhanden (technischer Teil; Pflichtfelder und Beschriftungen OFFEN, siehe Ergebnis)
- [x] ein echtes Projekt lässt sich vollständig auslesen
- [ ] Cyril hat Stichproben mit dem Tool verglichen (Kurzansicht: `daten/projekte/567444/zusammenfassung.txt`)
- [x] Entscheid zur Lese-Technik festgehalten (0006, wartet auf OK)

## Offene Punkte

- ERLEDIGT: Lese-Technik: die Antwort mitlesen, die die Seite selbst abruft (0006).
- ERLEDIGT: Testprojekt 567444 «26-07 Kaderli, KI Test» (das einzige im Unterstützer-Account).
- ERLEDIGT: Ablage `daten/projekte/<ID>/` im Repo-Ordner auf Cyrils PC, per `.gitignore` nie eingecheckt.

## Ergebnis

**Wie es funktioniert:** `npm run lese-projekt` meldet an, öffnet `/portfolio/{id}` im sichtbaren Edge und schreibt die Antwort `GET /api/projects/{id}` mit (ca. 400 KB, enthält das ganze Projekt). Ohne ID nimmt das Skript das Projekt, wenn die Liste nur eines enthält. Es klickt nichts, schreibt nichts ins GEAK-Tool und schickt keine eigenen Abfragen (0006). Ergebnis: `daten/projekte/<ID>/projekt.json` (mit Lesezeit und GEAK-Version) und `zusammenfassung.txt`.

**Dateien**
- `src/geak/feldkarte.js`: einzige Stelle für Adressen, Reiter und erwartete Felder; `pruefeStruktur()` meldet fehlende Felder (Abbruch, nichts gespeichert) und unbekannte Felder (Hinweis).
- `src/geak/lesen.js`: `leseProjektliste()`, `leseProjekt()`, `speichereProjekt()`, `zusammenfassung()`; liest die Version aus der Fusszeile mit und warnt bei Abweichung von der geprüften (7.0.1).
- `scripts/lese-projekt.js`, `scripts/feldkatalog.js` (erzeugt `docs/geak-tool/feldkatalog.md`; nur Struktur, keine Kundendaten).
- Entscheid 0006 (Lese-Technik).

**Getestet (2026-11-14, GEAK 7.0.1):** Projekt 567444 vollständig gelesen: 10 Dächer, 18 Aussenwände, 13 Fenster/Türen, Böden, 3 Wärmebrücken, Heizung, 5 Varianten, 43 Förderpositionen, 16 Energieträger. Die Strukturprüfung meldet bei künstlich beschädigten Daten fehlende Felder, falsche Typen und neue Felder korrekt.

**Grenzen und offene Punkte**
- Der Datensatz zeigt Auswahlwerte nur so weit, wie sie im Projekt vorkommen. Vollständige Auswahllisten: E06 (aus der Oberfläche).
- Pflichtfelder: nicht aus dem Datensatz ersichtlich. Das Tool liefert nur «Bereich vollständig ja/nein» und die eigenen Prüfergebnisse (`Validation`, `QualityCheckResults`). Ermittlung in E05/E06.
- Zuordnung technische Feldnamen ↔ sichtbare Beschriftungen: fehlt, kommt mit E06 je Reiter.
- Zuordnung der Abschnitte `Results`/`Certificate`/`Report` zu den Seiten «Ergebnisse»/«Dokumente»: «Ergebnisse» und «Dokumente» haben keine eigene Adresse; Texte für E02 stehen in `Certificate` und in den Feldern «Ist-Zustand»/«Mögliche Verbesserungen» je Bereich, die Beschreibungen in `Variants`.
- Fotos: Der Datensatz enthält nur die Kennungen (`ImageKey…`); die Bilddateien holt E09.
- Nur ein Testprojekt, nur GEAK Plus (`GeakType` = `GeakPlus`). Ein einfacher GEAK («Typ GE») wurde nicht gelesen.

## Rückmeldungen an den Masterplan

- Masterplan Abschnitt 7: Der Punkt «Wie das GEAK-Tool technisch ausgelesen wird» ist geklärt (0006), kann gestrichen werden.
- W01 (Struktur-Check): Die Feldkarte prüft jetzt schon bei jedem Lesen die Struktur (fehlend = Abbruch, neu = Hinweis) und liest die Version aus der Fusszeile. W01 kann darauf aufbauen und muss das nicht neu bauen; das Format der Version («GEAK Version 7.0.1») ist damit bekannt, der Aufbau der Release-Notes-Seite noch nicht.
- Für W01 als Referenzprojekt eignet sich 567444, falls Cyril es nicht mehr laufend ändert. Der Check kann den Datensatz-Abdruck (Felder, Typen) mit `scripts/feldkatalog.js` vergleichen.
- E02: Die Rechtschreibprüfung hat alle Texte in einem Datensatz zur Hand; die Textfelder stehen im Feldkatalog (Typ «Freitext»).
