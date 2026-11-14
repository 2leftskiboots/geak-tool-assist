// Lesen: ein Projekt aus dem GEAK-Tool auslesen (nur lesen, Entscheid 0006).
// Der Assist öffnet die Projektseite im sichtbaren Edge und schreibt die Antwort mit,
// die die Seite selbst abruft. Er schickt keine eigenen Abfragen und klickt nichts.

import fs from 'node:fs';
import path from 'node:path';
import { GEAK_URL } from '../browser.js';
import { ROUTEN, ANTWORTEN, FUSSZEILE_VERSION, GEAK_VERSION_GEPRUEFT, LISTEN, holePfad, pruefeStruktur } from './feldkarte.js';

export const DATEN_ORDNER = path.resolve(import.meta.dirname, '..', '..', 'daten', 'projekte');

async function leseFusszeilenVersion(seite) {
  const text = await seite.locator('body').innerText();
  return FUSSZEILE_VERSION.exec(text)?.[1] ?? null;
}

// Projektliste (Portfolio): wartet auf die Antwort, die die Seite ohnehin abruft.
export async function leseProjektliste(seite) {
  const antwort = seite.waitForResponse((a) => ANTWORTEN.projektliste.test(a.url()) && a.request().method() === 'GET', { timeout: 30000 });
  await seite.goto(new URL(ROUTEN.portfolio, GEAK_URL).href, { waitUntil: 'networkidle' });
  const liste = (await (await antwort).json()).data ?? [];
  return liste.map((p) => ({
    id: p.Id, projektnummer: p.ProjectNumber, objekt: p.BuildingAddress, eigentuemer: p.Owner,
    typ: p.GeakType, kanton: p.Canton, geaendert: p.UpdateDateString,
  }));
}

// Ein Projekt komplett lesen. Bricht mit klarer Meldung ab, wenn erwartete Felder fehlen.
export async function leseProjekt(seite, id) {
  const antwort = seite.waitForResponse((a) => ANTWORTEN.projekt(id).test(a.url()) && a.request().method() === 'GET', { timeout: 60000 });
  await seite.goto(new URL(ROUTEN.projekt(id), GEAK_URL).href, { waitUntil: 'networkidle' });
  const roh = await antwort;
  if (roh.status() !== 200) throw new Error(`Projekt ${id}: Das GEAK-Tool antwortet mit Status ${roh.status()}.`);
  const projekt = await roh.json();
  await seite.waitForTimeout(500);
  const geakVersion = await leseFusszeilenVersion(seite);

  const { fehlt, neu } = pruefeStruktur(projekt);
  if (fehlt.length) {
    throw new Error(
      `Projekt ${id} (GEAK ${geakVersion ?? 'Version unbekannt'}): Erwartete Felder fehlen, nichts gespeichert:\n  - ${fehlt.join('\n  - ')}\n` +
      'Das GEAK-Tool hat sich vermutlich geändert. Feldkarte (src/geak/feldkarte.js) prüfen, Wartung W01.',
    );
  }
  const hinweise = [];
  if (neu.length) hinweise.push(`Neue, unbekannte Felder (nicht in der Feldkarte): ${neu.join(', ')}`);
  if (geakVersion !== GEAK_VERSION_GEPRUEFT) {
    hinweise.push(`GEAK-Version ${geakVersion ?? '(nicht gefunden)'} statt geprüfter ${GEAK_VERSION_GEPRUEFT}. Release Notes: https://www.geak-tool.ch/expertInfo. Nur lesend weiterarbeiten, bis die Wartung die Version bestätigt hat.`);
  }
  return {
    meta: { projektId: id, gelesenAm: new Date().toISOString(), geakVersion, hinweise },
    projekt,
  };
}

export function speichereProjekt(ergebnis) {
  const ordner = path.join(DATEN_ORDNER, String(ergebnis.meta.projektId));
  fs.mkdirSync(ordner, { recursive: true });
  const datei = path.join(ordner, 'projekt.json');
  fs.writeFileSync(datei, JSON.stringify(ergebnis, null, 2));
  fs.writeFileSync(path.join(ordner, 'zusammenfassung.txt'), zusammenfassung(ergebnis).join('\n') + '\n');
  return datei;
}

// Kurzansicht zum Stichproben-Vergleichen mit dem Tool.
export function zusammenfassung({ meta, projekt: p }) {
  const z = [];
  const zeile = (t) => z.push(t);
  zeile(`Projekt ${p.Id}: ${p.Name}  (${p.GeakType}, Status ${p.StateLocalized})`);
  zeile(`Gelesen ${meta.gelesenAm}, GEAK-Version ${meta.geakVersion}, im Tool zuletzt geändert ${p.UpdateDate}`);
  zeile(`Auftraggeberschaft: ${p.Client.OwnerFirstName}, ${p.Client.OwnerAddress}, ${p.Client.OwnerZIP} ${p.Client.OwnerTown}`);
  zeile(`Standort: ${p.Location.Address} ${p.Location.HouseNumber}, ${p.Location.Zip} ${p.Location.Town} (${p.Location.Canton}), EGID ${p.Location.Egid}_${p.Location.Edid}, ${p.Location.Altitude} m ü. M.`);
  zeile(`Gebäude: Baujahr ${p.Building.YearOfConstruction}, EBF ${p.Building.EnergyReferenceArea} m², ${p.Building.FullFloorsCount} Vollgeschosse, Raumhöhe ${p.Building.AverageRoomHeight} m`);
  zeile(`Nutzungen: ${p.CurrentSituation.BuildingUsages.map((u) => `${u.BuildingUsageTypeLocalized} (${u.EnergyReferenceArea} m²)`).join(', ')}`);
  zeile('');
  for (const abschnitt of [['Ist-Zustand', p.CurrentSituation], ['Massnahmen', p.Measures]]) {
    zeile(`${abschnitt[0]} – Anzahl Einträge:`);
    for (const [titel, pfad] of Object.entries(LISTEN)) {
      const liste = holePfad(abschnitt[1], pfad) ?? [];
      if (liste.length) zeile(`  ${titel}: ${liste.length}`);
    }
  }
  zeile('');
  zeile(`Aufbauten (U-Wert-Rechner): ${p.Constructions.length}`);
  zeile(`Varianten: ${p.Variants.map((v) => `${v.ExpertCode} «${v.Title}»`).join(' | ')}`);
  const gewaehlt = p.Subsidies.Subsidies.filter((s) => s.TotalValue > 0 || s.Selected);
  zeile(`Förderpositionen: ${p.Subsidies.Subsidies.length} (davon mit Betrag oder gewählt: ${gewaehlt.length})`);
  zeile(`Energiepreise: ${p.EnergyPrices.length} Energieträger`);
  zeile(`Prüfergebnisse des Tools (Qualitätscheck): ${p.QualityCheckResults.length} Einträge`);
  zeile(`Bereiche als vollständig markiert: ${Object.values(p.Validation.CompletedNodes).filter(Boolean).length} von ${Object.keys(p.Validation.CompletedNodes).length}`);
  if (meta.hinweise.length) { zeile(''); for (const h of meta.hinweise) zeile(`HINWEIS: ${h}`); }
  return z;
}
