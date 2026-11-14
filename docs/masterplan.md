# Masterplan GEAK Tool Assist

- Stand: 2026-11-14
- Verantwortlich: Cyril Degen (DTplan)
- Grundlage: Interview vom 2026-11-14, Entscheid 0003

Dieses Dokument ist die **Landkarte** des Projekts. Einzelne Etappen werden in eigenen Sitzungen gebaut (`docs/etappen/`). Geändert wird der Masterplan nur in der Masterplan-Sitzung, und jede Richtungsänderung bekommt einen Entscheid (`docs/entscheide/`).

## 1. Ziel

Der Assist unterstützt Cyril bei der kompletten Erfassung eines GEAK bzw. GEAK Plus im GEAK-Tool: Ist-Zustand, Massnahmen, Varianten, Tarife, Förderbeiträge, Texte, Fotos und Schlusskontrolle.

| | Heute | Ziel |
|---|---|---|
| Handarbeit pro GEAK Plus (ohne Begehung, ohne Datenbeschaffung) | 4–8 h | 2–3 h |

Heutige Aufteilung (Schätzung Cyril): Flächen erfassen ca. 1 h, U-Werte inkl. Rückschlaufen zu den Flächen ca. 1 h, Ist-Zustand fertigstellen und Massnahmen erfassen geht schnell, Varianten ca. 1 h, danach Tarife und Förderbeiträge, am Schluss **viel Zeit für die Konsistenz**.

Zwei verschiedene Probleme:

1. **Erstes Ausfüllen** (Fleissarbeit)
2. **Konsistentes Nachführen** von Änderungen und Korrekturen (der grösste Ärger)

**Abbruchkriterium:** Ist Cyril am Schluss nicht spürbar effizienter, wird das Projekt eingestellt. Gemessen wird nach Gefühl, ohne formale Zeiterfassung (Entscheid Cyril, 2026-11-14).

## 2. Bausteine

```
 Unterlagen, Begehung
        │
        ▼
 ┌──────────────────┐   Übergabedatei    ┌───────────────────────────────┐
 │ Destillation Tool │ ────────────────▶ │ GEAK Tool Assist (dieses Repo) │
 │ (separates Projekt)│  Format gibt der  │  - Lesen   (GEAK-Tool → JSON)   │
 │ eigene Lückenprüfung│ Assist vor       │  - Prüfen  (Schlusskontrolle)   │
 └──────────────────┘                    │  - Lückenprüfung, Standardwerte │
                                         │  - Schreiben (Edge, Playwright) │
 ┌──────────────────┐   lokale Datei      │  - Texte, Fotos                │
 │ Förderprogramme   │ ────────────────▶ │                                 │
 │ (monatlich)       │                    └───────────────┬───────────────┘
 └──────────────────┘                                    │ lesen / schreiben
                                                         ▼
                                              GEAK-Tool (Master)
                                                         │
                                                         ▼
                                       Cyril: Schlusskontrolle, Veröffentlichen
```

| Baustein | Wo | Aufgabe |
|---|---|---|
| Destillation Tool | separates Projekt | Unterlagen verdichten, widerspruchsfrei, mit Fotos, eigene Lückenprüfung |
| Übergabeformat | dieses Repo | vom Assist definiert, nach den Feldern des GEAK-Tools |
| Förderdatenbank | dieses Repo | Bund, Kanton Bern, Gemeinden Region Thun; monatlich aktualisiert, lokale Datei |
| Lesen | dieses Repo | ein Projekt im GEAK-Tool komplett auslesen |
| Förderrechner | dieses Repo | Förderbeiträge je Variante bestimmen (Grundlage für Prüfen und Eintragen) |
| Prüfen | dieses Repo | Rechtschreibung, Texte ↔ Massnahmen, Förderbeiträge ↔ Varianten |
| Schreiben | dieses Repo | Felder im GEAK-Tool ausfüllen |
| Wartung | dieses Repo | Änderungen am GEAK-Tool erkennen und gezielt nachführen (Abschnitt 5) |

## 3. Grundsätze

1. **Das GEAK-Tool ist Master.** Der Assist liest vor jeder Änderung den aktuellen Stand aus dem GEAK-Tool und vertraut nicht auf eine eigene Kopie. Handkorrekturen von Cyril gehen nie verloren.
2. **Übergabeformat folgt dem GEAK-Tool.** Das Destillation Tool liefert, was die Felder des GEAK-Tools brauchen, nicht umgekehrt.
3. **Fehlende Daten: Standardwert, markieren, am Schluss gesammelt zeigen.** Der Assist hält nicht an. Jeder gesetzte Standardwert erscheint in einer Liste für Cyril.
4. **Varianten und Massnahmen gibt Cyril vor** (bzw. das Destillation Tool). Der Assist erfasst sie, schlägt aber keine eigenen vor.
5. **Umfang: alles, auch Texte und Fotos.** Veröffentlichen kann der Unterstützer-Account nicht. Die Schlusskontrolle und das Veröffentlichen bleiben bei Cyril.
6. **Lesen vor Schreiben.** Zuerst entstehen Funktionen, die nur lesen (kein Risiko für Projektdaten), danach solche, die schreiben.
7. **Wartbar bauen.** Alle Zugriffe auf Felder des GEAK-Tools stehen an einer Stelle (Feldkarte). Findet der Assist ein Feld nicht, bricht er vor dem Speichern ab und rät nicht.
8. Weiterhin gilt aus `CLAUDE.md`: nie veröffentlichen, einreichen oder löschen; Schutz des GEAK-Tools nicht umgehen; Secrets nie ins Repository; vor grösseren Speicherungen zeigen, was geändert wird.

## 4. Etappen

Reihenfolge nach Nutzen und Risiko. Zuerst kommt die Schlusskontrolle, weil sie ohne Destillation Tool sofort Zeit spart und nur liest.

| Nr. | Etappe | Status | hängt ab von |
|---|---|---|---|
| E00 | [Zugang und Anmeldung](etappen/E00-zugang.md) | ✅ erledigt | – |
| E01 | [GEAK-Projekt auslesen](etappen/E01-projekt-auslesen.md) | 🔶 gebaut, wartet auf Stichproben/OK | E00 |
| W01 | [Wartung: Struktur-Check und Release-Ablauf](etappen/W01-wartung.md) | offen | E01 |
| E02 | [Schlusskontrolle Texte](etappen/E02-schlusskontrolle-texte.md) | offen | E01 |
| E03 | [Förderdatenbank](etappen/E03-foerderdatenbank.md) | gebaut, Abnahme offen | – |
| E04 | [Förderbeiträge bestimmen und prüfen](etappen/E04-foerderbeitraege-bestimmen.md) | offen | E01, E03 |
| E05 | [Übergabeformat und Lückenprüfung](etappen/E05-uebergabeformat.md) | offen | E01 |
| E06 | [Ist-Zustand schreiben](etappen/E06-ist-zustand-schreiben.md) | offen | E05 |
| E07 | [Massnahmen und Varianten schreiben](etappen/E07-massnahmen-varianten.md) | offen | E06 |
| E08 | [Förderbeiträge und Tarife eintragen](etappen/E08-foerderung-tarife-eintragen.md) | offen | E04, E07 |
| E09 | [Texte und Fotos](etappen/E09-texte-fotos.md) | offen | E07 |
| E10 | [Änderungen nachführen](etappen/E10-aenderungen-nachfuehren.md) | offen | E06–E09 |

E03 hängt von nichts ab und kann parallel zu E01/E02 gebaut werden. W01 folgt direkt auf E01, damit vor der ersten schreibenden Etappe (E06) erkannt wird, wenn sich das GEAK-Tool ändert.

**Strang Förderung** (zieht sich durch drei Etappen, Entscheid 0005):

| Schritt | Etappe | Was |
|---|---|---|
| Daten | E03 | Programme von Bund, Kanton Bern und Gemeinden sammeln, monatlich aktualisieren |
| Bestimmen | E04 | für ein Projekt je Variante die Beiträge berechnen, mit Programm, Rechenweg und Quelle; Vergleich mit dem Erfassten = Prüfung |
| Eintragen | E08 | die bestimmten Beiträge im GEAK-Tool erfassen und den Varianten bzw. Massnahmen zuordnen |

Die Berechnung entsteht nur einmal (E04). Prüfen und Eintragen verwenden dieselbe Berechnung, darum können Kontrolle und Ausfüllen nicht auseinanderlaufen.

Meilensteine:

- **M1 – Prüfassistent** (E01–E04, W01): Cyril lässt ein fertig erfasstes Projekt prüfen und bekommt eine Mängelliste. Nutzen sofort, ohne Destillation Tool.
- **M2 – Ist-Zustand automatisch** (E05–E06): erster Durchlauf mit Daten aus dem Destillation Tool.
- **M3 – Kompletter GEAK** (E07–E09).
- **M4 – Konsistenz** (E10): Änderungen werden über das ganze Projekt nachgeführt.

## 5. Aktuell halten (Wartung)

Das GEAK-Tool bekommt neue Releases. Der Assist muss Änderungen **früh erkennen**, **einordnen** und **gezielt nachführen**, statt erst bei einem fehlerhaften Ausfüllen darüber zu stolpern.

### 5.1 Vorbeugen (beim Bauen jeder Etappe)

- **Feldkarte:** Alle Zugriffe auf Seiten und Felder des GEAK-Tools stehen in einem einzigen Modul (z. B. `src/geak/feldkarte.js`). Bei einer Änderung wird nur dort angepasst, nicht in jedem Skript.
- **Feldkatalog** (`docs/geak-tool/feldkatalog.md`): fachliche Beschreibung jedes Felds, mit dem Datum der letzten Prüfung.
- Felder möglichst über sichtbare Beschriftungen ansprechen, nicht über zufällige technische Kennungen, weil diese bei Releases eher wechseln.
- **Sicher abbrechen:** Fehlt ein erwartetes Feld oder hat es eine unbekannte Auswahl, speichert der Assist nichts und meldet die Stelle.

### 5.2 Erkennen

- **Struktur-Check** (`npm run check-geak`, Etappe W01): liest ein festes Referenzprojekt (nur lesen) und erstellt einen Strukturabdruck (Seiten, Felder, Beschriftungen, Auswahllisten, Pflichtfelder). Danach vergleicht er mit dem letzten bestätigten Abdruck und meldet, was neu ist, was fehlt und was sich geändert hat.
- **Auslöser ist der Versionswechsel.** Das GEAK-Tool zeigt die aktuelle Release-Version in der Fusszeile. Bei jedem Start liest der Assist sie mit (kostet nichts, die Seite ist ohnehin offen) und vergleicht sie mit der zuletzt bestätigten Version.
  - Version gleich: normal weiterarbeiten.
  - Version neu: Der Assist arbeitet nur noch lesend, meldet den Wechsel, verweist auf die Release Notes und schlägt den Struktur-Check vor.
- Kein regelmässiger Lauf (z. B. wöchentlich) und kein Check vor jedem schreibenden Lauf. Begründung: Es gibt nur 2–3 Releases pro Jahr, und jedes ist an der Version erkennbar. Kleine Änderungen ohne neue Version fängt der sichere Abbruch (5.1) ab. Von Hand starten geht jederzeit.
- **Release Notes** sind öffentlich: <https://www.geak-tool.ch/expertInfo>, Abschnitt «Release Notes». Die Wartungs-Sitzung liest sie zuerst. So weiss sie schon vor dem Check, wo sich etwas geändert hat, und kann fachliche Änderungen einordnen.

### 5.3 Nachführen (Ablauf bei einer Änderung)

0. **Release Notes lesen** und den Struktur-Check laufen lassen.
1. **Einordnen:**
   - *technisch*: nur die Oberfläche hat sich verändert (Feld verschoben, umbenannt) → Feldkarte anpassen.
   - *fachlich*: neue Felder, neue Pflichten, geänderte Berechnung oder Kataloge → zusätzlich ein Entscheid, bei Bedarf die Masterplan-Sitzung.
2. **Wartungs-Sitzung** (eigene Claude-Sitzung): Feldkarte und Feldkatalog anpassen, bis der Struktur-Check wieder grün ist. Danach den neuen Abdruck und die neue Version als Referenz bestätigen.
3. **Betroffene Bausteine prüfen:** Übergabeformat (bei Änderung Versionsnummer erhöhen und das Destillation Tool informieren), Prüfregeln (E02, E04), Schreibskripte.
4. **Protokoll:** Eintrag in `docs/geak-tool/release-protokoll.md` (Datum, GEAK-Version, Änderung, Anpassung, Commit).

Bis die neue Version bestätigt ist, läuft der Assist **nur lesend**.

Die Förderdatenbank (E03) folgt demselben Prinzip mit eigener monatlicher Aktualisierung und Änderungsbericht.

## 6. Risiken

| Risiko | Folge | Umgang |
|---|---|---|
| Destillation Tool kommt nicht oder liefert zu wenig | M2–M4 ohne Datengrundlage | M1 bringt auch ohne Destillation Tool Nutzen; Übergabeformat früh festlegen (E05) |
| GEAK-Tool ändert Oberfläche oder Felder | Lesen/Schreiben bricht oder schreibt ins falsche Feld | Wartung nach Abschnitt 5: Feldkarte, Struktur-Check, sicher abbrechen |
| Zugriffsschutz (WAF, reCAPTCHA) greift auch lokal | Assist blockiert | nicht umgehen, Betreiber fragen (0001) |
| Förderregeln (vor allem Gemeinden) unvollständig oder veraltet | falsche Beiträge, Kanton Bern prüft frankengenau | Quelle und Abrufdatum je Programm speichern; Assist meldet, prüft aber nicht abschliessend |
| Umfang «alles» ist sehr gross | Projekt verläuft sich | Etappen strikt nacheinander; nach jedem Meilenstein Nutzen beurteilen |
| Effizienzgewinn nur nach Gefühl beurteilt | Abbruchentscheid unscharf | bewusst so gewählt; bei Bedarf später Zeiterfassung ergänzen |

## 7. Offene Punkte

- OFFEN: Wann der Assist nach Lücken fragt (vor dem Ausfüllen gesammelt oder unterwegs). Wird in E05 pragmatisch entschieden, Ziel: möglichst vorher.
- OFFEN: Wie Cyril Lücken beantwortet (Chat in der Sitzung, Datei zum Ausfüllen o. ä.).
- ERLEDIGT (0006): Lese-Technik: Der Assist liest die Antwort mit, die die Seite selbst abruft, und schickt keine eigenen Abfragen.
- OFFEN: Womit die Rechtschreibung geprüft wird. Projektdaten dürfen nicht ungefragt an externe Dienste gehen. Klärung in E02.
- ERLEDIGT (0007): Förderdatenbank deckt 45 Gemeinden im 10-km-Umkreis von Thun ab, Format JSON im Repository.
- OFFEN: Wie der Förderrechner rechnet (Regeln als Daten oder Bestimmung durch die KI mit Quellenangabe). Klärung in E04.
- OFFEN: Welches Projekt als festes Referenzprojekt für den Struktur-Check dient. Vorschlag aus E01: 567444 «26-07 Kaderli, KI Test», falls Cyril es nicht mehr laufend ändert. Klärung in W01.
- OFFEN: Aufbau der Release-Notes-Seite. Das Format der Version ist bekannt («GEAK Version 7.0.1», E01). Klärung in W01.

## 8. Arbeitsweise mit diesem Plan

- **Masterplan-Sitzung:** pflegt dieses Dokument, Etappenreihenfolge, Status und Pivots. Jede Änderung der Richtung wird mit einem Entscheid begründet und im Änderungsprotokoll unten eingetragen.
- **Etappen-Sitzung:** liest zuerst `CLAUDE.md`, diesen Masterplan und die eigene Etappendatei. Sie arbeitet nur am Umfang der Etappe, hält Fachentscheide in `docs/entscheide/` fest und setzt am Ende den Status in der Etappendatei und in der Tabelle oben.
- Stellt eine Etappen-Sitzung fest, dass der Plan nicht mehr stimmt: nicht selbst umbauen, sondern in der Etappendatei unter «Rückmeldungen an den Masterplan» notieren.
- **Wartungs-Sitzung:** wird gestartet, wenn der Versionswächter eine neue GEAK-Version meldet, und folgt Abschnitt 5.3.
- **Test-Sitzung:** prüft, ob gebaute Etappen zusammenspielen, bevor die nächste darauf aufbaut. Bericht in `docs/tests/`.
- **Parallele Sitzungen:** Vor dem Vergeben einer neuen Entscheid-Nummer `git pull` und die höchste vergebene Nummer prüfen. Am 2026-11-14 vergaben zwei Sitzungen beide 0006; die Förderdatenbank wurde deshalb auf 0007 umnummeriert.

## 9. Änderungsprotokoll

| Datum | Änderung | Entscheid |
|---|---|---|
| 2026-11-14 | Masterplan erstellt nach Interview mit Cyril | 0003 |
| 2026-11-14 | Wartung bei GEAK-Tool-Releases ergänzt (Abschnitt 5, Etappe W01) | 0004 |
| 2026-11-14 | Struktur-Check nur bei Versionswechsel statt wöchentlich und vor jedem Schreiben | 0004 |
| 2026-11-14 | Förderung als durchgehender Strang: E04 bestimmt die Beiträge (statt nur zu prüfen), E08 trägt sie ein | 0005 |
| 2026-11-14 | E01 gebaut: Lese-Technik | 0006 |
| 2026-11-14 | E03 gebaut: Aufbau Förderdatenbank (umnummeriert von 0006) | 0007 |
| 2026-11-14 | Test E01 + E03: Zusammenspiel tragfähig, E04 machbar; Befunde in `docs/tests/2026-11-test-e01-e03.md` | – |
