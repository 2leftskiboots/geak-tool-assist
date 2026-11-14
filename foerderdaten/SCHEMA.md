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
  "offen": ["alles, was unklar ist oder fehlt – nicht raten"]
}
```

Regeln:
- Nichts raten. Fehlt eine Angabe: Feld leer lassen und unter `offen` nennen.
- Beträge exakt aus dem Dokument, mit Quelle (URL + Artikel/Seite).
- `kein_programm`: nur setzen, wenn Gemeindewebsite, Verordnungs-/Reglementsammlung und Energiebereich geprüft sind; die geprüften Seiten stehen in `geprueft`.
- Umlaute und «ss» (Schweizer Schreibweise).
