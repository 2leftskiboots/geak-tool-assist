// Erzeugt den technischen Teil des Feldkatalogs (docs/geak-tool/feldkatalog.md) aus einem
// ausgelesenen Projekt (npm run lese-projekt). Es kommen nur Feldnamen, Typen und
// Auswahlwerte ins Dokument, keine Kundendaten und keine Freitexte.
// Aufruf: npm run feldkatalog [-- <Projekt-ID>]

import fs from 'node:fs';
import path from 'node:path';
import { DATEN_ORDNER } from '../src/geak/lesen.js';
import { REITER, PROJEKT_KOPF } from '../src/geak/feldkarte.js';

const id = process.argv[2] || fs.readdirSync(DATEN_ORDNER)[0];
const { meta, projekt } = JSON.parse(fs.readFileSync(path.join(DATEN_ORDNER, String(id), 'projekt.json'), 'utf8'));

// Tiefe, bis zu der Unterfelder einzeln aufgeführt werden (Pfadteile ohne [] gezählt).
const TIEFE = { Results: 2, Variants: 3, EnergyPrices: 3, Validation: 2, QualityCheckResults: 2, Constructions: 3, Subsidies: 3 };
const STANDARD_TIEFE = 8;
// Felder, deren Text Kundendaten oder Freitext sein kann: nie als Auswahlwerte aufführen.
const KEINE_AUSWAHL = /(Name|Town|Surname|Description|Country|Canton|Localized|Address|Owner|Title|Summary|Details|Email|Text)/;
const ERKLAERUNG = {
  Contributors: 'Personen mit Zugriff auf das Projekt (hier der Unterstützer-Account).',
  Client: 'Auftraggeberschaft: Eigentümerschaft mit Adresse und Telefon.',
  Location: 'Standort des Gebäudes: Adresse, Gemeinde, EGID/EDID, Wetterstation, Höhe.',
  LocationPotentials: 'Potenziale am Standort (Energierichtplan, Solar, Wärmepumpen, Fernwärme, Holz, Gas, Öl, Ausbau). Je Eintrag Bewertung, Standardtext-Auswahl, Kurztext und Details.',
  Building: 'Gebäudekennwerte: Baujahr, EBF, Raumhöhe, Geschosse, Gebäudetiefe, Bauweise, Grundriss.',
  CurrentSituation: 'Ist-Zustand: Gebäudenutzungen, Gebäudehülle (Dach/Decke, Wände, Fenster, Böden, Wärmebrücken) und Gebäudetechnik (Heizung/Warmwasser, Elektrizität, Lüftung, Kühlung). Je Bereich Zustand, Priorität, Texte «Ist-Zustand» und «Mögliche Verbesserungen», Foto-Kennung.',
  Constructions: 'Aufbauten aus dem U-Wert-Rechner (Schichten, Materialien, U-Wert). Bauteile verweisen über `ConstructionUiKey` darauf.',
  Priorities: 'Texte der Prioritätsstufen 1–4.',
  Measures: 'Massnahmen: gleiche Bauteil- und Gerätelisten wie der Ist-Zustand, mit den geplanten Änderungen (Kosten, Nutzungsdauer, Werterhalt).',
  EnergyPrices: 'Energieträger mit Preis, Heizwert und Faktoren (Primärenergie, CO₂).',
  ProfitabilityParameter: 'Parameter der Wirtschaftlichkeit (Kalkulationszins, Teuerung, Betrachtungszeitraum).',
  Subsidies: 'Förderprogramm: Förderpositionen mit Menge, Ansatz, Betrag, Hinweis und Zuordnung zu den Varianten (`Variants[]` = Wahrheitswert je Variante in Reihenfolge).',
  Variants: 'Varianten A–E: Titel, Beschreibung, Bauzeit, Renovationsjahr, Beschreibungstexte je Bereich, Gebäudenutzungen mit Massnahmen.',
  CostPositions: 'Kosten: feste Positionen (Gerüst, Planung, Nebenkosten, Unvorhergesehenes, MWST, Steuerabzug) und freie Positionen je Bereich.',
  Results: 'Berechnete Ergebnisse (SIA 380/1, Elektrizität, PV, Wirtschaftlichkeit, Heizung, Förderung, Minergie). Nur lesen.',
  Certificate: 'Texte des GEAK-Berichts je Bauteil und Bereich (Ist-Zustand und Verbesserungen), Datum der Prüfung, Foto-Kennung.',
  ProposedText: 'Vorgeschlagene Texte des Tools.',
  Report: 'Angaben zum Beratungsbericht.',
  Validation: 'Prüfstand des Tools: welche Bereiche vollständig sind, was berechnet/erzeugt werden kann.',
  QualityCheckResults: 'Prüfergebnisse des Tools (Qualitätscheck).',
};

// --- Datensatz durchlaufen ---------------------------------------------------------
const pfade = new Map();
const objekte = new Map(); // Pfad → Anzahl Objekte
const typVon = (w) => (w === null ? 'null' : Array.isArray(w) ? 'Liste' : typeof w === 'object' ? 'Objekt' : typeof w === 'number' ? 'Zahl' : typeof w === 'boolean' ? 'ja/nein' : 'Text');
function gehe(w, pfad) {
  const t = typVon(w);
  const e = pfade.get(pfad) ?? { typen: new Set(), n: 0, werte: new Set() };
  pfade.set(pfad, e);
  e.n++; e.typen.add(t);
  if (t === 'Objekt') {
    objekte.set(pfad, (objekte.get(pfad) ?? 0) + 1);
    for (const [k, x] of Object.entries(w)) gehe(x, pfad ? `${pfad}.${k}` : k);
  } else if (t === 'Liste') {
    for (const x of w) gehe(x, `${pfad}[]`);
  } else if (t === 'Text' && !KEINE_AUSWAHL.test(pfad.split('.').pop()) && /^[A-Za-z][A-Za-z0-9]*$/.test(w) && w.length <= 40) {
    e.werte.add(w);
  } else if (t === 'Text') {
    e.frei = true;
  }
}
gehe(projekt, '');

const letzter = (p) => p.split('.').pop().replace(/\[\]$/, '');
const elternPfad = (p) => (p.includes('.') ? p.slice(0, p.lastIndexOf('.')) : '');
const tiefe = (p) => p.replace(/\[\]/g, '').split('.').length - 1;

function tabelle(abschnitt) {
  const grenze = TIEFE[abschnitt] ?? STANDARD_TIEFE;
  const zeilen = [];
  for (const [pfad, e] of pfade) {
    if (pfad !== abschnitt && !pfad.startsWith(`${abschnitt}.`) && !pfad.startsWith(`${abschnitt}[]`)) continue;
    if (tiefe(pfad) > grenze) continue;
    const typen = [...e.typen].filter((t) => t !== 'null');
    const eltern = objekte.get(elternPfad(pfad));
    const immer = eltern === undefined || e.n >= eltern ? '' : ` (nur ${e.n}/${eltern})`;
    const lokal = /Localized$/.test(letzter(pfad));
    const werte = lokal ? 'Anzeigetext' : e.werte.size && e.werte.size <= 12 && !e.frei ? [...e.werte].map((v) => `\`${v}\``).join(', ') : e.frei || e.typen.has('Text') ? 'Freitext' : '';
    const einzug = '&nbsp;'.repeat(2 * Math.max(0, tiefe(pfad) - 1));
    const name = pfad === abschnitt ? `**${abschnitt}**` : `${einzug}\`${letzter(pfad)}${typen[0] === 'Liste' ? '[]' : ''}\``;
    zeilen.push(`| ${name} | ${typen.join('/') || 'leer'}${immer} | ${werte} |`);
  }
  return zeilen;
}

// --- Dokument schreiben ------------------------------------------------------------
const heute = new Date().toISOString().slice(0, 10);
const md = [];
md.push('# Feldkatalog GEAK-Tool');
md.push('');
md.push(`- Stand: ${heute}, GEAK-Version ${meta.geakVersion}, Quelle: Projekt ${meta.projektId} (nur Struktur, keine Kundendaten)`);
md.push('- Erzeugt mit `npm run feldkatalog` aus dem ausgelesenen Projekt. Nicht von Hand ändern; Beschreibungen stehen in `scripts/feldkatalog.js`.');
md.push('- Lese-Technik: Entscheid 0006. Zugriffe stehen in `src/geak/feldkarte.js` (Feldkarte).');
md.push('');
md.push('## Wie lesen');
md.push('');
md.push('- Feldnamen sind englisch und technisch, so wie das Tool sie liefert. Die Tabelle «Bereiche des Projekts» ordnet sie den Reitern des Tools zu.');
md.push('- **Typ:** Zahl, Text, ja/nein, Objekt, Liste. «Freitext» = beliebiger Text. Bei Auswahlfeldern stehen die **im Projekt beobachteten** Werte; die vollständige Liste kennt das Tool, der Datensatz zeigt sie nicht (OFFEN, E06 holt sie aus den Auswahllisten der Oberfläche).');
md.push('- **«nur n/N»:** Das Feld fehlt bei einem Teil der Einträge (optional oder nur bei manchen Bauteilarten).');
md.push('- `…Localized`-Felder sind Anzeigetexte zum Auswahlwert (z. B. `Type` = `PitchedRoof`, `TypeLocalized` = «Steildach»). Geschrieben wird der Auswahlwert.');
md.push('- `Id` = Datenbank-Kennung, `UiKey` = Kennung der Oberfläche. Beides ist nicht fachlich und wird nie geschrieben.');
md.push('- Bauteil-Einträge tragen u. a. `IsMeasure` (Massnahme statt Ist-Zustand), `IsPublished`, `Selected` (Zeilenauswahl in der Oberfläche).');
md.push('');
md.push('## Offen: Pflichtfelder');
md.push('');
md.push('- OFFEN: Welche Felder **Pflicht** sind, zeigt der Datensatz nicht. Es gibt nur den Prüfstand je Bereich (`Validation.CompletedNodes`, «vollständig» ja/nein) und die Prüfergebnisse des Tools (`QualityCheckResults`). Pflichtfelder werden in E05/E06 ermittelt, wenn Felder beschrieben werden (dort mit Test im Tool, nicht hier).');
md.push('- OFFEN: Zuordnung der technischen Feldnamen zu den **sichtbaren Beschriftungen** der Oberfläche. Sie wird für das Schreiben (E06 ff.) gebraucht und dort je Reiter ergänzt.');
md.push('- OFFEN: «Ergebnisse» und «Dokumente» sind Menüpunkte ohne eigene Adresse; welcher berechnete Abschnitt auf welcher Seite steht, ist nicht zugeordnet.');
md.push('');
md.push('## Bereiche des Projekts (Reiter)');
md.push('');
md.push('| Reiter im Tool | Adresse | Abschnitte im Datensatz |');
md.push('|---|---|---|');
for (const r of REITER) md.push(`| ${r.name} | ${r.route === null ? '(Menüpunkt)' : `\`/portfolio/{id}${r.route ? '/' + r.route : ''}\``} | ${r.abschnitte.map((a) => `\`${a}\``).join(', ')} |`);
md.push('');
md.push('Weitere Unterseiten (Adresse hinter `/portfolio/{id}/`), laut `Validation.CompletedNodes`: `usages`, `envelope`, `roofs`, `walls`, `windows`, `floors`, `thermalbridges`, `technology`, `heating`, `electricity`, `ventilation`, `cooling`, `consumptions` (Ist-Zustand), `measures/…` mit denselben Namen (Massnahmen), `certificate`, `report`.');
md.push('');
md.push('## Projektkopf');
md.push('');
md.push('Reiter «Projekt». Felder direkt im Datensatz: ' + PROJEKT_KOPF.map((k) => `\`${k}\``).join(', ') + '.');
md.push('');
for (const r of REITER) {
  md.push(`## ${r.name}`);
  md.push('');
  for (const a of r.abschnitte) {
    md.push(`### ${a}`);
    md.push('');
    if (ERKLAERUNG[a]) { md.push(ERKLAERUNG[a]); md.push(''); }
    md.push('| Feld | Typ | Auswahlwerte (beobachtet) |');
    md.push('|---|---|---|');
    md.push(...tabelle(a));
    md.push('');
  }
}
const ziel = path.resolve(import.meta.dirname, '..', 'docs', 'geak-tool', 'feldkatalog.md');
fs.mkdirSync(path.dirname(ziel), { recursive: true });
fs.writeFileSync(ziel, md.join('\n') + '\n');
console.log(`✓ ${ziel}  (${md.length} Zeilen)`);
