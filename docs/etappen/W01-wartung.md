# W01 – Wartung: Versionswächter, Struktur-Check und Release-Ablauf

- Status: offen
- Meilenstein: M1 Prüfassistent
- Hängt ab von: E01 (Feldkarte, Feldkatalog, Auslesen)

## Ziel

Ein neues Release des GEAK-Tools (2–3 pro Jahr) wird erkannt, bevor der Assist falsch liest oder ins falsche Feld schreibt. Danach lässt es sich nach einem festen Ablauf nachführen. Grundlage: Masterplan Abschnitt 5.

## Umfang

- **Versionswächter** in `oeffneGeak()` bzw. gleich danach: die Release-Version aus der Fusszeile lesen und mit der bestätigten Version vergleichen (z. B. `docs/geak-tool/version.json`). Bei einem Wechsel: deutlich melden, Link auf die Release Notes zeigen und schreibende Funktionen sperren, bis die neue Version bestätigt ist.
- **Struktur-Check** `npm run check-geak` (von Hand gestartet): Strukturabdruck eines festen Referenzprojekts (Seiten, Felder, Beschriftungen, Auswahllisten, Pflichtfelder) mit dem bestätigten Abdruck vergleichen. Bericht: neu / fehlt / geändert, je mit Ort im Tool und betroffenen Einträgen der Feldkarte.
- Befehl, um nach der Anpassung den neuen Abdruck und die neue Version als Referenz zu bestätigen.
- **Release Notes** von <https://www.geak-tool.ch/expertInfo> (Abschnitt «Release Notes») abrufen bzw. lesen, für die Wartungs-Sitzung. Ablage in `docs/geak-tool/releases/`.
- `docs/geak-tool/release-protokoll.md` anlegen.
- Anleitung für die Wartungs-Sitzung (Ablauf Masterplan 5.3), kurz und abhakbar.

## Nicht im Umfang

- Regelmässiger automatischer Lauf und Check vor jedem Schreiben (bewusst weggelassen, 0004).
- Anpassungen an der Feldkarte selbst (macht die jeweilige Wartungs-Sitzung).

## Fertig, wenn

- [ ] Versionswächter liest die Version zuverlässig; eine künstlich geänderte bestätigte Version löst Meldung und Schreibsperre aus
- [ ] Struktur-Check läuft auf dem Referenzprojekt und ist grün; ein künstlich veränderter Abdruck wird als Abweichung erkannt
- [ ] Release Notes lassen sich abrufen und ablegen
- [ ] Release-Protokoll und Ablauf dokumentiert

## Offene Punkte

- OFFEN: Welches Projekt als Referenzprojekt dient (darf sich nicht laufend ändern; ev. eigenes Testprojekt, falls der Unterstützer-Account Projekte anlegen darf).
- OFFEN: Genaues Format der Version in der Fusszeile.
- OFFEN: Ob die Seite `expertInfo` ohne Anmeldung erreichbar ist und in welcher Form die Release Notes vorliegen (Seite, PDF).

## Ergebnis

## Rückmeldungen an den Masterplan
