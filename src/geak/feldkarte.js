// Feldkarte: der EINE Ort, an dem alles steht, was das Auslesen über den Aufbau des
// GEAK-Tools weiss (Adressen, Reiter, erwartete Felder). Ändert das GEAK-Tool etwas,
// wird nur hier angepasst (Masterplan 5.1). Stand der Prüfung: GEAK 7.0.1, 2026-11-14.

export const GEAK_VERSION_GEPRUEFT = '7.0.1';

// --- Adressen ---------------------------------------------------------------------
export const ROUTEN = {
  portfolio: '/portfolio',
  projekt: (id) => `/portfolio/${id}`,
};

// Datenabfragen, die die Seite selbst macht und die wir nur mitlesen (Entscheid 0006).
export const ANTWORTEN = {
  projektliste: /\/api\/portfolio\/findprojects(\?|$)/,
  projekt: (id) => new RegExp(`/api/projects/${id}$`),
};

// Fusszeile: «Gebäudeenergieausweis der Kantone GEAK Version 7.0.1»
export const FUSSZEILE_VERSION = /GEAK Version\s+(\d+(?:\.\d+)+)/;

// --- Reiter des Projekts (Beschriftung wie im Tool) ---------------------------------
// route = Teil hinter /portfolio/{id}; abschnitte = Schlüssel im Datensatz.
export const REITER = [
  { name: 'Projekt', route: '', abschnitte: ['Contributors'] },
  { name: 'Auftraggeberschaft', route: 'client', abschnitte: ['Client'] },
  { name: 'Standort/Potenziale', route: 'location', abschnitte: ['Location', 'LocationPotentials'] },
  { name: 'Gebäude', route: 'building', abschnitte: ['Building'] },
  { name: 'Ist-Zustand', route: 'situation', abschnitte: ['CurrentSituation', 'Constructions', 'Priorities'] },
  { name: 'Massnahmen', route: 'measures', abschnitte: ['Measures'] },
  { name: 'Tarife und Förderprogramme', route: 'prices', abschnitte: ['EnergyPrices', 'ProfitabilityParameter', 'Subsidies'] },
  { name: 'Varianten', route: 'variants', abschnitte: ['Variants'] },
  { name: 'Kosten', route: 'estimatedCosts', abschnitte: ['CostPositions'] },
  // OFFEN: «Ergebnisse» und «Dokumente» sind Menüpunkte ohne eigene Adresse (der Klick änderte
  // die Adresse nicht). Welcher Abschnitt auf welcher Seite steht, ist noch nicht zugeordnet.
  { name: 'Ergebnisse / Dokumente (berechnet, nur lesen)', route: null, abschnitte: ['Results', 'Certificate', 'ProposedText', 'Report', 'Validation', 'QualityCheckResults'] },
];

// Kopfdaten des Projekts, direkt im Datensatz (Reiter «Projekt»).
export const PROJEKT_KOPF = [
  'Id', 'Name', 'State', 'StateLocalized', 'GeakType', 'ParentProjectId', 'ExpertId', 'CertificateNumber',
  'CreateUser', 'CreateDate', 'CreateDateLocalized', 'UpdateUser', 'UpdateDate', 'UpdateDateLocalized', 'Version', 'IsReadonly', 'IsWhitelisted',
  'SubtractOpeningAreas', 'AllowProofDocumentCreation', 'UsePvOptiOnline',
];

// --- Erwartete Struktur --------------------------------------------------------------
// typ    : Typ des Abschnitts.
// unter  : Felder der zweiten Ebene, ohne die das Auslesen abbricht (statt leere Werte zu liefern).
// weitere: weitere bekannte Felder. Mit alleBekannt=true wird jedes andere Feld als «neu» gemeldet.
const obj = 'object';
const arr = 'array';
export const STRUKTUR = {
  Client: {
    typ: obj, alleBekannt: true,
    unter: ['OwnerTitle', 'OwnerFirstName', 'OwnerAddress', 'OwnerZIP', 'OwnerTown', 'OwnerCountryName'],
    weitere: ['OwnerPhone'],
  },
  Location: {
    typ: obj, alleBekannt: true,
    unter: ['Zip', 'Town', 'MunicipalityName', 'Canton', 'Address', 'HouseNumber', 'Egid', 'Edid', 'WeatherStationId', 'Altitude'],
    weitere: ['ZipTown', 'MunicipalityId', 'HasEgidGroup', 'EgidGroupItems', 'Longitude', 'Latitude'],
  },
  LocationPotentials: {
    typ: obj, alleBekannt: true,
    unter: ['EnergyPlan', 'SolarRoof', 'SolarFacade', 'GeoThermalHeatPump', 'GroundWaterHeatPump', 'EnvironmentalHeatPump', 'DistrictHeating', 'WoodFuel', 'Gas', 'Oil', 'InnerExtension', 'ExpansionReplacement'],
  },
  Building: {
    typ: obj, alleBekannt: true,
    unter: ['YearOfConstruction', 'EnergyReferenceArea', 'AverageRoomHeight', 'FullFloorsCount', 'BuildingDepth', 'ConstructionType', 'GroundPlan'],
    weitere: ['EnergyReferenceAreaWizard'],
  },
  CurrentSituation: { typ: obj, unter: ['BuildingUsages', 'BuildingDescription', 'BuildingCategory', 'Envelope', 'Technology'] },
  Measures: { typ: obj, unter: ['Envelope', 'Technology'] },
  Variants: { typ: arr },
  ProfitabilityParameter: { typ: obj, unter: ['RegionFactor', 'CalculationRate', 'InflationRate', 'ConsiderationPeriod'] },
  EnergyPrices: { typ: arr },
  Subsidies: { typ: obj, unter: ['Subsidies', 'UseDeprecatedSubsidiesProgramme'] },
  Certificate: { typ: obj },
  ProposedText: { typ: obj },
  Report: { typ: obj },
  Results: { typ: obj, unter: ['Sia3801Standard', 'Sia3801Effective', 'Profitability', 'Subsidy'] },
  Validation: { typ: obj, unter: ['CompletedNodes'] },
  QualityCheckResults: { typ: arr },
  Priorities: { typ: obj },
  CostPositions: { typ: obj },
  Constructions: { typ: arr },
  Contributors: { typ: arr },
};

// Bauteil- und Gerätelisten (Pfad unterhalb von CurrentSituation bzw. Measures).
export const LISTEN = {
  Dächer: 'Envelope.RoofsAndCeilings.Roofs',
  Decken: 'Envelope.RoofsAndCeilings.Ceilings',
  Aussenwände: 'Envelope.Walls.ExteriorWalls',
  'Übrige Wände': 'Envelope.Walls.OtherWalls',
  'Fenster und Türen': 'Envelope.WallOpenings.WallOpenings',
  'Böden gegen aussen': 'Envelope.Floors.ExteriorFloors',
  'Übrige Böden': 'Envelope.Floors.OtherFloors',
  'Lineare Wärmebrücken': 'Envelope.ThermalBridges.LinearThermalBridges',
  'Punktuelle Wärmebrücken': 'Envelope.ThermalBridges.RadialThermalBridges',
  Wärmeerzeuger: 'Technology.HeatingAndWarmWater.HeatProducers',
  Speicher: 'Technology.HeatingAndWarmWater.Reservoirs',
  Wärmeabgabe: 'Technology.HeatingAndWarmWater.Heaters',
  Warmwasser: 'Technology.HeatingAndWarmWater.WarmWaters',
  Geräte: 'Technology.Electricity.Devices',
  Beleuchtung: 'Technology.Electricity.Lightings',
  'Stromerzeuger (PV)': 'Technology.Electricity.ElectricityProducers',
  Lüftung: 'Technology.Ventilation.Devices',
  Kühlung: 'Technology.Cooling.Devices',
};

export function holePfad(objekt, pfad) {
  return pfad.split('.').reduce((x, k) => (x == null ? undefined : x[k]), objekt);
}

function typVon(wert) {
  return wert === null ? 'null' : Array.isArray(wert) ? 'array' : typeof wert;
}

// Prüft den gelesenen Datensatz gegen die Erwartung. Gibt { fehlt, neu } zurück.
// fehlt = erwartetes Feld fehlt oder hat anderen Typ → das Lesen bricht ab.
// neu   = Feld, das die Feldkarte nicht kennt → melden (Wartung W01), nichts raten.
export function pruefeStruktur(projekt) {
  const fehlt = [];
  const neu = [];
  for (const k of PROJEKT_KOPF) if (!(k in projekt)) fehlt.push(k);

  for (const [name, regel] of Object.entries(STRUKTUR)) {
    const wert = projekt[name];
    if (wert === undefined) { fehlt.push(name); continue; }
    if (typVon(wert) !== regel.typ) { fehlt.push(`${name} (Typ ${typVon(wert)} statt ${regel.typ})`); continue; }
    if (regel.typ !== obj) continue;
    for (const u of regel.unter || []) if (!(u in wert)) fehlt.push(`${name}.${u}`);
    if (regel.alleBekannt) {
      const bekannt = new Set(['Id', ...(regel.unter || []), ...(regel.weitere || [])]);
      for (const k of Object.keys(wert)) if (!bekannt.has(k)) neu.push(`${name}.${k}`);
    }
  }

  const bekannteTop = new Set([...PROJEKT_KOPF, ...Object.keys(STRUKTUR)]);
  for (const k of Object.keys(projekt)) if (!bekannteTop.has(k)) neu.push(k);

  // Listen im Ist-Zustand und bei den Massnahmen müssen vorhanden sein (leer ist erlaubt).
  for (const abschnitt of ['CurrentSituation', 'Measures']) {
    for (const [titel, pfad] of Object.entries(LISTEN)) {
      const x = holePfad(projekt[abschnitt], pfad);
      if (x !== undefined && !Array.isArray(x)) fehlt.push(`${abschnitt}.${pfad} (${titel}) ist keine Liste`);
      if (x === undefined) fehlt.push(`${abschnitt}.${pfad} (${titel})`);
    }
  }
  return { fehlt, neu };
}
