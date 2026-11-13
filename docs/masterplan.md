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
| E01 | [GEAK-Projekt auslesen](etappen/E01-projekt-auslesen.md) | ⏭ als Nächstes | E00 |
| W01 | [Wartung: Struktur-Check und Release-Ablauf](etappen/W01-wartung.md) | offen | E01 |
| E02 | [Schlusskontrolle Texte](etappen/E02-schlusskontrolle-texte.md) | offen | E01 |
| E03 | [Förderdatenbank](etappen/E03-foerderdatenbank.md) | offen | – |
| E04 | [Schlusskontrolle Förderbeiträge](etappen/E04-schlusskontrolle-foerderung.md) | offen | E01, E03 |
| E05 | [Übergabeformat und Lückenprüfung](etappen/E05-uebergabeformat.md) | offen | E01 |
| E06 | [Ist-Zustand schreiben](etappen/E06-ist-zustand-schreiben.md) | offen | E05 |
| E07 | [Massnahmen und Varianten schreiben](etappen/E07-massnahmen-varianten.md) | offen | E06 |
| E08 | [Tarife und Förderbeiträge schreiben](etappen/E08-tarife-foerderung-schreiben.md) | offen | E03, E07 |
| E09 | [Texte und Fotos](etappen/E09-texte-fotos.md) | offen | E07 |
| E10 | [Änderungen nachführen](etappen/E10-aenderungen-nachfuehren.md) | offen | E06–E09 |

E03 hängt von nichts ab und kann parallel zu E01/E02 gebaut werden. W01 folgt direkt auf E01, damit vor der ersten schreibenden Etappe (E06) erkannt wird, wenn sich das GEAK-Tool ändert.

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
- Wann er läuft:
  - automatisch **vor jedem schreibenden Lauf** (Kurzfassung: nur die betroffenen Seiten),
  - **wöchentlich** als geplante Aufgabe auf Cyrils PC,
  - **von Hand**, sobald ein Release bekannt wird.
- **Release-Hinweise:** Versionsnummer des GEAK-Tools (falls sichtbar) wird bei jedem Check mitgeschrieben. Release Notes und Mitteilungen des Vereins GEAK legt Cyril in `docs/geak-tool/releases/` ab oder gibt sie der Wartungs-Sitzung.

### 5.3 Nachführen (Ablauf bei einer Änderung)

1. **Einordnen:**
   - *technisch*: nur die Oberfläche hat sich verändert (Feld verschoben, umbenannt) → Feldkarte anpassen.
   - *fachlich*: neue Felder, neue Pflichten, geänderte Berechnung oder Kataloge → zusätzlich ein Entscheid, bei Bedarf die Masterplan-Sitzung.
2. **Wartungs-Sitzung** (eigene Claude-Sitzung): Feldkarte und Feldkatalog anpassen, bis der Struktur-Check wieder grün ist, dann den neuen Abdruck als Referenz bestätigen.
3. **Betroffene Bausteine prüfen:** Übergabeformat (bei Änderung Versionsnummer erhöhen und das Destillation Tool informieren), Prüfregeln (E02, E04), Schreibskripte.
4. **Protokoll:** Eintrag in `docs/geak-tool/release-protokoll.md` (Datum, GEAK-Version, Änderung, Anpassung, Commit).

Bis der Check wieder grün ist, läuft der Assist **nur lesend**.

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
- OFFEN: Wie das GEAK-Tool technisch ausgelesen wird (Seiteninhalt oder die Datenabfragen, die die Seite selbst macht). Klärung in E01; nichts, was den Schutz umgeht.
- OFFEN: Womit die Rechtschreibung geprüft wird. Projektdaten dürfen nicht ungefragt an externe Dienste gehen. Klärung in E02.
- OFFEN: Welche Gemeinden die Förderdatenbank abdeckt (Liste Region Thun). Klärung in E03.
- OFFEN: Wie der Förder-Check rechnet (Regeln als Daten oder Prüfung durch die KI mit Quellenangabe). Klärung in E04.
- OFFEN: Welches Projekt als festes Referenzprojekt für den Struktur-Check dient (darf sich nicht laufend ändern). Klärung in W01.
- OFFEN: Ob das GEAK-Tool eine Versionsnummer anzeigt und wo Release Notes erscheinen. Klärung in W01.

## 8. Arbeitsweise mit diesem Plan

- **Masterplan-Sitzung:** pflegt dieses Dokument, Etappenreihenfolge, Status und Pivots. Jede Änderung der Richtung wird mit einem Entscheid begründet und im Änderungsprotokoll unten eingetragen.
- **Etappen-Sitzung:** liest zuerst `CLAUDE.md`, diesen Masterplan und die eigene Etappendatei. Sie arbeitet nur am Umfang der Etappe, hält Fachentscheide in `docs/entscheide/` fest und setzt am Ende den Status in der Etappendatei und in der Tabelle oben.
- Stellt eine Etappen-Sitzung fest, dass der Plan nicht mehr stimmt: nicht selbst umbauen, sondern in der Etappendatei unter «Rückmeldungen an den Masterplan» notieren.

- **Wartungs-Sitzung:** wird bei einem Befund des Struktur-Checks oder bei einem bekannten Release gestartet und folgt Abschnitt 5.3.

## 9. Änderungsprotokoll

| Datum | Änderung | Entscheid |
|---|---|---|
| 2026-11-14 | Masterplan erstellt nach Interview mit Cyril | 0003 |
| 2026-11-14 | Wartung bei GEAK-Tool-Releases ergänzt (Abschnitt 5, Etappe W01) | 0004 |
