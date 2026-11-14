# Schema Förderdaten (E03)

Eine JSON-Datei je Gemeinde unter `foerderdaten/gemeinden/<bfs>-<name>.json`, dazu `bund.json` und `kanton-bern.json`.
Quelle ist immer das **Originaldokument** (Reglement, Verordnung, Wegleitung, Merkblatt, meist PDF). Energiefranken.ch dient nur als Wegweiser, nicht als Quelle für Beträge.

```json
{
  "traeger": "Gemeinde Heimberg",
  "bfs": 928,
  "abgerufen": "2026-11-14",
  "status": "programm | kein_programm | unklar",
  "geprueft": ["URL jeder Seite, die angeschaut wurde (auch bei kein_programm)"],
  "dokumente": [
    {"titel": "", "url": "", "typ": "pdf|html", "stand": "Datum/Version laut Dokument", "gueltig_ab": "", "gueltig_bis": ""}
  ],
  "allgemein": {
    "gesuch": "wie, wo, wann (vor Baubeginn?)",
    "voraussetzung_kanton": "z. B. nur wenn auch Kanton Bern fördert, Reihenfolge der Gesuche",
    "kumulation": "mit Bund/Kanton/anderen",
    "budget": "Jahrestopf, Kontingent, 'solange Vorrat'",
    "gesamtmaximum": "je Gesuch/Objekt/Jahr",
    "berechtigte": "Eigentümer, Gebäudealter, Standort ...",
    "nachweise_auszahlung": "",
    "weitere_bestimmungen": ["Detailbestimmungen, die für die Berechnung wichtig sind"]
  },
  "programme": [
    {
      "id": "kurzer-schluessel",
      "kategorie": "geak | huelle | heizung | solar_thermie | pv | pv_speicher | waermenetz | neubau | beratung | mobilitaet | sonstiges",
      "massnahme": "Bezeichnung wie im Dokument",
      "bedingungen": ["jede Bedingung einzeln, im Wortlaut möglichst eng"],
      "ansatz": {"art": "pro_m2 | pro_kw | pro_kwp | pro_kwh | pauschal | prozent | andere", "wert": 0, "einheit": "Fr./m²", "beschreibung": "wenn die Formel komplexer ist: Wortlaut"},
      "minimum": "",
      "maximum": "",
      "kombinierbar": "",
      "gueltig_ab": "",
      "gueltig_bis": "",
      "quelle": {"url": "", "stelle": "Artikel/Seite/Tabelle"}
    }
  ],
  "luecken": [
    {
      "id": "kurzer-schluessel",
      "art": "unklar_formel | nicht_abrufbar | nicht_geprueft | veraltet | schwache_evidenz | rueckfrage",
      "programm": "optional: id des betroffenen Programms",
      "text": "was unklar ist oder fehlt",
      "rueckfrage_an": "wer es klären kann (Stelle, Telefon, E-Mail)",
      "standard": "wie der Assist bis zur Klärung verfährt"
    }
  ],
  "offen": ["alles, was unklar ist oder fehlt – nicht raten (Freitext, ausführlich)"]
}
```

## Lücken (`luecken`)

Maschinenlesbare Markierung dessen, was der Assist **nicht selbst entscheiden** darf. Der Assist (E04) rechnet solche Programme nicht still, sondern nimmt die Lücke in seinen Bericht auf und legt sie Cyril vor. `offen` bleibt der ausführliche Freitext; jede Lücke, die eine Berechnung beeinflusst, steht zusätzlich in `luecken`. Status `unklar` verlangt mindestens eine Lücke. `npm run foerder-pruefen` listet alle Lücken.

## Schwellenregel (`ansatz.schwelle`)

Gemäss Cyril (2026-11-14) gilt bei «ab X kW» in der Regel: bis zur Schwelle ein Fixbetrag, ab der Schwelle **gesamte Leistung x Ansatz** (nicht nur der Anteil über der Schwelle). Beispiel 20 kW / Fr. 2'000 / Fr. 100 je kW: 19 kW = Fr. 2'000, 21 kW = 21 x 100 = Fr. 2'100. Erfassung bei `ansatz.art: "andere"`:

```json
"schwelle": {"einheit": "kW", "grenze": 20, "unterhalb": {"art": "pauschal", "wert": 2000}, "ab_grenze": {"art": "pro_kw", "wert": 100, "bezug": "gesamte Leistung"}, "grenzfall": "wie genau auf der Grenze"}
```

Weicht ein Dokument ausdrücklich von der Regel ab (nur Anteil über der Schwelle), steht das im Programm und als Lücke. Der Grenzfall (genau X kW) richtet sich nach dem Wortlaut («ab» oder «bis/über»).

Regeln:
- Nichts raten. Fehlt eine Angabe: Feld leer lassen und unter `offen` nennen.
- Beträge exakt aus dem Dokument, mit Quelle (URL + Artikel/Seite).
- `kein_programm`: nur setzen, wenn Gemeindewebsite, Verordnungs-/Reglementsammlung und Energiebereich geprüft sind; die geprüften Seiten stehen in `geprueft`.
- Umlaute und «ss» (Schweizer Schreibweise).
