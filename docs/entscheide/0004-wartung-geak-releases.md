# 0004 – Wartung bei neuen Releases des GEAK-Tools

- Datum: 2026-11-14
- Status: vorgeschlagen (wartet auf OK von Cyril)
- Ergänzt 0003

## Ausgangslage

Der Assist liest und schreibt die Oberfläche des GEAK-Tools. Neue Releases können Felder verschieben, umbenennen, ergänzen oder fachlich ändern. Cyril will das systematisch und gezielt nachführen können, statt Fehler erst beim Ausfüllen zu bemerken.

## Grundlage

- Rückmeldung Cyril vom 2026-11-14 zum Masterplan.
- Das GEAK-Tool bietet keine Schnittstelle; der Assist hängt an der Oberfläche (0001). Diese Art Automatisierung bricht erfahrungsgemäss bei Releases.
- Gefährlichster Fall: Schreiben in ein falsches Feld, das niemand bemerkt.

## Entscheid

Drei Ebenen (Masterplan Abschnitt 5):

1. **Vorbeugen:** eine Feldkarte als einzige Stelle für Feldzugriffe, ein Feldkatalog mit Prüfdatum, Zugriff über Beschriftungen, sicherer Abbruch bei unbekanntem Feld.
2. **Erkennen:** Struktur-Check gegen ein festes Referenzprojekt, vor jedem schreibenden Lauf, wöchentlich und von Hand bei Release-Hinweis.
3. **Nachführen:** fester Ablauf in einer Wartungs-Sitzung (einordnen technisch/fachlich, Feldkarte anpassen, betroffene Bausteine prüfen, Übergabeformat versionieren, Release-Protokoll).

Bis der Check wieder grün ist, läuft der Assist nur lesend.

Verworfen:

- **Nur reagieren, wenn etwas nicht mehr geht:** Fehler werden zu spät oder gar nicht bemerkt (falsches Feld).
- **Vollständige automatische Tests mit Schreiben in ein Testprojekt:** mehr Aufwand, und der Unterstützer-Account kann Projekte nicht löschen. Kann später ergänzt werden.

## Konsequenzen

- Neue Etappe W01 direkt nach E01, vor der ersten schreibenden Etappe.
- Alle Etappen halten sich an die Feldkarte; direkte Feldzugriffe in Skripten sind nicht erlaubt.
- Ein Referenzprojekt im GEAK-Tool wird benötigt, das sich nicht laufend ändert.
