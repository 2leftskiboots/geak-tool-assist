# 0004 – Wartung bei neuen Releases des GEAK-Tools

- Datum: 2026-11-14
- Status: angenommen (OK Cyril 2026-11-14)
- Ergänzt 0003

## Ausgangslage

Der Assist liest und schreibt die Oberfläche des GEAK-Tools. Neue Releases können Felder verschieben, umbenennen, ergänzen oder fachlich ändern. Cyril will das systematisch und gezielt nachführen können, statt Fehler erst beim Ausfüllen zu bemerken.

## Grundlage

- Rückmeldung Cyril vom 2026-11-14 zum Masterplan.
- Das GEAK-Tool bietet keine Schnittstelle; der Assist hängt an der Oberfläche (0001). Diese Art Automatisierung bricht erfahrungsgemäss bei Releases.
- Gefährlichster Fall: Schreiben in ein falsches Feld, das niemand bemerkt.
- Rückmeldung Cyril: nur 2–3 Releases pro Jahr; die aktuelle Release-Version steht in der Fusszeile; Release Notes sind öffentlich unter <https://www.geak-tool.ch/expertInfo>.

## Entscheid

Drei Ebenen (Masterplan Abschnitt 5):

1. **Vorbeugen:** eine Feldkarte als einzige Stelle für Feldzugriffe, ein Feldkatalog mit Prüfdatum, Zugriff über Beschriftungen, sicherer Abbruch bei unbekanntem Feld.
2. **Erkennen:** Versionswächter, der bei jedem Start die Version in der Fusszeile mit der bestätigten Version vergleicht. Bei einem Wechsel: Meldung, Hinweis auf die Release Notes, Struktur-Check (von Hand gestartet) gegen ein festes Referenzprojekt.
3. **Nachführen:** fester Ablauf in einer Wartungs-Sitzung (Release Notes lesen, einordnen technisch/fachlich, Feldkarte anpassen, betroffene Bausteine prüfen, Übergabeformat versionieren, Release-Protokoll).

Bis die neue Version bestätigt ist, läuft der Assist nur lesend.

Verworfen:

- **Wöchentlicher Struktur-Check:** übertrieben bei 2–3 Releases pro Jahr; der Versionswechsel ist der bessere Auslöser (Cyril).
- **Struktur-Check vor jedem schreibenden Lauf:** bringt nur zusätzliche Sicherheit, keinen methodischen Gewinn. Releases erkennt der Versionswächter, kleine Änderungen ohne neue Version fängt der sichere Abbruch bei unbekanntem Feld ab.
- **Nur reagieren, wenn etwas nicht mehr geht:** Fehler werden zu spät oder gar nicht bemerkt (falsches Feld).
- **Vollständige automatische Tests mit Schreiben in ein Testprojekt:** mehr Aufwand, und der Unterstützer-Account kann Projekte nicht löschen. Kann später ergänzt werden.

## Konsequenzen

- Neue Etappe W01 direkt nach E01, vor der ersten schreibenden Etappe.
- Alle Etappen halten sich an die Feldkarte; direkte Feldzugriffe in Skripten sind nicht erlaubt.
- Ein Referenzprojekt im GEAK-Tool wird benötigt, das sich nicht laufend ändert.
