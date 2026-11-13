# W01 – Wartung: Struktur-Check und Release-Ablauf

- Status: offen
- Meilenstein: M1 Prüfassistent
- Hängt ab von: E01 (Feldkarte, Feldkatalog, Auslesen)

## Ziel

Änderungen am GEAK-Tool (neue Releases) werden erkannt, bevor der Assist falsch liest oder ins falsche Feld schreibt, und lassen sich nach einem festen Ablauf nachführen. Grundlage: Masterplan Abschnitt 5.

## Umfang

- `npm run check-geak`: Strukturabdruck eines festen Referenzprojekts (Seiten, Felder, Beschriftungen, Auswahllisten, Pflichtfelder, Versionsnummer falls sichtbar) erstellen und mit dem letzten bestätigten Abdruck vergleichen.
- Bericht: neu / fehlt / geändert, je mit Ort im Tool und betroffenen Einträgen der Feldkarte.
- Befehl, um einen neuen Abdruck nach erfolgter Anpassung als Referenz zu bestätigen.
- Kurzfassung des Checks, die vor jedem schreibenden Lauf automatisch läuft (nur die betroffenen Seiten).
- Wöchentliche geplante Aufgabe auf Cyrils PC.
- `docs/geak-tool/release-protokoll.md` anlegen und Ordner `docs/geak-tool/releases/` für Release Notes.
- Anleitung für die Wartungs-Sitzung (Ablauf Masterplan 5.3), kurz und abhakbar.

## Nicht im Umfang

- Anpassungen an der Feldkarte selbst (das macht die jeweilige Wartungs-Sitzung).

## Fertig, wenn

- [ ] Struktur-Check läuft auf dem Referenzprojekt und ist grün
- [ ] künstlich veränderter Abdruck (Test) wird als Abweichung erkannt
- [ ] wöchentlicher Lauf eingerichtet, Bericht für Cyril auffindbar
- [ ] Release-Protokoll und Ablauf dokumentiert

## Offene Punkte

- OFFEN: Welches Projekt als Referenzprojekt dient (darf sich nicht laufend ändern; ev. eigenes Testprojekt, falls der Unterstützer-Account Projekte anlegen darf).
- OFFEN: Zeigt das GEAK-Tool eine Versionsnummer? Wo erscheinen Release Notes (Newsletter, Login-Seite, Mitteilungen im Tool)?
- OFFEN: Wie Cyril vom Ergebnis des wöchentlichen Laufs erfährt (Datei, Benachrichtigung).

## Ergebnis

## Rückmeldungen an den Masterplan
