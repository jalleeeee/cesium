/* ============================================================
   ALLEE CMIP — Data Module
   All property, mine, geological, and economic data
   ============================================================ */

const ALLEE = {
  // --- Property ---
  property: {
    name: 'Dubois Mine Complex',
    legal: 'SW¼ of SW¼ · Section 19 · T12S · R8E',
    county: 'Hardin County, Illinois',
    acres: 40,
    owner: 'James Jeffery Allee',
    acquired: 1987,
    unleased: true,
    titlePolicy: 'Attorneys\' Title Guaranty Fund Policy No. 2131121',
    titleDate: 'June 21, 1988',
    taxParcel: '281-109-075',
    boundary: [
      [-88.3857, 37.4445],
      [-88.3857, 37.4514],
      [-88.3784, 37.4514],
      [-88.3784, 37.4445],
      [-88.3857, 37.4445]
    ],
    center: [-88.38205, 37.44795]
  },

  // --- Mines ---
  mines: [
    {
      name: 'Dubois Mine',
      lat: 37.4480,
      lon: -88.3814,
      operator: 'Crown Fluorspar Corporation',
      period: 'Operating since 1904 (intermittent)',
      production: '1,000–2,000 tons',
      depth: '45–100 ft shaft workings',
      vein: 'Illinois Furnace Fault Zone',
      isgsRef: 'ISGS Co. No. 069, Parker No. 6',
      orientation: 'N60°–65°E, nearly vertical',
      reeTested: false,
      source: 'ISGS Mine Inventory, July 7, 1988'
    },
    {
      name: 'Indiana Mine',
      altNames: 'Hillside No. 2 / Rogerstown',
      lat: 37.4495,
      lon: -88.3800,
      operator: 'Indiana Fluorspar Land Co. / U.S. Fluorspar Co.',
      period: '1923–1925',
      production: '5,900 TONS — largest on property',
      veinDetail: '2 parallel veins, 130 ft apart at surface',
      veinStrike: 'N16°E, dip sharply west',
      workings: 'West vein: shaft + 2 drift levels + x-cut at 100 ft',
      untestedBelow: '100 feet',
      reeTested: false,
      source: 'ISGS Bulletin 58 pp.81-82; Circular 384 p.31'
    },
    {
      name: 'Lavender Mine',
      lat: 37.4470,
      lon: -88.3820,
      operator: 'C.H. Stone, operator',
      production: 'Minor',
      depth: '40 ft shaft',
      vein: 'N-S to 80°W, gravel spar (fluorite)',
      area: 'NW, SE, SW quarters of Section 19',
      reeTested: false,
      source: 'ISGS Bulletin 76, p.145'
    }
  ],

  // --- Geological Features ---
  hicksDome: {
    name: 'Hicks Dome',
    lat: 37.51,
    lon: -88.43,
    distanceMi: 7.8,
    estimate: '12–65 million raw tons of critical minerals ore',
    hreeGrade: 'Order of magnitude higher than Mountain Pass, CA',
    keyElements: 'Dysprosium, Terbium, Yttrium, Scandium',
    drillCore: 'Y: up to 13,000 ppm; Sc: up to 600 ppm (Hamp Well)',
    terraNova: 'HREE enrichment derived from brine-melts exsolved from deep carbonatite source, transported along brecciated fault pathways throughout the district.',
    source: 'Trela, Freiburg, Gazel et al. 2024 (Terra Nova, doi:10.1111/ter.12712)'
  },

  sparksHill: {
    name: 'Sparks Hill Diatreme',
    lat: 37.48,
    lon: -88.41,
    distanceMi: 3.1,
    reeValues: { La: 293, Ce: 467, Pr: 45.5, Nd: 143 },
    rockType: 'Ultramafic breccia',
    source: 'Denny, Maria et al. 2017 (ISGS Circular 588)',
    quote: 'Evidence for a buried carbonatite complex beneath the Illinois-Kentucky fluorspar district'
  },

  illinoisFurnaceFault: {
    name: 'Illinois Furnace Fault Zone',
    displacement: '850 ft vertical',
    description: 'Same brecciated pathway system described as REE transport conduit in Trela, Freiburg et al. 2024 (Terra Nova).',
    strike: 'N60°–65°E'
  },

  // --- Distances ---
  distances: [
    { label: 'Hicks Dome REE', value: '7.8 mi', direction: '→' },
    { label: 'Sparks Hill', value: '3.1 mi', direction: '→' },
    { label: 'Rosiclare Mine', value: '4.2 mi', direction: '→' },
    { label: 'Cave-In-Rock', value: '11.2 mi', direction: '→' }
  ],

  // --- REE Data Table ---
  reeData: [
    {
      location: 'This Property',
      distance: '0 mi',
      rockType: 'Fluorite vein / breccia',
      reeValues: 'UNTESTED — No sampling conducted',
      confidence: 'speculative',
      source: '—'
    },
    {
      location: 'Sparks Hill Diatreme',
      distance: '3.1 mi',
      rockType: 'Ultramafic breccia',
      reeValues: 'La:293 Ce:467 Nd:143 ppm',
      confidence: 'confirmed',
      source: 'Denny et al. 2017'
    },
    {
      location: 'KY District Dikes (avg)',
      distance: '15-30 mi',
      rockType: 'Alkaline dikes',
      reeValues: 'TREE avg 337 ppm',
      confidence: 'confirmed',
      source: 'Lukoczki et al. 2022'
    },
    {
      location: 'Hicks Dome breccia',
      distance: '7.8 mi',
      rockType: 'HREE breccia',
      reeValues: 'Y:13,000 Sc:600 ppm',
      confidence: 'confirmed',
      source: 'Trela et al. 2024'
    },
    {
      location: 'Hicks Dome carbonatite',
      distance: '7.8 mi',
      rockType: 'Ca-carbonatite',
      reeValues: 'LREE 10,000–80,000 ppm',
      confidence: 'confirmed',
      source: 'GSA 2023'
    }
  ],

  // --- Resource Estimate Scenarios ---
  scenarios: [
    {
      name: 'Conservative',
      strike: '300m', width: '1.2m', depth: '60m',
      tonnage: '58,000 t', grade: '200 ppm',
      containedREE: '12 tonnes', highlight: false
    },
    {
      name: 'Moderate ★',
      strike: '400m', width: '3.0m', depth: '150m',
      tonnage: '486,000 t', grade: '500 ppm',
      containedREE: '243 tonnes', highlight: true
    },
    {
      name: 'Optimistic',
      strike: '500m', width: '5.0m', depth: '250m',
      tonnage: '1,690,000 t', grade: '2,000 ppm',
      containedREE: '3,375 tonnes', highlight: false
    }
  ],

  // --- Value at Current Prices (Moderate Scenario) ---
  valueEstimate: [
    { element: 'Dysprosium (Dy)', pct: '3%', qty: '7.3 t', priceKg: '$930/kg', value: '$6.8M' },
    { element: 'Terbium (Tb)', pct: '1%', qty: '2.4 t', priceKg: '$795/kg', value: '$1.9M' },
    { element: 'Yttrium (Y)', pct: '15%', qty: '36.5 t', priceKg: '$36/kg', value: '$1.3M' },
    { element: 'Neodymium (Nd)', pct: '20%', qty: '48.6 t', priceKg: '$227/kg', value: '$11M' }
  ],
  valueTotalTREE: '243 t',
  valueBlended: '~$22M gross',

  // --- Exploration Cost Phases ---
  phases: [
    {
      phase: 'Immediate',
      activity: 'Mine dump rock chip sampling (20-30 samples)\nALS Global ICP-MS analysis',
      cost: '$2,000–$5,000',
      timeline: '2 weeks',
      result: 'First REE data on property'
    },
    {
      phase: 'Phase 1',
      activity: 'Systematic soil sampling (150-200 samples, 25-50m grid), geological mapping',
      cost: '$25,000–$60,000',
      timeline: '2-4 mo',
      result: 'Exploration target defined'
    },
    {
      phase: 'Phase 2',
      activity: 'Diamond core drilling\n8-15 holes, 1,500-3,000m',
      cost: '$400K–$1M',
      timeline: '4-8 mo',
      result: 'Inferred Resource possible'
    },
    {
      phase: 'Phase 3',
      activity: 'NI 43-101 / JORC report by Qualified Person',
      cost: '$50K–$150K',
      timeline: '3-6 mo',
      result: 'Bankable resource estimate'
    },
    {
      phase: 'GOVERNMENT-FUNDED PATH',
      activity: 'ISGS Earth MRI Phase III sampling (requesting inclusion NOW →)',
      cost: 'FREE (ISGS-funded)',
      timeline: 'NOW',
      result: 'Official REE data, no cost to owner',
      highlight: true
    }
  ],

  // --- Fluorspar Market Data ---
  fluorspar: {
    status: 'Federally designated critical mineral',
    lastUSProduction: 1995,
    importPct: '100%',
    priceQ4_2025: '$484/MT (Q4 2025 import)',
  },

  // --- Documents ---
  documents: {
    title: [
      {
        name: "Attorneys' Title Guaranty Fund — Owner's Title Insurance Policy",
        ref: 'Policy No. 2131121',
        date: 'June 21, 1988',
        coverage: '$6,000',
        parties: 'Insured: James J. Allee',
        significance: 'Confirms fee simple ownership with no mineral rights encumbrances. Issued by Richard Kruger, Kruger & Henry, Metropolis, IL.',
        status: 'original'
      },
      {
        name: 'Quit Claim Deed — Lawrence A. & Judy M. DuBois to James J. Allee',
        ref: 'Doc. No. 3201 | Book 65, Page 56',
        date: 'Recorded April 14, 1987',
        significance: 'One of four simultaneous deeds establishing complete chain of title.',
        status: 'recorded'
      },
      {
        name: 'Quit Claim Deed — Lorraine Wallace Siener to James J. Allee',
        ref: 'Doc. No. 3202 | Book 65, Page 57',
        date: 'Recorded April 14, 1987',
        significance: 'Transfers Wallace family interest in Section 19 mineral rights.',
        status: 'recorded'
      },
      {
        name: 'Quit Claim Deed — Annette Wallace Gardiner & Robert A. Gardiner',
        ref: 'Doc. No. 3204 | Book 65, Page 59',
        date: 'Recorded April 14, 1987',
        significance: 'Transfers Gardiner family interest, completing Wallace heir transfers.',
        status: 'recorded'
      },
      {
        name: 'Quit Claim Deed — Melvin C. & Zella M. Lockard to James J. Allee',
        ref: 'Doc. No. 3203 | Book 65, Page 58',
        date: 'Recorded April 14, 1987',
        significance: 'Transfers Lockard family interest. Melvin Lockard later confirmed Allied Chemical offer history.',
        status: 'recorded'
      },
      {
        name: 'Quit Claim Deed (Marital Release) — Lauri Lynn Mitchell',
        ref: 'Doc. No. 4819 | Book 66, Page 291',
        date: 'Recorded September 30, 1988',
        significance: 'Releases all marital/homestead interest in property. Filed "Allee v. Allee".',
        status: 'recorded'
      },
      {
        name: 'Florence E. DuBois Quit Claim to Lawrence A. DuBois',
        ref: 'Doc. No. 4109 | Book 66, Page 46',
        date: 'Recorded February 17, 1988',
        significance: 'Clears remaining DuBois interest in chain of title.',
        status: 'recorded'
      },
      {
        name: 'Affidavits of Heirship — G. Wallace Rich & Melvin C. Lockard',
        ref: 'Recording fees: $22.00',
        date: 'Recorded 1988',
        significance: 'Cleared heirship of Robert F. Wallace and Howard/Florence DuBois estates.',
        status: 'recorded'
      },
      {
        name: 'Real Estate Tax Bill — 1986 tax, payable 1987',
        ref: 'Property Index No. 281-109-075',
        date: '1986/1987',
        significance: 'Owner: James J. Allee. Total tax: $8.79. Confirms active, current ownership.',
        status: 'original'
      }
    ],
    geological: [
      {
        name: 'ISGS Letter — James W. Baxter to James J. Allee',
        ref: 'Illinois State Geological Survey, Champaign, IL',
        date: 'July 6, 1988',
        significance: 'Responds to Allee telephone inquiry. Confirms ISGS has file on property. Encloses data sheets on Dubois, Lavender, and Indiana mines. States: "We may have some other published and unpublished data that would be of interest as well."',
        status: 'original'
      },
      {
        name: 'ISGS Non-Coal Underground Mine Inventory — Dubois Mine',
        ref: 'ISGS Co. No. 069, Parker No. 6',
        date: 'Stamped July 7, 1988',
        significance: 'Primary source ISGS data sheet. Documents mine geometry, operators, production (1,000–2,000 tons), and geological references.',
        status: 'original'
      },
      {
        name: 'ISGS Non-Coal Underground Mine Inventory — Indiana Mine',
        ref: 'ISGS Co. No. 069, Parker No. 6',
        date: 'Stamped July 7, 1988',
        significance: '5,900 tons documented production 1923–1925. Two parallel veins 130 ft apart. System untested below 100 feet depth.',
        status: 'original'
      },
      {
        name: 'ISGS Non-Coal Underground Mine Inventory — Lavender Mine',
        ref: 'ISGS Co. No. 069, Parker No. 6',
        date: 'Stamped July 7, 1988',
        significance: 'Minor producer. N-S to 80°W vein. C.H. Stone, operator.',
        status: 'original'
      }
    ],
    commercial: [
      {
        name: 'Allied Chemical Corporation Mineral Offer',
        ref: 'Via K.C. Brown, J&B Real Estate, Rosiclare, IL',
        date: '~1975–1976',
        significance: 'Firm offer of $500/acre purchase option + $6/acre/year lease. Allied Chemical = Fortune 500 company. Offer never accepted. Confirmed by Melvin C. Lockard letter to James Allee, April 26, 1989.',
        status: 'referenced'
      },
      {
        name: 'T.S. Dudley Land Company Oil & Gas Inquiry',
        ref: 'Carlos Padilla, Petroleum Landman',
        date: 'August 17, 2006',
        significance: 'On behalf of major independent natural gas producer. Independently confirms 40 Net Mineral Acres in Allee name as of 2006. Mineral rights never leased.',
        status: 'original'
      },
      {
        name: 'Carbondale Veneer Company Timber Inquiry',
        ref: 'Stan Curtis, Owner',
        date: 'January 5, 2002',
        significance: 'Notes "valuable hardwood timber" on property per aerial photos. Independent confirmation of surface value.',
        status: 'original'
      }
    ]
  },

  // --- Data Sources (Footer) ---
  sources: [
    'ISGS Circular 604 — Denny et al. 2020',
    'Terra Nova 2024 — Trela, Freiburg, Gazel et al.',
    'ISGS Mine Inventory Co. No. 069 Parker No. 6 (1988)',
    'USGS Earth MRI SE Illinois Survey v2.0 (Aug 2025)',
    'KGS RI 66 — Lukoczki et al. 2022',
    'KGS GM-1 2025 — Puckett, Morris, Lukoczki'
  ]
};
