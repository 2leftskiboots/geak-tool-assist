// Förderdatenbank (E03): Laden und Prüfen der JSON-Dateien unter foerderdaten/.
// Schema: foerderdaten/SCHEMA.md. Nur lesend; schreibt nichts.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..', 'foerderdaten');

const STATUS = ['programm', 'kein_programm', 'unklar'];
const KATEGORIEN = ['geak', 'huelle', 'heizung', 'solar_thermie', 'pv', 'pv_speicher', 'waermenetz', 'neubau', 'beratung', 'mobilitaet', 'sonstiges'];
const ANSATZ_ARTEN = ['pro_m2', 'pro_kw', 'pro_kwp', 'pro_kwh', 'pauschal', 'prozent', 'andere'];

export const LUECKEN_ARTEN = ['unklar_formel', 'nicht_abrufbar', 'nicht_geprueft', 'veraltet', 'schwache_evidenz', 'rueckfrage'];

/** Alle Lücken aller Dateien als flache Liste (für E04: Lücke statt raten). */
export function alleLuecken({ gemeinden, kanton, bund }) {
  return [...gemeinden, kanton, bund].filter(Boolean).flatMap(({ daten }) => (daten.luecken || []).map((l) => ({ traeger: daten.traeger, ...l })));
}

function lies(pfad) {
  return JSON.parse(readFileSync(pfad, 'utf8'));
}

/** Alle Dateien der Datenbank: { gemeinden: [...], kanton, bund }. */
export function ladeAlle() {
  const gemeindenDir = join(WURZEL, 'gemeinden');
  const gemeinden = existsSync(gemeindenDir)
    ? readdirSync(gemeindenDir).filter((f) => f.endsWith('.json')).sort().map((f) => ({ datei: f, daten: lies(join(gemeindenDir, f)) }))
    : [];
  const einzeln = (name) => (existsSync(join(WURZEL, name)) ? { datei: name, daten: lies(join(WURZEL, name)) } : null);
  return { gemeinden, kanton: einzeln('kanton-bern.json'), bund: einzeln('bund.json'), liste: lies(join(WURZEL, 'gemeinden.json')) };
}

/** Formale Prüfung einer Datei. Gibt eine Liste von Meldungen zurück (leer = in Ordnung). */
export function pruefeDatei({ datei, daten }, { gemeinde = true } = {}) {
  const m = [];
  const f = (t) => m.push(`${datei}: ${t}`);
  if (!daten.traeger) f('traeger fehlt');
  if (gemeinde && !Number.isInteger(daten.bfs)) f('bfs fehlt');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(daten.abgerufen || '')) f('abgerufen fehlt oder ist kein Datum (JJJJ-MM-TT)');
  if (!STATUS.includes(daten.status)) f(`status ungültig: ${daten.status}`);
  if (!Array.isArray(daten.geprueft) || daten.geprueft.length === 0) f('geprueft ist leer (jede Quelle, auch bei kein_programm, muss genannt sein)');
  const progs = daten.programme || [];
  if (daten.status === 'programm' && progs.length === 0) f('status programm, aber keine Programme');
  if (daten.status === 'programm' && !(daten.dokumente || []).length) f('status programm, aber kein Originaldokument unter dokumente');
  if (daten.status === 'kein_programm' && progs.length > 0) f('status kein_programm, aber Programme vorhanden');
  const lk = daten.luecken || [];
  if (daten.status === 'unklar' && lk.length === 0) f('status unklar, aber keine Lücke unter luecken eingetragen');
  for (const l of lk) if (!l.id || !LUECKEN_ARTEN.includes(l.art) || !l.text) f(`Lücke ungültig (id, art, text nötig): ${JSON.stringify(l).slice(0, 60)}`);
  const ids = new Set();
  for (const p of progs) {
    const k = p.id || '(ohne id)';
    if (!p.id) f('Programm ohne id');
    if (ids.has(p.id)) f(`id doppelt: ${p.id}`);
    ids.add(p.id);
    if (!KATEGORIEN.includes(p.kategorie)) f(`${k}: kategorie ungültig: ${p.kategorie}`);
    if (!p.massnahme) f(`${k}: massnahme fehlt`);
    if (!p.ansatz || !ANSATZ_ARTEN.includes(p.ansatz.art)) f(`${k}: ansatz.art ungültig`);
    else if (p.ansatz.art !== 'andere' && typeof p.ansatz.wert !== 'number') f(`${k}: ansatz.wert fehlt`);
    if (!p.quelle || !p.quelle.url) f(`${k}: quelle.url fehlt`);
  }
  return m;
}

/** Flache Form für den Vergleich zwischen zwei Ständen: Schlüssel -> Wert (Text). */
export function flach({ gemeinden, kanton, bund }) {
  const out = {};
  const dateien = [...gemeinden, kanton, bund].filter(Boolean);
  for (const { daten } of dateien) {
    const t = daten.traeger;
    out[`${t}|status`] = daten.status;
    for (const [k, v] of Object.entries(daten.allgemein || {})) out[`${t}|allgemein|${k}`] = JSON.stringify(v);
    for (const d of daten.dokumente || []) out[`${t}|dokument|${d.url}`] = `${d.stand || ''}|${d.gueltig_ab || ''}|${d.gueltig_bis || ''}`;
    for (const l of daten.luecken || []) out[`${t}|luecke|${l.id}`] = l.text;
    for (const p of daten.programme || []) {
      out[`${t}|programm|${p.id}`] = JSON.stringify({ a: p.ansatz, min: p.minimum, max: p.maximum, b: p.bedingungen, k: p.kombinierbar, ab: p.gueltig_ab, bis: p.gueltig_bis });
    }
  }
  return out;
}

/** Unterschiede zwischen altem und neuem flachem Stand. */
export function vergleiche(alt, neu) {
  const neuH = [], weg = [], geaendert = [];
  for (const k of Object.keys(neu)) {
    if (!(k in alt)) neuH.push(k);
    else if (alt[k] !== neu[k]) geaendert.push(k);
  }
  for (const k of Object.keys(alt)) if (!(k in neu)) weg.push(k);
  return { neu: neuH, weg, geaendert };
}
