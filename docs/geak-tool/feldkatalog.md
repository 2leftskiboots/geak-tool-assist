# Feldkatalog GEAK-Tool

- Stand: 2026-11-14, GEAK-Version 7.0.1, Quelle: Projekt 567444 (nur Struktur, keine Kundendaten)
- Erzeugt mit `npm run feldkatalog` aus dem ausgelesenen Projekt. Nicht von Hand ändern; Beschreibungen stehen in `scripts/feldkatalog.js`.
- Lese-Technik: Entscheid 0006. Zugriffe stehen in `src/geak/feldkarte.js` (Feldkarte).

## Wie lesen

- Feldnamen sind englisch und technisch, so wie das Tool sie liefert. Die Tabelle «Bereiche des Projekts» ordnet sie den Reitern des Tools zu.
- **Typ:** Zahl, Text, ja/nein, Objekt, Liste. «Freitext» = beliebiger Text. Bei Auswahlfeldern stehen die **im Projekt beobachteten** Werte; die vollständige Liste kennt das Tool, der Datensatz zeigt sie nicht (OFFEN, E06 holt sie aus den Auswahllisten der Oberfläche).
- **«nur n/N»:** Das Feld fehlt bei einem Teil der Einträge (optional oder nur bei manchen Bauteilarten).
- `…Localized`-Felder sind Anzeigetexte zum Auswahlwert (z. B. `Type` = `PitchedRoof`, `TypeLocalized` = «Steildach»). Geschrieben wird der Auswahlwert.
- `Id` = Datenbank-Kennung, `UiKey` = Kennung der Oberfläche. Beides ist nicht fachlich und wird nie geschrieben.
- Bauteil-Einträge tragen u. a. `IsMeasure` (Massnahme statt Ist-Zustand), `IsPublished`, `Selected` (Zeilenauswahl in der Oberfläche).

## Offen: Pflichtfelder

- OFFEN: Welche Felder **Pflicht** sind, zeigt der Datensatz nicht. Es gibt nur den Prüfstand je Bereich (`Validation.CompletedNodes`, «vollständig» ja/nein) und die Prüfergebnisse des Tools (`QualityCheckResults`). Pflichtfelder werden in E05/E06 ermittelt, wenn Felder beschrieben werden (dort mit Test im Tool, nicht hier).
- OFFEN: Zuordnung der technischen Feldnamen zu den **sichtbaren Beschriftungen** der Oberfläche. Sie wird für das Schreiben (E06 ff.) gebraucht und dort je Reiter ergänzt.
- OFFEN: «Ergebnisse» und «Dokumente» sind Menüpunkte ohne eigene Adresse; welcher berechnete Abschnitt auf welcher Seite steht, ist nicht zugeordnet.

## Bereiche des Projekts (Reiter)

| Reiter im Tool | Adresse | Abschnitte im Datensatz |
|---|---|---|
| Projekt | `/portfolio/{id}` | `Contributors` |
| Auftraggeberschaft | `/portfolio/{id}/client` | `Client` |
| Standort/Potenziale | `/portfolio/{id}/location` | `Location`, `LocationPotentials` |
| Gebäude | `/portfolio/{id}/building` | `Building` |
| Ist-Zustand | `/portfolio/{id}/situation` | `CurrentSituation`, `Constructions`, `Priorities` |
| Massnahmen | `/portfolio/{id}/measures` | `Measures` |
| Tarife und Förderprogramme | `/portfolio/{id}/prices` | `EnergyPrices`, `ProfitabilityParameter`, `Subsidies` |
| Varianten | `/portfolio/{id}/variants` | `Variants` |
| Kosten | `/portfolio/{id}/estimatedCosts` | `CostPositions` |
| Ergebnisse / Dokumente (berechnet, nur lesen) | (Menüpunkt) | `Results`, `Certificate`, `ProposedText`, `Report`, `Validation`, `QualityCheckResults` |

Weitere Unterseiten (Adresse hinter `/portfolio/{id}/`), laut `Validation.CompletedNodes`: `usages`, `envelope`, `roofs`, `walls`, `windows`, `floors`, `thermalbridges`, `technology`, `heating`, `electricity`, `ventilation`, `cooling`, `consumptions` (Ist-Zustand), `measures/…` mit denselben Namen (Massnahmen), `certificate`, `report`.

## Projektkopf

Reiter «Projekt». Felder direkt im Datensatz: `Id`, `Name`, `State`, `StateLocalized`, `GeakType`, `ParentProjectId`, `ExpertId`, `CertificateNumber`, `CreateUser`, `CreateDate`, `CreateDateLocalized`, `UpdateUser`, `UpdateDate`, `UpdateDateLocalized`, `Version`, `IsReadonly`, `IsWhitelisted`, `SubtractOpeningAreas`, `AllowProofDocumentCreation`, `UsePvOptiOnline`.

## Projekt

### Contributors

Personen mit Zugriff auf das Projekt (hier der Unterstützer-Account).

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Contributors** | Liste |  |
| `Contributors` | Objekt |  |
| `FirstName` | Text | Freitext |
| `Surname` | Text | Freitext |
| `EmailAddress` | Text | Freitext |
| `TraineeType` | Zahl |  |
| `Id` | Zahl |  |

## Auftraggeberschaft

### Client

Auftraggeberschaft: Eigentümerschaft mit Adresse und Telefon.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Client** | Objekt |  |
| `OwnerTitle` | Zahl |  |
| `OwnerFirstName` | Text | Freitext |
| `OwnerAddress` | Text | Freitext |
| `OwnerZIP` | Text | Freitext |
| `OwnerTown` | Text | Freitext |
| `OwnerCountryName` | Text | Freitext |
| `OwnerPhone` | Text | Freitext |

## Standort/Potenziale

### Location

Standort des Gebäudes: Adresse, Gemeinde, EGID/EDID, Wetterstation, Höhe.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Location** | Objekt |  |
| `ZipTown` | Text | Freitext |
| `Zip` | Zahl |  |
| `Town` | Text | Freitext |
| `MunicipalityId` | Zahl |  |
| `MunicipalityName` | Text | Freitext |
| `Canton` | Text | Freitext |
| `Address` | Text | Freitext |
| `HouseNumber` | Text | Freitext |
| `Egid` | Zahl |  |
| `Edid` | Zahl |  |
| `HasEgidGroup` | ja/nein |  |
| `EgidGroupItems[]` | Liste |  |
| `WeatherStationId` | Zahl |  |
| `Altitude` | Zahl |  |
| `Longitude` | Zahl |  |
| `Latitude` | Zahl |  |

### LocationPotentials

Potenziale am Standort (Energierichtplan, Solar, Wärmepumpen, Fernwärme, Holz, Gas, Öl, Ausbau). Je Eintrag Bewertung, Standardtext-Auswahl, Kurztext und Details.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **LocationPotentials** | Objekt |  |
| `EnergyPlan` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `SolarRoof` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `SolarFacade` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `GeoThermalHeatPump` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `GroundWaterHeatPump` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `EnvironmentalHeatPump` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `DistrictHeating` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `WoodFuel` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `Gas` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `Oil` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `InnerExtension` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `ExpansionReplacement` | Objekt |  |
| &nbsp;&nbsp;`Evaluation` | Text | `NotChecked` |
| &nbsp;&nbsp;`StandardTextSelectionKey` | Text | Freitext |
| &nbsp;&nbsp;`Summary` | Text | Freitext |
| &nbsp;&nbsp;`Details` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |

## Gebäude

### Building

Gebäudekennwerte: Baujahr, EBF, Raumhöhe, Geschosse, Gebäudetiefe, Bauweise, Grundriss.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Building** | Objekt |  |
| `YearOfConstruction` | Zahl |  |
| `EnergyReferenceArea` | Zahl |  |
| `EnergyReferenceAreaWizard` | Zahl |  |
| `AverageRoomHeight` | Zahl |  |
| `FullFloorsCount` | Zahl |  |
| `BuildingDepth` | Zahl |  |
| `ConstructionType` | Text | `Middle` |
| `GroundPlan` | Text | `Compact` |

## Ist-Zustand

### CurrentSituation

Ist-Zustand: Gebäudenutzungen, Gebäudehülle (Dach/Decke, Wände, Fenster, Böden, Wärmebrücken) und Gebäudetechnik (Heizung/Warmwasser, Elektrizität, Lüftung, Kühlung). Je Bereich Zustand, Priorität, Texte «Ist-Zustand» und «Mögliche Verbesserungen», Foto-Kennung.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **CurrentSituation** | Objekt |  |
| `BuildingUsages[]` | Liste |  |
| `BuildingUsages` | Objekt |  |
| &nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;`BuildingUsageType` | Text | `SingleHome` |
| &nbsp;&nbsp;`BuildingUsageTypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;`CanUseStandardVentilation` | ja/nein |  |
| &nbsp;&nbsp;`RomanNumeral` | Text | `II` |
| &nbsp;&nbsp;`PeopleCount` | Zahl |  |
| &nbsp;&nbsp;`EnergyReferenceArea` | Zahl |  |
| &nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount1Room` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount2Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount3Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount4Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount5Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount6Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCountOver6Rooms` | Zahl |  |
| &nbsp;&nbsp;`WorkingPlacesCount` | Zahl |  |
| &nbsp;&nbsp;`AverageUsageTime` | Zahl |  |
| &nbsp;&nbsp;`SchoolRoomsCount` | Zahl |  |
| &nbsp;&nbsp;`GymsCount` | Zahl |  |
| &nbsp;&nbsp;`Ap` | Zahl |  |
| &nbsp;&nbsp;`Qw` | Zahl |  |
| &nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `BuildingDescription` | Text | Freitext |
| `BuildingCategory` | Text | `SingleHome` |
| `Envelope` | Objekt |  |
| &nbsp;&nbsp;`RoofsAndCeilings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`RoofType` | Text | `PitchedAtticRoofPartiallyHeated` |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionRoofs` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationRoof` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationRoof` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsRoof` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyRoof` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionCeilings` | Text | `AsNew` |
| &nbsp;&nbsp;&nbsp;&nbsp;`Roofs[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Roofs` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `SouthWest`, `Horizontal`, `NorthEast`, `NorthWest`, `SouthEast` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `PitchedRoof`, `FlatRoof` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConstructionUiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `UValueCalculator` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingWizardIds` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | `Neueindeckung` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Ceilings[]` | Liste |  |
| &nbsp;&nbsp;`Walls` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`FacadeStructure` | Text | `NormallyStructured` |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionExteriorWalls` | Text | `WornOut` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationExteriorWalls` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationExteriorWalls` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsExteriorWalls` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyExteriorWalls` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionOtherWalls` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationOtherWalls` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationOtherWalls` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsOtherWalls` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyOtherWalls` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ExteriorWalls[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ExteriorWalls` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `NorthWest`, `SouthWest`, `SouthEast`, `NorthEast`, `North` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Facade` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `External`, `Library`, `UValueCalculator` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingWizardIds` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConstructionUiKey` | Text (nur 14/18) | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl (nur 14/18) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherWalls[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherWalls` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `NorthEast` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `TowardsUnheatedNoIsolation` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConstructionUiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `Library` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingWizardIds` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`WallOpenings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionWallOpenings` | Text | `EndOfLife` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationWallOpenings` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationWallOpenings` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsWallOpenings` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyWallOpenings` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`WallOpenings[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WallOpenings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `NorthWest`, `SouthWest`, `SouthEast`, `NorthEast` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Door`, `Window` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`GValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`FrameRatio` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Shadowing` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingWizardIds` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | `Ersatz` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`Floors` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`BasementHeatingLevel` | Text | `NotHeated` |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionExteriorFloors` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationExteriorFloors` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationExteriorFloors` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsExteriorFloors` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyExteriorFloors` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionOtherFloors` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationOtherFloors` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationOtherFloors` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsOtherFloors` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyOtherFloors` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ExteriorFloors[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ExteriorFloors` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl (nur 1/2) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Exterior` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `External` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingWizardIds` | Text (nur 1/2) | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherFloors[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherFloors` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `TowardsUnheatedWithIsolation` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConstructionUiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `UValueCalculator` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingWizardIds` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`ThermalBridges` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationThermalBridges` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsThermalBridges` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`LinearThermalBridges[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`LinearThermalBridges` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PsiValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Length` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `WindowStop`, `BuildingBase`, `CeilingOrWall` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`RadialThermalBridges[]` | Liste |  |
| &nbsp;&nbsp;`CurrentSituationDescription` | Text | Freitext |
| `Technology` | Objekt |  |
| &nbsp;&nbsp;`CurrentSituationDescription` | Text | Freitext |
| &nbsp;&nbsp;`HeatingWizard` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatingHeatProducerRefIdCodeItem` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatingHeatEmission` | Text | `Radiators` |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatingYearOfConstruction` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CouplingRefIdCodeItem` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaterHeatProducerRefIdCodeItem` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaterHeatingType` | Text | `Central` |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaterYearOfConstruction` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`TotalReservoirVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaterVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatingVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ReservoirOption` | Text | `TwoSeparate` |
| &nbsp;&nbsp;&nbsp;&nbsp;`WasWizardExecuted` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`HeatingAndWarmWater` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionHeating` | Text | `EndOfLife` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationHeating` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationHeating` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsHeating` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyHeating` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionWarmWater` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationWarmWater` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationWarmWater` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsWarmWater` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyWarmWater` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatProducers` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySourceId` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySource` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Name` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NameDE` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NameFR` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NameIT` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedName` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedHint` | Text (nur 2/3) | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValidityFrom` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatPowerUnit` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Key` | Text | `KiloWattHour` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Value` | Text | `KiloWattHour`, `Kilogram` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DisplayHeatPowerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedHeatPowerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PricePerUnit` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Key` | Text | `Cents`, `Francs` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Value` | Text | `KiloWattHour`, `Ster` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DisplayPricePerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedPricePerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConversionFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleUnits[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleUnits` | Text | `MegaJoule`, `KiloWattHour`, `Kilogram`, `Ster` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NationalWeightingFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PrimaryEnergyFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenewableEnergyFactorPercentage` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenewableEnergyFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Co2EmissionsCoefficientBafu` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Co2EmissionsCoefficientKbob` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityHigh` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityMedium` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityLow` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityProduction` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsNaturalGas` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsOil` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsLongDistance` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsWoodChips` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsWoodLogs` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSolarPanel` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsLongDistanceLE25P` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsLongDistanceLE75P` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsGas` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatPowerEditable` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySourceGroup` | Text | `Electricity`, `Wood` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleHeatProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleHeatProducers` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`AsDefaultEnergySourceForHeatProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`AsDefaultEnergySourceForHeatProducers` | Text | `ElectroReservoirCentralHeating`, `ElectroDirect`, `ElectroBoiler`, `HeatPumpBoiler`, `WoodFiringHandLoaded`, `WoodStoveAsAdditionalHeating` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySourceLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EfficiencyHeater` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EfficiencyWarmWater` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SuppliedDistributionSystem` | Text | `Heater`, `WarmWater` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatingSupplyType` | Text | `Undefined` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SuppliedDistributionSystemLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`YearOfConstruction` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Location` | Text | `Inside`, `Outside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Oversizing` | Text | `x1` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OversizingLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Index` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HsHeatingValue` | Zahl (nur 1/3) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HiHeatingValue` | Zahl (nur 1/3) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DefaultHeatingValue` | Text (nur 1/3) | `Hi` |
| &nbsp;&nbsp;&nbsp;&nbsp;`Reservoirs[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Reservoirs` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer1` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer2` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer3` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer4` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer5` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `WarmWater` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`WarmWaterVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatingVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InstallationSite` | Text | `Outside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InstallationSiteLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectionQuality` | Text | `Good` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectionQualityLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeightToDiameterRatio` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatTransitionCoefficientCover` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Heaters[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Heaters` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Decentral` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Flow` | Text | `f55r40` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`FlowLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HydraulicBalance` | Text | `Unknown` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HydraulicBalanceLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatEmission` | Text | `ConvectionRadiation` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatEmissionLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IndexMainHeatProducer` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP1` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP2` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP3` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP4` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP5` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulated` | Text | `True` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulatedLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationThickness` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationLambda` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HorizontalDistributionPipesLocation` | Text | `Outside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaters[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaters` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Central` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`WarmKeeping` | Text | `None` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`WarmKeepingLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP1` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP2` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP3` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP4` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP5` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulated` | Text | `True` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulatedLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationThickness` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationLambda` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HorizontalDistributionPipesLocation` | Text | `Outside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeaterWarmWaterConsumptions[]` | Liste |  |
| &nbsp;&nbsp;`Electricity` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionDevicesAndLighting` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationDevicesAndLighting` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationDevicesAndLighting` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsDevicesAndLighting` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyElectricity` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationPhotovoltaic` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationPhotovoltaic` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsPhotovoltaic` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyPhotovoltaic` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`WasWizardExecuted` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Devices[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Devices` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsageId` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsageIdLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quality` | Text | `Standard` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`QualityLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CUsagePerYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ElectricityRateParts` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsComfortVentilation` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IncludeInExpertValuesCalculation` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingUsageType` | Text | `SingleHome` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | `Ersatz` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ApartmentUsages[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ApartmentUsages` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsageId` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsageIdLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpansionDegree` | Text | `Standard` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpansionDegreeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ElectricityRateParts` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IncludeInExpertValuesCalculation` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingUsageType` | Text | `SingleHome` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`FunctionalBuildingUsages[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Lightings[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Lightings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LightingQuality` | Text | `Eff75to100` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LightingQualityLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsageId` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsageIdLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpansionDegree` | Text | `Standard` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpansionDegreeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ElectricityRateParts` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IncludeInExpertValuesCalculation` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BuildingUsageType` | Text | `SingleHome` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherConsumers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ElectricityProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`PvOptiElectricityProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`PvOptiSettings[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ConsumerMeters[]` | Liste |  |
| &nbsp;&nbsp;`Ventilation` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationVentilation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsVentilation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`Devices[]` | Liste |  |
| &nbsp;&nbsp;`Cooling` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Devices[]` | Liste |  |
| `Id` | Zahl |  |

### Constructions

Aufbauten aus dem U-Wert-Rechner (Schichten, Materialien, U-Wert). Bauteile verweisen über `ConstructionUiKey` darauf.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Constructions** | Liste |  |
| `Constructions` | Objekt |  |
| `Description` | Text | Freitext |
| `IsMeasure` | ja/nein |  |
| `IsDefaultConstruction` | ja/nein |  |
| `Year` | Zahl (nur 5/6) |  |
| `ExpertCode` | Text | Freitext |
| `AvailableForCategory` | Text | `RoofCeiling`, `Walls`, `Floors` |
| `HeatTransferResistanceInner` | Zahl |  |
| `HeatTransferResistanceOuter` | Text | `BackVentilated`, `Exterior`, `Room` |
| `Layers[]` | Liste |  |
| `Layers` | Objekt |  |
| &nbsp;&nbsp;`Material` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`LambdaValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Texture` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`MaterialExists` | ja/nein |  |
| &nbsp;&nbsp;`Ordering` | Zahl |  |
| &nbsp;&nbsp;`Thickness` | Zahl |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`InnerLayer` | Objekt (nur 7/30) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Material` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`MaterialExists` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Width` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Distance` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| `UValue` | Zahl |  |
| `UiKey` | Text | Freitext |
| `Id` | Zahl |  |

### Priorities

Texte der Prioritätsstufen 1–4.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Priorities** | Objekt |  |
| `Label` | Text | Freitext |
| `Levels[]` | Liste |  |
| `Levels` | Objekt |  |
| &nbsp;&nbsp;`Index` | Zahl |  |
| &nbsp;&nbsp;`Color` | Text | Freitext |
| &nbsp;&nbsp;`Text` | Text | Freitext |

## Massnahmen

### Measures

Massnahmen: gleiche Bauteil- und Gerätelisten wie der Ist-Zustand, mit den geplanten Änderungen (Kosten, Nutzungsdauer, Werterhalt).

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Measures** | Objekt |  |
| `Envelope` | Objekt |  |
| &nbsp;&nbsp;`RoofsAndCeilings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Roofs[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Roofs` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `SouthWest`, `NorthEast`, `NorthWest`, `SouthEast` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `PitchedRoof` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `External` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Ceilings[]` | Liste |  |
| &nbsp;&nbsp;`Walls` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ExteriorWalls[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ExteriorWalls` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `SouthWest`, `NorthWest`, `SouthEast`, `NorthEast`, `North` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Facade` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `External` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherWalls[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherWalls` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `NorthEast` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `TowardsUnheatedNoIsolation` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `External` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`WallOpenings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WallOpenings[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WallOpenings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Orientation` | Text | `SouthWest`, `NorthWest`, `SouthEast`, `NorthEast` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OrientationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Window` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`GValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`FrameRatio` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Shadowing` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | `Neubau` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`Floors` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ExteriorFloors[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherFloors[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherFloors` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TemperatureNextRoomAndSurcharge` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `TowardsUnheatedWithIsolation` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OriginUValue` | Text | `External` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OutsideAth` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `PerSquareMeter` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`ThermalBridges` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`LinearThermalBridges[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`LinearThermalBridges` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenovationYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PsiValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Length` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `WindowStop`, `BuildingBase`, `Balcony` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`RadialThermalBridges[]` | Liste |  |
| `Technology` | Objekt |  |
| &nbsp;&nbsp;`HeatingAndWarmWater` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionHeating` | Text | `EndOfLife` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationHeating` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationHeating` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsHeating` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyHeating` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionWarmWater` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationWarmWater` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationWarmWater` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsWarmWater` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyWarmWater` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeatProducers` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySourceId` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySource` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Name` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NameDE` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NameFR` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NameIT` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedName` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedHint` | Text (nur 2/3) | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValidityFrom` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatPowerUnit` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Key` | Text | `KiloWattHour` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Value` | Text | `KiloWattHour`, `Kilogram` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DisplayHeatPowerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedHeatPowerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PricePerUnit` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Key` | Text | `Cents`, `Francs` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Value` | Text | `KiloWattHour`, `Ster` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DisplayPricePerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocalizedPricePerUnit` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConversionFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleUnits[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleUnits` | Text | `MegaJoule`, `KiloWattHour`, `Kilogram`, `Ster` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`NationalWeightingFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PrimaryEnergyFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenewableEnergyFactorPercentage` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`RenewableEnergyFactor` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Co2EmissionsCoefficientBafu` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Co2EmissionsCoefficientKbob` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityHigh` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityMedium` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityLow` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsElectricityProduction` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsNaturalGas` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsOil` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsLongDistance` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsWoodChips` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsWoodLogs` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSolarPanel` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsLongDistanceLE25P` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsLongDistanceLE75P` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsGas` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatPowerEditable` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySourceGroup` | Text | `Electricity`, `Wood` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleHeatProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PossibleHeatProducers` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`AsDefaultEnergySourceForHeatProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`AsDefaultEnergySourceForHeatProducers` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergySourceLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EfficiencyHeater` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EfficiencyWarmWater` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SuppliedDistributionSystem` | Text | `CoupledAllYear`, `WarmWater`, `Heater` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatingSupplyType` | Text | `Radiators`, `Undefined` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SuppliedDistributionSystemLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`YearOfConstruction` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Location` | Text | `Outside`, `Inside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`LocationLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Oversizing` | Text | `x1` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`OversizingLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Index` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HsHeatingValue` | Zahl (nur 1/3) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HiHeatingValue` | Zahl (nur 1/3) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`DefaultHeatingValue` | Text (nur 1/3) | `Hi` |
| &nbsp;&nbsp;&nbsp;&nbsp;`Reservoirs[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Reservoirs` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer1` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer2` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer3` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer4` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectedToHeatProducer5` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Heating`, `WarmWater` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`WarmWaterVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatingVolume` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InstallationSite` | Text | `Outside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InstallationSiteLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectionQuality` | Text | `Good` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ConnectionQualityLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeightToDiameterRatio` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatTransitionCoefficientCover` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl (nur 1/2) |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text (nur 1/2) | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;`Heaters[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Heaters` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Central` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Flow` | Text | `f55r40` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`FlowLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HydraulicBalance` | Text | `Unknown` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HydraulicBalanceLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatEmission` | Text | `Radiators` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HeatEmissionLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IndexMainHeatProducer` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP1` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP2` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP3` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP4` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP5` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulated` | Text | `True` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulatedLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationThickness` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationLambda` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HorizontalDistributionPipesLocation` | Text | `Outside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaters[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`WarmWaters` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Type` | Text | `Central` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`WarmKeeping` | Text | `None` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`WarmKeepingLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Area` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP1` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP2` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP3` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP4` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CoverageHP5` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulated` | Text | `True` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ThermallyInsulatedLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationThickness` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InsulationLambda` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HorizontalDistributionPipesLocation` | Text | `Outside` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`HeaterWarmWaterConsumptions[]` | Liste |  |
| &nbsp;&nbsp;`Electricity` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`GeneralConditionDevicesAndLighting` | Text | `Used` |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationDevicesAndLighting` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationDevicesAndLighting` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsDevicesAndLighting` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyElectricity` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PrioritizationPhotovoltaic` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationPhotovoltaic` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsPhotovoltaic` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`ImageKeyPhotovoltaic` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`WasWizardExecuted` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Devices[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ApartmentUsages[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`FunctionalBuildingUsages[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Lightings[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`OtherConsumers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ElectricityProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`PvOptiElectricityProducers[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`PvOptiElectricityProducers` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ElectricityProducerType` | Text | `Pv` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`PVoptiOrientation` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SettingAngle` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`InstalledPower` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CommissionYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyValue` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`PvOptiSettings[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`PvOptiSettings` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsTechnology` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergyManagementSystem` | Text | `None` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`EnergyManagementSystemLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`StorageSystemBattery` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`BatteryCapacity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MaintenanceCost` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CommissionYear` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasVariants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Investment` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`MeasureType` | Text | `Neubau` |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`ValuePreservationIncluded` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`ConsumerMeters[]` | Liste |  |
| &nbsp;&nbsp;`Ventilation` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CurrentSituationVentilation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`PossibleImprovementsVentilation` | Text | Freitext |
| &nbsp;&nbsp;&nbsp;&nbsp;`Devices[]` | Liste |  |
| &nbsp;&nbsp;`Cooling` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Devices[]` | Liste |  |
| `Id` | Zahl |  |

## Tarife und Förderprogramme

### EnergyPrices

Energieträger mit Preis, Heizwert und Faktoren (Primärenergie, CO₂).

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **EnergyPrices** | Liste |  |
| `EnergyPrices` | Objekt |  |
| `UiKey` | Text | Freitext |
| `EnergySourceId` | Zahl |  |
| `EnergySource` | Objekt |  |
| &nbsp;&nbsp;`Name` | Text | Freitext |
| &nbsp;&nbsp;`NameDE` | Text | Freitext |
| &nbsp;&nbsp;`NameFR` | Text | Freitext |
| &nbsp;&nbsp;`NameIT` | Text | Freitext |
| &nbsp;&nbsp;`LocalizedName` | Text | Freitext |
| &nbsp;&nbsp;`LocalizedHint` | Text (nur 12/16) | Freitext |
| &nbsp;&nbsp;`ValidityFrom` | Text | Freitext |
| &nbsp;&nbsp;`HeatPowerUnit` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Key` | Text | `KiloWattHour` |
| &nbsp;&nbsp;&nbsp;&nbsp;`Value` | Text | `KiloWattHour`, `Kilogram`, `CubicMeter`, `Liter` |
| &nbsp;&nbsp;`DisplayHeatPowerUnit` | Text | Freitext |
| &nbsp;&nbsp;`LocalizedHeatPowerUnit` | Text | Freitext |
| &nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;`PricePerUnit` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Key` | Text | `Cents`, `Francs` |
| &nbsp;&nbsp;&nbsp;&nbsp;`Value` | Text | `KiloWattHour`, `Kilogram`, `KiloWattHourHS`, `Liter`, `PouredCubicMeter`, `Ster` |
| &nbsp;&nbsp;`DisplayPricePerUnit` | Text | Freitext |
| &nbsp;&nbsp;`LocalizedPricePerUnit` | Text | Freitext |
| &nbsp;&nbsp;`ConversionFactor` | Zahl |  |
| &nbsp;&nbsp;`PossibleUnits[]` | Liste |  |
| &nbsp;&nbsp;`PossibleUnits` | Text | `MegaJoule`, `KiloWattHour`, `Kilogram`, `CubicMeter`, `Liter`, `PouredCubicMeter`, `Ster` |
| &nbsp;&nbsp;`NationalWeightingFactor` | Zahl |  |
| &nbsp;&nbsp;`PrimaryEnergyFactor` | Zahl |  |
| &nbsp;&nbsp;`RenewableEnergyFactorPercentage` | Zahl |  |
| &nbsp;&nbsp;`RenewableEnergyFactor` | Zahl |  |
| &nbsp;&nbsp;`Co2EmissionsCoefficientBafu` | Zahl |  |
| &nbsp;&nbsp;`Co2EmissionsCoefficientKbob` | Zahl |  |
| &nbsp;&nbsp;`IsElectricityHigh` | ja/nein |  |
| &nbsp;&nbsp;`IsElectricityMedium` | ja/nein |  |
| &nbsp;&nbsp;`IsElectricityLow` | ja/nein |  |
| &nbsp;&nbsp;`IsElectricityProduction` | ja/nein |  |
| &nbsp;&nbsp;`IsNaturalGas` | ja/nein |  |
| &nbsp;&nbsp;`IsOil` | ja/nein |  |
| &nbsp;&nbsp;`IsLongDistance` | ja/nein |  |
| &nbsp;&nbsp;`IsWoodChips` | ja/nein |  |
| &nbsp;&nbsp;`IsWoodLogs` | ja/nein |  |
| &nbsp;&nbsp;`IsSolarPanel` | ja/nein |  |
| &nbsp;&nbsp;`IsLongDistanceLE25P` | ja/nein |  |
| &nbsp;&nbsp;`IsLongDistanceLE75P` | ja/nein |  |
| &nbsp;&nbsp;`IsGas` | ja/nein |  |
| &nbsp;&nbsp;`HeatPowerEditable` | ja/nein |  |
| &nbsp;&nbsp;`EnergySourceGroup` | Text | `Electricity`, `Coal`, `Gas`, `Oil`, `LongDistance`, `Wood` |
| &nbsp;&nbsp;`PossibleHeatProducers[]` | Liste |  |
| &nbsp;&nbsp;`PossibleHeatProducers` | Text | Freitext |
| &nbsp;&nbsp;`AsDefaultEnergySourceForHeatProducers[]` | Liste |  |
| &nbsp;&nbsp;`AsDefaultEnergySourceForHeatProducers` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `Name` | Text | Freitext |
| `Hint` | Text (nur 12/16) | Freitext |
| `HeatValue` | Zahl |  |
| `HeatValuePreset` | Zahl |  |
| `HeatValueUnit` | Text | Freitext |
| `LocalizedHeatPowerUnit` | Text | Freitext |
| `Price` | Zahl |  |
| `PricePreset` | Zahl |  |
| `PriceUnit` | Text | Freitext |
| `LocalizedPricePerUnit` | Text | Freitext |
| `Total` | Zahl |  |
| `HeatValueEditable` | ja/nein |  |
| `Selected` | ja/nein |  |
| `Id` | Zahl |  |
| &nbsp;&nbsp;`HsHeatingValue` | Zahl (nur 7/16) |  |
| &nbsp;&nbsp;`HiHeatingValue` | Zahl (nur 7/16) |  |
| &nbsp;&nbsp;`DefaultHeatingValue` | Text (nur 7/16) | `Hi`, `Hs` |
| &nbsp;&nbsp;`HintDE` | Text (nur 3/16) | Freitext |
| &nbsp;&nbsp;`HintFR` | Text (nur 3/16) | Freitext |
| &nbsp;&nbsp;`HintIT` | Text (nur 3/16) | Freitext |
| &nbsp;&nbsp;`ValidityTo` | Text (nur 1/16) | Freitext |

### ProfitabilityParameter

Parameter der Wirtschaftlichkeit (Kalkulationszins, Teuerung, Betrachtungszeitraum).

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **ProfitabilityParameter** | Objekt |  |
| `RegionFactor` | Zahl |  |
| `CalculationRate` | Zahl |  |
| `InflationRate` | Zahl |  |
| `ConsiderationPeriod` | Zahl |  |
| `EnergyInflationRateElectricity` | Zahl |  |
| `EnergyInflationRateFossil` | Zahl |  |
| `EnergyInflationRateWood` | Zahl |  |
| `EnergyInflationRateLongDistance` | Zahl |  |
| `EnergyInflationRateCo2` | Zahl |  |

### Subsidies

Förderprogramm: Förderpositionen mit Menge, Ansatz, Betrag, Hinweis und Zuordnung zu den Varianten (`Variants[]` = Wahrheitswert je Variante in Reihenfolge).

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Subsidies** | Objekt |  |
| `UseDeprecatedSubsidiesProgramme` | ja/nein |  |
| `SubsidyRateA` | Zahl |  |
| `SubsidyRateB` | Zahl |  |
| `SubsidyRateC` | Zahl |  |
| `SubsidyMaxUValueA` | Zahl |  |
| `SubsidyMaxUValueB` | Zahl |  |
| `SubsidyMaxUValueC` | Zahl |  |
| `SubsidyMinimalAmount` | Zahl |  |
| `Subsidies[]` | Liste |  |
| `Subsidies` | Objekt |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Amount` | Zahl |  |
| &nbsp;&nbsp;`Value` | Zahl |  |
| &nbsp;&nbsp;`TotalValue` | Zahl |  |
| &nbsp;&nbsp;`FundingNotes` | Text (nur 42/43) | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;`Id` | Zahl |  |

## Varianten

### Variants

Varianten A–E: Titel, Beschreibung, Bauzeit, Renovationsjahr, Beschreibungstexte je Bereich, Gebäudenutzungen mit Massnahmen.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Variants** | Liste |  |
| `Variants` | Objekt |  |
| `UiKey` | Text | Freitext |
| `Index` | Zahl |  |
| `ExpertCode` | Text | Freitext |
| `Title` | Text | Freitext |
| `Description` | Text | Freitext |
| `ConstructionTime` | Text | Freitext |
| `Area` | Zahl |  |
| `OtherFloorMeasuresDescription` | Text | Freitext |
| `RoofCeilingMeasuresDescription` | Text | Freitext |
| `WallMeasuresDescription` | Text | Freitext |
| `WallOpeningMeasuresDescription` | Text | Freitext |
| `ThermalBridgeMeasuresDescription` | Text | Freitext |
| `WarmwaterMeasuresDescription` | Text | Freitext |
| `HeatingMeasuresDescription` | Text | Freitext |
| `ElectricityMeasuresDescription` | Text | Freitext |
| `BuildingEnvelopeMeasuresDescription` | Text | Freitext |
| `ServiceSituationDescription` | Text | Freitext |
| `RenovationYear` | Zahl |  |
| `AverageRoomHeight` | Zahl |  |
| `FullFloorsCount` | Zahl |  |
| `BuildingDepth` | Zahl |  |
| `ConstructionType` | Text | `Middle` |
| `GroundPlan` | Text | `Compact` |
| `BuildingUsages[]` | Liste |  |
| `BuildingUsages` | Objekt |  |
| &nbsp;&nbsp;`HasExpertCode` | ja/nein |  |
| &nbsp;&nbsp;`HasExpertDescription` | ja/nein |  |
| &nbsp;&nbsp;`BuildingUsageType` | Text | `SingleHome` |
| &nbsp;&nbsp;`BuildingUsageTypeLocalized` | Text | Anzeigetext |
| &nbsp;&nbsp;`CanUseStandardVentilation` | ja/nein |  |
| &nbsp;&nbsp;`RomanNumeral` | Text | `II` |
| &nbsp;&nbsp;`PeopleCount` | Zahl |  |
| &nbsp;&nbsp;`EnergyReferenceArea` | Zahl |  |
| &nbsp;&nbsp;`Quantity` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount1Room` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount2Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount3Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount4Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount5Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCount6Rooms` | Zahl |  |
| &nbsp;&nbsp;`ApartmentsCountOver6Rooms` | Zahl |  |
| &nbsp;&nbsp;`WorkingPlacesCount` | Zahl |  |
| &nbsp;&nbsp;`AverageUsageTime` | Zahl |  |
| &nbsp;&nbsp;`SchoolRoomsCount` | Zahl |  |
| &nbsp;&nbsp;`GymsCount` | Zahl |  |
| &nbsp;&nbsp;`Ap` | Zahl |  |
| &nbsp;&nbsp;`Qw` | Zahl |  |
| &nbsp;&nbsp;`IsMeasure` | ja/nein |  |
| &nbsp;&nbsp;`IsPublished` | ja/nein |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;`ExpertDescription` | Text | Freitext |
| &nbsp;&nbsp;`Measure` | Objekt |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`CalculationBase` | Text | `Lump` |
| &nbsp;&nbsp;&nbsp;&nbsp;`Price` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Difficulty` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Variants[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Variants` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization[]` | Liste |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`SubsidyEligibleModernization` | ja/nein |  |
| &nbsp;&nbsp;&nbsp;&nbsp;`Id` | Zahl |  |
| &nbsp;&nbsp;`IsSubsidyEligible` | ja/nein |  |
| &nbsp;&nbsp;`Selected` | ja/nein |  |
| &nbsp;&nbsp;`TotalPrice` | Zahl |  |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `Selected` | ja/nein |  |
| `Id` | Zahl |  |

## Kosten

### CostPositions

Kosten: feste Positionen (Gerüst, Planung, Nebenkosten, Unvorhergesehenes, MWST, Steuerabzug) und freie Positionen je Bereich.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **CostPositions** | Objekt |  |
| `EnvelopeFreePositions[]` | Liste |  |
| `TechnologyFreePositions[]` | Liste |  |
| `OperatingFacilityFreePositions[]` | Liste |  |
| `AdditionalConstructionFreePositions[]` | Liste |  |
| `DeductionFreePositions[]` | Liste |  |
| `ScaffoldingFixed` | Objekt |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`IsUnitPercent` | ja/nein |  |
| &nbsp;&nbsp;`ValuePreservationSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsSelected[]` | Liste |  |
| &nbsp;&nbsp;`VariantsSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsInvestment[]` | Liste |  |
| &nbsp;&nbsp;`VariantsInvestment` | leer |  |
| &nbsp;&nbsp;`RelevantForCalculation` | ja/nein |  |
| &nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `PlanningCostsFixed` | Objekt |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`IsUnitPercent` | ja/nein |  |
| &nbsp;&nbsp;`ValuePreservationSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsSelected[]` | Liste |  |
| &nbsp;&nbsp;`VariantsSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsInvestment[]` | Liste |  |
| &nbsp;&nbsp;`VariantsInvestment` | leer |  |
| &nbsp;&nbsp;`RelevantForCalculation` | ja/nein |  |
| &nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `AdditionalCostsFixed` | Objekt |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`IsUnitPercent` | ja/nein |  |
| &nbsp;&nbsp;`ValuePreservationSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsSelected[]` | Liste |  |
| &nbsp;&nbsp;`VariantsSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsInvestment[]` | Liste |  |
| &nbsp;&nbsp;`VariantsInvestment` | leer |  |
| &nbsp;&nbsp;`RelevantForCalculation` | ja/nein |  |
| &nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `UnforeseenCostsFixed` | Objekt |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`IsUnitPercent` | ja/nein |  |
| &nbsp;&nbsp;`ValuePreservationSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsSelected[]` | Liste |  |
| &nbsp;&nbsp;`VariantsSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsInvestment[]` | Liste |  |
| &nbsp;&nbsp;`VariantsInvestment` | leer |  |
| &nbsp;&nbsp;`RelevantForCalculation` | ja/nein |  |
| &nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `VatTaxCostFixed` | Objekt |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`IsUnitPercent` | ja/nein |  |
| &nbsp;&nbsp;`ValuePreservationSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsSelected[]` | Liste |  |
| &nbsp;&nbsp;`VariantsSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsInvestment[]` | Liste |  |
| &nbsp;&nbsp;`VariantsInvestment` | leer |  |
| &nbsp;&nbsp;`RelevantForCalculation` | ja/nein |  |
| &nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `TaxDeductionsFixed` | Objekt |  |
| &nbsp;&nbsp;`UiKey` | Text | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`IsUnitPercent` | ja/nein |  |
| &nbsp;&nbsp;`ValuePreservationSelected` | ja/nein |  |
| &nbsp;&nbsp;`ValuePreservation` | Zahl |  |
| &nbsp;&nbsp;`StandardInvestment` | Zahl |  |
| &nbsp;&nbsp;`VariantsSelected[]` | Liste |  |
| &nbsp;&nbsp;`VariantsSelected` | ja/nein |  |
| &nbsp;&nbsp;`VariantsInvestment[]` | Liste |  |
| &nbsp;&nbsp;`VariantsInvestment` | Zahl |  |
| &nbsp;&nbsp;`RelevantForCalculation` | ja/nein |  |
| &nbsp;&nbsp;`UsefulLife` | Zahl |  |
| &nbsp;&nbsp;`Id` | Zahl |  |

## Ergebnisse / Dokumente (berechnet, nur lesen)

### Results

Berechnete Ergebnisse (SIA 380/1, Elektrizität, PV, Wirtschaftlichkeit, Heizung, Förderung, Minergie). Nur lesen.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Results** | Objekt |  |
| `Intermediate[]` | Liste |  |
| `Intermediate` | Objekt |  |
| &nbsp;&nbsp;`IsStandard` | ja/nein |  |
| &nbsp;&nbsp;`th` | Text | Freitext |
| &nbsp;&nbsp;`dTH` | Text | Freitext |
| &nbsp;&nbsp;`Ap` | Text | Freitext |
| &nbsp;&nbsp;`Qp` | Text | Freitext |
| &nbsp;&nbsp;`tP` | Text | Freitext |
| &nbsp;&nbsp;`Qel` | Text | Freitext |
| &nbsp;&nbsp;`fEl` | Text | Freitext |
| &nbsp;&nbsp;`VAe` | Text | Freitext |
| &nbsp;&nbsp;`tc` | Text | Freitext |
| &nbsp;&nbsp;`h` | Text | Freitext |
| &nbsp;&nbsp;`thE` | Text | Freitext |
| &nbsp;&nbsp;`GH` | Text | Freitext |
| &nbsp;&nbsp;`GS` | Text | Freitext |
| &nbsp;&nbsp;`GE` | Text | Freitext |
| &nbsp;&nbsp;`GW` | Text | Freitext |
| &nbsp;&nbsp;`GN` | Text | Freitext |
| &nbsp;&nbsp;`Ae` | Text | Freitext |
| &nbsp;&nbsp;`ARe` | Text | Freitext |
| &nbsp;&nbsp;`ARu` | Text | Freitext |
| &nbsp;&nbsp;`ARn` | Text | Freitext |
| &nbsp;&nbsp;`ARg` | Text | Freitext |
| &nbsp;&nbsp;`AWe` | Text | Freitext |
| &nbsp;&nbsp;`AWu` | Text | Freitext |
| &nbsp;&nbsp;`AWn` | Text | Freitext |
| &nbsp;&nbsp;`AWG` | Text | Freitext |
| &nbsp;&nbsp;`AFe` | Text | Freitext |
| &nbsp;&nbsp;`AFu` | Text | Freitext |
| &nbsp;&nbsp;`AFn` | Text | Freitext |
| &nbsp;&nbsp;`AfG` | Text | Freitext |
| &nbsp;&nbsp;`AwH` | Text | Freitext |
| &nbsp;&nbsp;`AwSouth` | Text | Freitext |
| &nbsp;&nbsp;`AwSouthEast` | Text | Freitext |
| &nbsp;&nbsp;`AwSouthWest` | Text | Freitext |
| &nbsp;&nbsp;`AwEast` | Text | Freitext |
| &nbsp;&nbsp;`AwWest` | Text | Freitext |
| &nbsp;&nbsp;`AwNorth` | Text | Freitext |
| &nbsp;&nbsp;`AwNorthEast` | Text | Freitext |
| &nbsp;&nbsp;`AwNorthWest` | Text | Freitext |
| &nbsp;&nbsp;`AwUnheated` | Text | Freitext |
| &nbsp;&nbsp;`AwHeated` | Text | Freitext |
| &nbsp;&nbsp;`Lrw` | Text | Freitext |
| &nbsp;&nbsp;`z` | Text | Freitext |
| &nbsp;&nbsp;`URe` | Text | Freitext |
| &nbsp;&nbsp;`URu` | Text | Freitext |
| &nbsp;&nbsp;`bUr` | Text | Freitext |
| &nbsp;&nbsp;`URn` | Text | Freitext |
| &nbsp;&nbsp;`URg` | Text | Freitext |
| &nbsp;&nbsp;`UWe` | Text | Freitext |
| &nbsp;&nbsp;`UWu` | Text | Freitext |
| &nbsp;&nbsp;`bUw` | Text | Freitext |
| &nbsp;&nbsp;`Uwg0` | Text | Freitext |
| &nbsp;&nbsp;`bGw` | Text | Freitext |
| &nbsp;&nbsp;`Uwn` | Text | Freitext |
| &nbsp;&nbsp;`UFe` | Text | Freitext |
| &nbsp;&nbsp;`UFu` | Text | Freitext |
| &nbsp;&nbsp;`bUf` | Text | Freitext |
| &nbsp;&nbsp;`Ufg0` | Text | Freitext |
| &nbsp;&nbsp;`bGF` | Text | Freitext |
| &nbsp;&nbsp;`UFn` | Text | Freitext |
| &nbsp;&nbsp;`UwH` | Text | Freitext |
| &nbsp;&nbsp;`UwSouth` | Text | Freitext |
| &nbsp;&nbsp;`UwSouthEast` | Text | Freitext |
| &nbsp;&nbsp;`UwSouthWest` | Text | Freitext |
| &nbsp;&nbsp;`UwEast` | Text | Freitext |
| &nbsp;&nbsp;`UwWest` | Text | Freitext |
| &nbsp;&nbsp;`UwNorth` | Text | Freitext |
| &nbsp;&nbsp;`UwNorthEast` | Text | Freitext |
| &nbsp;&nbsp;`UwNorthWest` | Text | Freitext |
| &nbsp;&nbsp;`UwHeated` | Text | Freitext |
| &nbsp;&nbsp;`Psrw` | Text | Freitext |
| &nbsp;&nbsp;`bWBl` | Text | Freitext |
| &nbsp;&nbsp;`Xi` | Text | Freitext |
| &nbsp;&nbsp;`bWBp` | Text | Freitext |
| &nbsp;&nbsp;`g` | Text | Freitext |
| &nbsp;&nbsp;`Ff` | Text | Freitext |
| &nbsp;&nbsp;`FSh` | Text | Freitext |
| &nbsp;&nbsp;`FSs` | Text | Freitext |
| &nbsp;&nbsp;`FSse` | Text | Freitext |
| &nbsp;&nbsp;`FSsw` | Text | Freitext |
| &nbsp;&nbsp;`FSe` | Text | Freitext |
| &nbsp;&nbsp;`FSw` | Text | Freitext |
| &nbsp;&nbsp;`FSn` | Text | Freitext |
| &nbsp;&nbsp;`FSne` | Text | Freitext |
| &nbsp;&nbsp;`FSnw` | Text | Freitext |
| &nbsp;&nbsp;`BwH` | Text | Freitext |
| &nbsp;&nbsp;`BwSouth` | Text | Freitext |
| &nbsp;&nbsp;`BwSouthEast` | Text | Freitext |
| &nbsp;&nbsp;`BwSouthWest` | Text | Freitext |
| &nbsp;&nbsp;`BwEast` | Text | Freitext |
| &nbsp;&nbsp;`BwWest` | Text | Freitext |
| &nbsp;&nbsp;`BwNorth` | Text | Freitext |
| &nbsp;&nbsp;`BwNorthEast` | Text | Freitext |
| &nbsp;&nbsp;`BwNorthWest` | Text | Freitext |
| &nbsp;&nbsp;`BwHeated` | Text | Freitext |
| &nbsp;&nbsp;`CAe` | Text | Freitext |
| &nbsp;&nbsp;`a0` | Text | Freitext |
| &nbsp;&nbsp;`T0` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir1Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir2Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir3Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir4Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir5Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir6Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir7Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir8Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir9Temp` | Text | Freitext |
| &nbsp;&nbsp;`Reservoir10Temp` | Text | Freitext |
| &nbsp;&nbsp;`VariantIndex` | Zahl |  |
| &nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;`Title` | Text | Freitext |
| `Sia3801Standard[]` | Liste |  |
| `Sia3801Standard` | Objekt |  |
| &nbsp;&nbsp;`ResultType` | Text | `Standard` |
| &nbsp;&nbsp;`IsHeatingPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsWwPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsHeatingWwPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsElectricityPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsElectricityProductionPlausible` | ja/nein |  |
| &nbsp;&nbsp;`PlausibilityNotes` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingStandard` | Text | Freitext |
| &nbsp;&nbsp;`DemandWWStandard` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingWWStandard` | Text | Freitext |
| &nbsp;&nbsp;`DemandElectricityStandard` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeating` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionWW` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeatingWW` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionElectricity` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeatingPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionWwPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeatingWwPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionElectricityPercentage` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingEffective` | Text | Freitext |
| &nbsp;&nbsp;`DemandWWEffective` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingWWEffective` | Text | Freitext |
| &nbsp;&nbsp;`DemandElectricityEffective` | Text | Freitext |
| &nbsp;&nbsp;`VAe` | Zahl |  |
| &nbsp;&nbsp;`VAeFormatted` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionMeasured` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionStandard` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionEffective` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityConsumptionRows[]` | Liste |  |
| &nbsp;&nbsp;`ElectricityConsumptionRows` | Objekt |  |
| &nbsp;&nbsp;`TotalElectricityConsumption` | Objekt |  |
| &nbsp;&nbsp;`ElectricityProductionRows[]` | Liste |  |
| &nbsp;&nbsp;`TotalElectricity` | Objekt |  |
| &nbsp;&nbsp;`OtherEnergySourcesRows[]` | Liste |  |
| &nbsp;&nbsp;`OtherEnergySourcesRows` | Objekt |  |
| &nbsp;&nbsp;`TotalOtherEnergySources` | Objekt |  |
| &nbsp;&nbsp;`TotalPlausibilityCheck` | Objekt |  |
| &nbsp;&nbsp;`QhInKWh` | Text | Freitext |
| &nbsp;&nbsp;`QhToQhLimitRatioAsPercentage` | Text | Freitext |
| &nbsp;&nbsp;`QhLimitInKWh` | Text | Freitext |
| &nbsp;&nbsp;`TotalEnergy` | Text | Freitext |
| &nbsp;&nbsp;`TotalEnergyToLimitRatioAsPercentage` | Text | Freitext |
| &nbsp;&nbsp;`TotalEnergyLimit` | Text | Freitext |
| &nbsp;&nbsp;`TotalSubsidies` | Text | Freitext |
| &nbsp;&nbsp;`EnergyLabelBuildingEnvelope` | Text | `D`, `C`, `B` |
| &nbsp;&nbsp;`EnergyLabelTotalEnergy` | Text | `F`, `D`, `C`, `B`, `A` |
| &nbsp;&nbsp;`EnergyReferenceArea` | Zahl |  |
| &nbsp;&nbsp;`TotalCO2BafuEmissions` | Zahl |  |
| &nbsp;&nbsp;`CO2BafuClassResult` | Text | `A` |
| &nbsp;&nbsp;`CO2BafuClassRangeFrom` | Zahl |  |
| &nbsp;&nbsp;`CO2BafuClassRangeTo` | Zahl |  |
| &nbsp;&nbsp;`th3` | Text | Freitext |
| &nbsp;&nbsp;`Ath` | Text | Freitext |
| &nbsp;&nbsp;`GHull` | Text | Freitext |
| &nbsp;&nbsp;`QRe` | Text | Freitext |
| &nbsp;&nbsp;`QRu` | Text | Freitext |
| &nbsp;&nbsp;`QRn` | Text | Freitext |
| &nbsp;&nbsp;`QRg` | Text | Freitext |
| &nbsp;&nbsp;`Qwext` | Text | Freitext |
| &nbsp;&nbsp;`Qwu` | Text | Freitext |
| &nbsp;&nbsp;`Qwn` | Text | Freitext |
| &nbsp;&nbsp;`Qwg` | Text | Freitext |
| &nbsp;&nbsp;`QFe` | Text | Freitext |
| &nbsp;&nbsp;`QFu` | Text | Freitext |
| &nbsp;&nbsp;`QFn` | Text | Freitext |
| &nbsp;&nbsp;`QFg` | Text | Freitext |
| &nbsp;&nbsp;`QwH` | Text | Freitext |
| &nbsp;&nbsp;`QwS` | Text | Freitext |
| &nbsp;&nbsp;`QwSE` | Text | Freitext |
| &nbsp;&nbsp;`QwSW` | Text | Freitext |
| &nbsp;&nbsp;`QwE` | Text | Freitext |
| &nbsp;&nbsp;`QwW` | Text | Freitext |
| &nbsp;&nbsp;`QwNorth` | Text | Freitext |
| &nbsp;&nbsp;`QwNE` | Text | Freitext |
| &nbsp;&nbsp;`QwNW` | Text | Freitext |
| &nbsp;&nbsp;`QwUnheated` | Text | Freitext |
| &nbsp;&nbsp;`QwHeated` | Text | Freitext |
| &nbsp;&nbsp;`Qlrw` | Text | Freitext |
| &nbsp;&nbsp;`Qp` | Text | Freitext |
| &nbsp;&nbsp;`Qt` | Text | Freitext |
| &nbsp;&nbsp;`paca` | Text | Freitext |
| &nbsp;&nbsp;`Qv` | Text | Freitext |
| &nbsp;&nbsp;`Qtot` | Text | Freitext |
| &nbsp;&nbsp;`H` | Text | Freitext |
| &nbsp;&nbsp;`Qiel` | Text | Freitext |
| &nbsp;&nbsp;`QiP` | Text | Freitext |
| &nbsp;&nbsp;`Qi` | Text | Freitext |
| &nbsp;&nbsp;`QsH` | Text | Freitext |
| &nbsp;&nbsp;`QsS` | Text | Freitext |
| &nbsp;&nbsp;`QsSE` | Text | Freitext |
| &nbsp;&nbsp;`QsSW` | Text | Freitext |
| &nbsp;&nbsp;`QsE` | Text | Freitext |
| &nbsp;&nbsp;`QsW` | Text | Freitext |
| &nbsp;&nbsp;`QsN` | Text | Freitext |
| &nbsp;&nbsp;`QsNE` | Text | Freitext |
| &nbsp;&nbsp;`QsNW` | Text | Freitext |
| &nbsp;&nbsp;`Qs` | Text | Freitext |
| &nbsp;&nbsp;`Qg` | Text | Freitext |
| &nbsp;&nbsp;`gamma` | Text | Freitext |
| &nbsp;&nbsp;`tau` | Text | Freitext |
| &nbsp;&nbsp;`a` | Text | Freitext |
| &nbsp;&nbsp;`etg` | Text | Freitext |
| &nbsp;&nbsp;`Qug` | Text | Freitext |
| &nbsp;&nbsp;`QhEffective` | Text | Freitext |
| &nbsp;&nbsp;`Qh` | Text | Freitext |
| &nbsp;&nbsp;`QhLimit` | Text | Freitext |
| &nbsp;&nbsp;`QhGoal` | Text | Freitext |
| &nbsp;&nbsp;`NormHeatLoad` | Text | Freitext |
| &nbsp;&nbsp;`Ph` | Text | Freitext |
| &nbsp;&nbsp;`PhLimitCorr` | Text | Freitext |
| &nbsp;&nbsp;`Eheiz` | Text | Freitext |
| &nbsp;&nbsp;`EheizToPay` | Text | Freitext |
| &nbsp;&nbsp;`Ehilfheiz` | Text | Freitext |
| &nbsp;&nbsp;`Eww` | Text | Freitext |
| &nbsp;&nbsp;`EwwToPay` | Text | Freitext |
| &nbsp;&nbsp;`Ehilfww` | Text | Freitext |
| &nbsp;&nbsp;`Egub` | Text | Freitext |
| &nbsp;&nbsp;`EelToPay` | Text | Freitext |
| &nbsp;&nbsp;`VariantIndex` | Zahl |  |
| &nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;`Title` | Text | Freitext |
| `Sia3801Effective[]` | Liste |  |
| `Sia3801Effective` | Objekt |  |
| &nbsp;&nbsp;`ResultType` | Text | `Effective` |
| &nbsp;&nbsp;`IsHeatingPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsWwPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsHeatingWwPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsElectricityPlausible` | ja/nein |  |
| &nbsp;&nbsp;`IsElectricityProductionPlausible` | ja/nein |  |
| &nbsp;&nbsp;`PlausibilityNotes` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingStandard` | Text | Freitext |
| &nbsp;&nbsp;`DemandWWStandard` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingWWStandard` | Text | Freitext |
| &nbsp;&nbsp;`DemandElectricityStandard` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeating` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionWW` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeatingWW` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionElectricity` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeatingPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionWwPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionHeatingWwPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ConsumptionElectricityPercentage` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingEffective` | Text | Freitext |
| &nbsp;&nbsp;`DemandWWEffective` | Text | Freitext |
| &nbsp;&nbsp;`DemandHeatingWWEffective` | Text | Freitext |
| &nbsp;&nbsp;`DemandElectricityEffective` | Text | Freitext |
| &nbsp;&nbsp;`VAe` | Zahl |  |
| &nbsp;&nbsp;`VAeFormatted` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionMeasured` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionStandard` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionEffective` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityProductionPercentage` | Text | Freitext |
| &nbsp;&nbsp;`ElectricityConsumptionRows[]` | Liste |  |
| &nbsp;&nbsp;`ElectricityConsumptionRows` | Objekt |  |
| &nbsp;&nbsp;`TotalElectricityConsumption` | Objekt |  |
| &nbsp;&nbsp;`ElectricityProductionRows[]` | Liste |  |
| &nbsp;&nbsp;`TotalElectricity` | Objekt |  |
| &nbsp;&nbsp;`OtherEnergySourcesRows[]` | Liste |  |
| &nbsp;&nbsp;`OtherEnergySourcesRows` | Objekt |  |
| &nbsp;&nbsp;`TotalOtherEnergySources` | Objekt |  |
| &nbsp;&nbsp;`TotalPlausibilityCheck` | Objekt |  |
| &nbsp;&nbsp;`QhInKWh` | Text | Freitext |
| &nbsp;&nbsp;`QhToQhLimitRatioAsPercentage` | Text | Freitext |
| &nbsp;&nbsp;`QhLimitInKWh` | Text | Freitext |
| &nbsp;&nbsp;`TotalEnergy` | Text | Freitext |
| &nbsp;&nbsp;`TotalEnergyToLimitRatioAsPercentage` | Text | Freitext |
| &nbsp;&nbsp;`TotalEnergyLimit` | Text | Freitext |
| &nbsp;&nbsp;`TotalSubsidies` | Text | Freitext |
| &nbsp;&nbsp;`EnergyLabelBuildingEnvelope` | Text | Freitext |
| &nbsp;&nbsp;`EnergyLabelTotalEnergy` | Text | Freitext |
| &nbsp;&nbsp;`EnergyReferenceArea` | Zahl |  |
| &nbsp;&nbsp;`th3` | Text | Freitext |
| &nbsp;&nbsp;`Ath` | Text | Freitext |
| &nbsp;&nbsp;`GHull` | Text | Freitext |
| &nbsp;&nbsp;`QRe` | Text | Freitext |
| &nbsp;&nbsp;`QRu` | Text | Freitext |
| &nbsp;&nbsp;`QRn` | Text | Freitext |
| &nbsp;&nbsp;`QRg` | Text | Freitext |
| &nbsp;&nbsp;`Qwext` | Text | Freitext |
| &nbsp;&nbsp;`Qwu` | Text | Freitext |
| &nbsp;&nbsp;`Qwn` | Text | Freitext |
| &nbsp;&nbsp;`Qwg` | Text | Freitext |
| &nbsp;&nbsp;`QFe` | Text | Freitext |
| &nbsp;&nbsp;`QFu` | Text | Freitext |
| &nbsp;&nbsp;`QFn` | Text | Freitext |
| &nbsp;&nbsp;`QFg` | Text | Freitext |
| &nbsp;&nbsp;`QwH` | Text | Freitext |
| &nbsp;&nbsp;`QwS` | Text | Freitext |
| &nbsp;&nbsp;`QwSE` | Text | Freitext |
| &nbsp;&nbsp;`QwSW` | Text | Freitext |
| &nbsp;&nbsp;`QwE` | Text | Freitext |
| &nbsp;&nbsp;`QwW` | Text | Freitext |
| &nbsp;&nbsp;`QwNorth` | Text | Freitext |
| &nbsp;&nbsp;`QwNE` | Text | Freitext |
| &nbsp;&nbsp;`QwNW` | Text | Freitext |
| &nbsp;&nbsp;`QwUnheated` | Text | Freitext |
| &nbsp;&nbsp;`QwHeated` | Text | Freitext |
| &nbsp;&nbsp;`Qlrw` | Text | Freitext |
| &nbsp;&nbsp;`Qp` | Text | Freitext |
| &nbsp;&nbsp;`Qt` | Text | Freitext |
| &nbsp;&nbsp;`paca` | Text | Freitext |
| &nbsp;&nbsp;`Qv` | Text | Freitext |
| &nbsp;&nbsp;`Qtot` | Text | Freitext |
| &nbsp;&nbsp;`H` | Text | Freitext |
| &nbsp;&nbsp;`Qiel` | Text | Freitext |
| &nbsp;&nbsp;`QiP` | Text | Freitext |
| &nbsp;&nbsp;`Qi` | Text | Freitext |
| &nbsp;&nbsp;`QsH` | Text | Freitext |
| &nbsp;&nbsp;`QsS` | Text | Freitext |
| &nbsp;&nbsp;`QsSE` | Text | Freitext |
| &nbsp;&nbsp;`QsSW` | Text | Freitext |
| &nbsp;&nbsp;`QsE` | Text | Freitext |
| &nbsp;&nbsp;`QsW` | Text | Freitext |
| &nbsp;&nbsp;`QsN` | Text | Freitext |
| &nbsp;&nbsp;`QsNE` | Text | Freitext |
| &nbsp;&nbsp;`QsNW` | Text | Freitext |
| &nbsp;&nbsp;`Qs` | Text | Freitext |
| &nbsp;&nbsp;`Qg` | Text | Freitext |
| &nbsp;&nbsp;`gamma` | Text | Freitext |
| &nbsp;&nbsp;`tau` | Text | Freitext |
| &nbsp;&nbsp;`a` | Text | Freitext |
| &nbsp;&nbsp;`etg` | Text | Freitext |
| &nbsp;&nbsp;`Qug` | Text | Freitext |
| &nbsp;&nbsp;`QhEffective` | Text | Freitext |
| &nbsp;&nbsp;`Qh` | Text | Freitext |
| &nbsp;&nbsp;`QhLimit` | Text | Freitext |
| &nbsp;&nbsp;`QhGoal` | Text | Freitext |
| &nbsp;&nbsp;`NormHeatLoad` | Text | Freitext |
| &nbsp;&nbsp;`Ph` | Text | Freitext |
| &nbsp;&nbsp;`PhLimitCorr` | Text | Freitext |
| &nbsp;&nbsp;`Eheiz` | Text | Freitext |
| &nbsp;&nbsp;`EheizToPay` | Text | Freitext |
| &nbsp;&nbsp;`Ehilfheiz` | Text | Freitext |
| &nbsp;&nbsp;`Eww` | Text | Freitext |
| &nbsp;&nbsp;`EwwToPay` | Text | Freitext |
| &nbsp;&nbsp;`Ehilfww` | Text | Freitext |
| &nbsp;&nbsp;`Egub` | Text | Freitext |
| &nbsp;&nbsp;`EelToPay` | Text | Freitext |
| &nbsp;&nbsp;`VariantIndex` | Zahl |  |
| &nbsp;&nbsp;`ExpertCode` | Text | Freitext |
| &nbsp;&nbsp;`Title` | Text | Freitext |
| `Electricity` | Objekt |  |
| &nbsp;&nbsp;`SelectedVariantIndex` | Zahl |  |
| &nbsp;&nbsp;`SelectViewOptions` | Objekt |  |
| &nbsp;&nbsp;`Standard[]` | Liste |  |
| &nbsp;&nbsp;`Standard` | Objekt |  |
| &nbsp;&nbsp;`Effective[]` | Liste |  |
| &nbsp;&nbsp;`Effective` | Objekt |  |
| &nbsp;&nbsp;`TotalElectricityStandard[]` | Liste |  |
| &nbsp;&nbsp;`TotalElectricityStandard` | Objekt |  |
| &nbsp;&nbsp;`TotalElectricityEffective[]` | Liste |  |
| &nbsp;&nbsp;`TotalElectricityEffective` | Objekt |  |
| `PvOpti` | Objekt |  |
| &nbsp;&nbsp;`Standard[]` | Liste |  |
| &nbsp;&nbsp;`Standard` | Objekt |  |
| &nbsp;&nbsp;`Effective[]` | Liste |  |
| &nbsp;&nbsp;`Effective` | Objekt |  |
| `Profitability` | Objekt |  |
| &nbsp;&nbsp;`VariantResultsStandard[]` | Liste |  |
| &nbsp;&nbsp;`VariantResultsStandard` | Objekt |  |
| &nbsp;&nbsp;`VariantResultsEffective[]` | Liste |  |
| &nbsp;&nbsp;`VariantResultsEffective` | Objekt |  |
| `Heating[]` | Liste |  |
| `Heating` | Objekt |  |
| &nbsp;&nbsp;`VariantIndex` | Zahl |  |
| &nbsp;&nbsp;`VariantName` | Text | Freitext |
| &nbsp;&nbsp;`ResultsTableStandard[]` | Liste |  |
| &nbsp;&nbsp;`ResultsTableStandard[]` | Liste |  |
| &nbsp;&nbsp;`ResultsTableStandard[]` | Text | Freitext |
| &nbsp;&nbsp;`ResultsTableEffective[]` | Liste |  |
| &nbsp;&nbsp;`ResultsTableEffective[]` | Liste |  |
| &nbsp;&nbsp;`ResultsTableEffective[]` | Text | Freitext |
| &nbsp;&nbsp;`SolarFossilUsageDivisionStandard[]` | Liste |  |
| &nbsp;&nbsp;`SolarFossilUsageDivisionStandard[]` | Liste |  |
| &nbsp;&nbsp;`SolarFossilUsageDivisionStandard[]` | Text | Freitext |
| &nbsp;&nbsp;`SolarFossilUsageDivisionEffective[]` | Liste |  |
| &nbsp;&nbsp;`SolarFossilUsageDivisionEffective[]` | Liste |  |
| &nbsp;&nbsp;`SolarFossilUsageDivisionEffective[]` | Text | Freitext |
| &nbsp;&nbsp;`GlossaryDictionary` | Objekt |  |
| `Subsidy` | Objekt |  |
| &nbsp;&nbsp;`UseDeprecatedSubsidiesProgramme` | ja/nein |  |
| &nbsp;&nbsp;`Results[]` | Liste |  |
| &nbsp;&nbsp;`Results` | Objekt |  |
| &nbsp;&nbsp;`SubsidyMinimalAmount` | Zahl |  |
| &nbsp;&nbsp;`MinimalSubsidyNotReachedMessage` | Text | Freitext |
| `Minergie` | Objekt |  |
| &nbsp;&nbsp;`SystemRenewalResults[]` | Liste |  |
| &nbsp;&nbsp;`SystemRenewalResults[]` | Liste |  |
| &nbsp;&nbsp;`SystemRenewalResults[]` | Objekt |  |
| &nbsp;&nbsp;`AllUsagesHaveVentilation` | ja/nein |  |

### Certificate

Texte des GEAK-Berichts je Bauteil und Bereich (Ist-Zustand und Verbesserungen), Datum der Prüfung, Foto-Kennung.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Certificate** | Objekt |  |
| `ApprovalOrInspectionDate` | Text | Freitext |
| `CertificateWalls` | Text | Freitext |
| `CertificateOtherWalls` | Text | Freitext |
| `CertificateRoofCeilings` | Text | Freitext |
| `CertificateFloors` | Text | Freitext |
| `CertificateOtherFloors` | Text | Freitext |
| `CertificateWallOpenings` | Text | Freitext |
| `CertificateHeating` | Text | Freitext |
| `CertificateWarmWater` | Text | Freitext |
| `CertificateElectricity` | Text | Freitext |
| `CertificatePhotovoltaic` | Text | Freitext |
| `CertificateVentilation` | Text | Freitext |
| `CertificateImprovementsWalls` | Text | Freitext |
| `CertificateImprovementsOtherWalls` | Text | Freitext |
| `CertificateImprovementsRoofCeilings` | Text | Freitext |
| `CertificateImprovementsFloors` | Text | Freitext |
| `CertificateImprovementsOtherFloors` | Text | Freitext |
| `CertificateImprovementsWallOpenings` | Text | Freitext |
| `CertificateImprovementsHeating` | Text | Freitext |
| `CertificateImprovementsWarmWater` | Text | Freitext |
| `CertificateImprovementsElectricity` | Text | Freitext |
| `CertificateImprovementsPhotovoltaic` | Text | Freitext |
| `CertificateImprovementsVentilation` | Text | Freitext |
| `CertificateUserBehavior` | Text | Freitext |
| `SynchronizeTextsWithCurrentSituation` | ja/nein |  |
| `ImageKeyBuildingPhotography` | Text | Freitext |

### ProposedText

Vorgeschlagene Texte des Tools.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **ProposedText** | Objekt |  |
| `BuildingEnvelopeEfficiency` | Text | Freitext |
| `TotalEnergyEfficiency` | Text | Freitext |
| `Co2Efficiency` | Text | Freitext |
| `UserBehavior` | Text | Freitext |
| `Appreciation` | Text | Freitext |
| `RoofCeilings` | Text | Freitext |
| `ImprovementsRoofCeilings` | Text | Freitext |
| `Ceilings` | Text | Freitext |
| `ImprovementsCeilings` | Text | Freitext |
| `WallOpenings` | Text | Freitext |
| `ImprovementsWallOpenings` | Text | Freitext |
| `Walls` | Text | Freitext |
| `ImprovementsWalls` | Text | Freitext |
| `OtherWalls` | Text | Freitext |
| `ImprovementsOtherWalls` | Text | Freitext |
| `Floors` | Text | Freitext |
| `ImprovementsFloors` | Text | Freitext |
| `OtherFloors` | Text | Freitext |
| `ImprovementsOtherFloors` | Text | Freitext |
| `Ventilation` | Text | Freitext |
| `ImprovementsVentilation` | Text | Freitext |
| `Cooling` | Text | Freitext |
| `ImprovementsCooling` | Text | Freitext |
| `Heating` | Text | Freitext |
| `ImprovementsHeating` | Text | Freitext |
| `WarmWater` | Text | Freitext |
| `ImprovementsWarmWater` | Text | Freitext |
| `Electricity` | Text | Freitext |
| `ImprovementsElectricity` | Text | Freitext |
| `Photovoltaic` | Text | Freitext |
| `ImprovementsPhotovoltaic` | Text | Freitext |

### Report

Angaben zum Beratungsbericht.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Report** | Objekt |  |
| `AdvisoryReportGenerationOptions` | Objekt |  |
| &nbsp;&nbsp;`CalculatorResultType` | Text | `Standard` |
| &nbsp;&nbsp;`VariantsToInclude[]` | Liste |  |
| &nbsp;&nbsp;`VariantsToInclude` | Text | Freitext |
| &nbsp;&nbsp;`RecommendedVariant` | Text | Freitext |
| &nbsp;&nbsp;`LocationPotentialIncluded` | ja/nein |  |
| &nbsp;&nbsp;`BuildingWizard3DImagesIncluded` | ja/nein |  |
| `ExplanationEnergyNeeds` | Text | Freitext |
| `ExplanationHeatLoss` | Text | Freitext |
| `HasUploadedReport` | ja/nein |  |
| `ReportRecommendedVariantDescription` | Text | Freitext |
| `PlanningSteps[]` | Liste |  |
| `PlanningSteps` | Objekt |  |
| &nbsp;&nbsp;`StepId` | Text | Freitext |
| &nbsp;&nbsp;`OrderIdx` | Zahl |  |
| &nbsp;&nbsp;`StepTitle` | Text | Freitext |
| &nbsp;&nbsp;`StepDesc` | Text | Freitext |
| `AdditionalSuggestions[]` | Liste |  |
| `AdditionalSuggestions` | Objekt |  |
| &nbsp;&nbsp;`OrderIdx` | Zahl |  |
| &nbsp;&nbsp;`Priority` | Zahl |  |
| &nbsp;&nbsp;`Title` | Text | Freitext |
| &nbsp;&nbsp;`Description` | Text | Freitext |
| &nbsp;&nbsp;`Improvement` | Text | Freitext |
| &nbsp;&nbsp;`Id` | Zahl |  |
| `IsInitialized` | ja/nein |  |

### Validation

Prüfstand des Tools: welche Bereiche vollständig sind, was berechnet/erzeugt werden kann.

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **Validation** | Objekt |  |
| `HasAssignedMeasures` | ja/nein |  |
| `CanCalculate` | ja/nein |  |
| `CanPreviewGeak` | ja/nein |  |
| `CanGenerateGeak` | ja/nein |  |
| `CanPreviewProofDocument` | ja/nein |  |
| `CanGenerateProofDocument` | ja/nein |  |
| `CanPreviewReport` | ja/nein |  |
| `CanGenerateReport` | ja/nein |  |
| `CanUploadReport` | ja/nein |  |
| `CanViewProofDocumentPage` | ja/nein |  |
| `ReasonNotCanGenerateGeak` | Text | Freitext |
| `ReasonNotCanGenerateProofDocument` | Text | Freitext |
| `ReasonNotCanGenerateReport` | Text | Freitext |
| `Details[]` | Liste |  |
| `SurfaceChecks` | Objekt |  |
| &nbsp;&nbsp;`North` | Objekt |  |
| &nbsp;&nbsp;`NorthEast` | Objekt |  |
| &nbsp;&nbsp;`SouthEast` | Objekt |  |
| &nbsp;&nbsp;`SouthWest` | Objekt |  |
| &nbsp;&nbsp;`NorthWest` | Objekt |  |
| `CompletedNodes` | Objekt |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/client` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/building` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/location` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/situation` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/usages` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/envelope` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/roofs` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/walls` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/windows` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/floors` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/thermalbridges` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/technology` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/heating` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/electricity` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/ventilation` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/cooling` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/consumptions` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/envelope` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/roofs` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/walls` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/windows` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/floors` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/thermalbridges` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/technology` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/heating` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/electricity` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/ventilation` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/measures/cooling` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/prices` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/variants` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/certificate` | ja/nein |  |
| &nbsp;&nbsp;`/portfolio/[projectId]/report` | ja/nein |  |

### QualityCheckResults

Prüfergebnisse des Tools (Qualitätscheck).

| Feld | Typ | Auswahlwerte (beobachtet) |
|---|---|---|
| **QualityCheckResults** | Liste |  |
| `QualityCheckResults` | Objekt |  |
| `UiKey` | Text | Freitext |
| `EndUserMessage` | Text | Freitext |
| `RuleType` | Text | `PhotoQualityCheckRule`, `UValueQualityCheckRule`, `GValueQualityCheckRule`, `ConsumptionEnergySourceQualityCheckRule`, `PlausibilityControlQualityCheckRule` |
| `QualityCheckSection` | Text | `PhotoQualitySection`, `UValueQualitySection`, `GValueQualitySection`, `EntryVerificationQualitySection`, `PlausibilityControlQualitySection` |
| `RuleTarget` | Text | `ThermalBridges`, `Walls`, `Windows`, `Floors`, `ElectricityLow`, `WoodLogs`, `HeatingCheck`, `WarmwaterCheck`, `HeatingWarmwaterCheck`, `ElectricityCheck`, `AllEnergySourcesCheck` |
| `TargetBuildingEntityId` | Zahl |  |
| `TargetHeatProducerId` | Zahl |  |
| `ModernizationId` | Zahl |  |
| `IsMuted` | ja/nein |  |
| `AffectsModernization` | ja/nein |  |
| `Id` | Zahl |  |
| `TargetBuildingEntityExpertCode` | Text (nur 25/33) | Freitext |

