/* ============================================================
   ALLEE CMIP — Cesium 3D Map Logic
   Full geophysical overlay support — radiometric, magnetic,
   geologic map, and mineral occurrence data from USGS
   ============================================================ */

// ---- Cesium Ion Access Token ----
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNjE3MmY0Ni1iZDRlLTQ1YTQtOGY0YS1hNTBlYmEyMjBlYjYiLCJpZCI6Mzc0MDY4LCJpYXQiOjE3NzQxMzAzOTF9.qoTK5i88Gr9c9hne0CQNIajb-3tbiLTE27jn_urP8iI';

// ---- Property Data ----
const PROPERTY_CENTER = Cesium.Cartesian3.fromDegrees(-88.38205, 37.44795);

const PROPERTY_BOUNDARY = [
  -88.3857, 37.4445,
  -88.3857, 37.4514,
  -88.3784, 37.4514,
  -88.3784, 37.4445,
  -88.3857, 37.4445
];

const MINES = [
  {
    name: 'DUBOIS MINE',
    lat: 37.4480, lon: -88.3814,
    color: Cesium.Color.fromCssColorString('#C9A84C'),
    description: `<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;max-width:320px;">
      <div style="color:#C9A84C;font-weight:bold;font-size:14px;margin-bottom:8px;">DUBOIS MINE</div>
      <div><strong>Operator:</strong> Crown Fluorspar Corporation</div>
      <div><strong>Period:</strong> Operating since 1904 (intermittent)</div>
      <div><strong>Production:</strong> 1,000–2,000 tons</div>
      <div><strong>Depth:</strong> 45–100 ft shaft workings</div>
      <div><strong>Vein:</strong> Illinois Furnace Fault Zone</div>
      <div><strong>ISGS Ref:</strong> Co. No. 069, Parker No. 6</div>
      <div><strong>Orientation:</strong> N60°–65°E, nearly vertical</div>
      <div style="color:#FF4444;margin-top:8px;font-weight:bold;">Never tested for REE.</div>
      <div style="color:#64748B;margin-top:6px;font-size:10px;">Source: ISGS Mine Inventory, July 7, 1988</div>
    </div>`
  },
  {
    name: 'INDIANA MINE',
    lat: 37.4495, lon: -88.3800,
    color: Cesium.Color.fromCssColorString('#C9A84C'),
    description: `<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;max-width:320px;">
      <div style="color:#C9A84C;font-weight:bold;font-size:14px;margin-bottom:8px;">INDIANA MINE</div>
      <div style="color:#94A3B8;font-size:11px;">(Hillside No. 2 / Rogerstown)</div>
      <div><strong>Operator:</strong> Indiana Fluorspar Land Co. / U.S. Fluorspar Co.</div>
      <div><strong>Period:</strong> 1923–1925</div>
      <div><strong>Production:</strong> <span style="color:#00FF88;">5,900 TONS</span> — largest on property</div>
      <div><strong>Veins:</strong> 2 parallel veins, 130 ft apart at surface</div>
      <div><strong>Strike:</strong> N16°E, dip sharply west</div>
      <div><strong>Workings:</strong> West vein: shaft + 2 drift levels + x-cut at 100 ft</div>
      <div style="color:#FF4444;margin-top:8px;font-weight:bold;">System UNTESTED below 100 feet.</div>
      <div style="color:#64748B;margin-top:6px;font-size:10px;">Source: ISGS Bulletin 58 pp.81-82; Circular 384 p.31</div>
    </div>`
  },
  {
    name: 'LAVENDER MINE',
    lat: 37.4470, lon: -88.3820,
    color: Cesium.Color.fromCssColorString('#C9A84C'),
    description: `<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;max-width:320px;">
      <div style="color:#C9A84C;font-weight:bold;font-size:14px;margin-bottom:8px;">LAVENDER MINE</div>
      <div><strong>Operator:</strong> C.H. Stone</div>
      <div><strong>Production:</strong> Minor</div>
      <div><strong>Depth:</strong> 40 ft shaft</div>
      <div><strong>Vein:</strong> N-S to 80°W, gravel spar (fluorite)</div>
      <div><strong>Area:</strong> NW, SE, SW quarters of Section 19</div>
      <div style="color:#64748B;margin-top:6px;font-size:10px;">Source: ISGS Bulletin 76, p.145</div>
    </div>`
  }
];

const HICKS_DOME = {
  name: 'HICKS DOME',
  lat: 37.51, lon: -88.43,
  description: `<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;max-width:360px;">
    <div style="color:#00FF88;font-weight:bold;font-size:14px;margin-bottom:8px;">HICKS DOME — World-Class REE Deposit</div>
    <div><strong>ISGS Estimate:</strong> <span style="color:#00FF88;">12–65 million raw tons</span> of critical minerals ore</div>
    <div><strong>HREE Grade:</strong> Order of magnitude higher than Mountain Pass, CA</div>
    <div><strong>Key Elements:</strong> Dysprosium, Terbium, Yttrium, Scandium</div>
    <div><strong>Drill Core:</strong> Y: up to 13,000 ppm; Sc: up to 600 ppm (Hamp Well)</div>
    <div style="margin-top:10px;padding:8px;background:rgba(0,255,136,0.08);border-left:3px solid #00FF88;font-size:11px;line-height:1.5;">
      2024 Terra Nova paper (Trela, Freiburg, Gazel et al.):<br>
      "HREE enrichment derived from brine-melts exsolved from deep carbonatite source, transported along brecciated fault pathways throughout the district."
    </div>
    <div style="color:#C9A84C;margin-top:8px;font-weight:bold;">Distance from Allee Property: 7.8 miles</div>
  </div>`
};

const SPARKS_HILL = {
  name: 'SPARKS HILL DIATREME',
  lat: 37.48, lon: -88.41,
  description: `<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;max-width:320px;">
    <div style="color:#00FF88;font-weight:bold;font-size:14px;margin-bottom:8px;">SPARKS HILL DIATREME</div>
    <div style="margin-bottom:4px;">Confirmed REE Surface Outcrop</div>
    <div style="font-family:'IBM Plex Mono',monospace;">
      La: <span style="color:#00FF88;">293 ppm</span> &nbsp;|&nbsp; Ce: <span style="color:#00FF88;">467 ppm</span><br>
      Pr: <span style="color:#00FF88;">45.5 ppm</span> &nbsp;|&nbsp; Nd: <span style="color:#00FF88;">143 ppm</span>
    </div>
    <div style="margin-top:10px;padding:8px;background:rgba(0,255,136,0.08);border-left:3px solid #00FF88;font-size:11px;line-height:1.5;">
      "Evidence for a buried carbonatite complex beneath the Illinois-Kentucky fluorspar district"
    </div>
    <div style="color:#64748B;margin-top:6px;font-size:10px;">Source: Denny, Maria et al. 2017 (ISGS Circular 588)</div>
    <div style="color:#C9A84C;margin-top:4px;font-weight:bold;">Distance from property: ~3.1 miles</div>
  </div>`
};

// ============================================================
// USGS GEOPHYSICAL OVERLAY DEFINITIONS
// All free, public domain, no API key required
// ============================================================

const GEOPHYSICAL_OVERLAYS = {
  // ── RADIOMETRIC (aerial gamma-ray) ──
  // Correct endpoint: /services/aerorad with named layers
  thorium: {
    name: 'Aeroradiometric Thorium (eTh)',
    description: 'USGS aerial gamma-ray survey — equivalent Thorium. High Th = DIRECT REE indicator in carbonatite/alkaline systems. Hot colors = high radioactivity = REE mineralization underground.',
    url: 'https://mrdata.usgs.gov/services/aerorad',
    wmsLayers: 'Thorium',
    alpha: 0.55,
    category: 'radiometric',
    legend: 'Hot colors (red/yellow) = HIGH thorium = REE correlation',
    source: 'USGS Aeroradiometric Compilation, Phillips et al.'
  },
  uranium: {
    name: 'Aeroradiometric Uranium (eU)',
    description: 'USGS aerial gamma-ray — equivalent Uranium. Elevated eU along fault zones = deep-sourced hydrothermal fluid flow — same process that transports REE.',
    url: 'https://mrdata.usgs.gov/services/aerorad',
    wmsLayers: 'Uranium',
    alpha: 0.55,
    category: 'radiometric',
    legend: 'Hot colors = HIGH uranium = hydrothermal activity indicator',
    source: 'USGS Aeroradiometric Compilation, Phillips et al.'
  },
  potassium: {
    name: 'Aeroradiometric Potassium (%K)',
    description: 'USGS aerial gamma-ray — Potassium %. High K = alkaline igneous intrusions associated with carbonatite REE systems.',
    url: 'https://mrdata.usgs.gov/services/aerorad',
    wmsLayers: 'Potassium',
    alpha: 0.55,
    category: 'radiometric',
    legend: 'Hot colors = HIGH potassium = alkaline intrusion indicator',
    source: 'USGS Aeroradiometric Compilation, Phillips et al.'
  },
  // Composite color map: U=red, K=green, Th=blue — shows all 3 channels
  radComposite: {
    name: 'Radiometric Composite (Th+U+K)',
    description: 'Color composite of all three radiometric channels. Red=Uranium, Green=Potassium, Blue=Thorium. White/bright = all three elevated = strongest anomaly.',
    url: 'https://mrdata.usgs.gov/services/aerorad',
    wmsLayers: 'CCM',
    alpha: 0.55,
    category: 'radiometric',
    legend: 'Red=U, Green=K, Blue=Th. White = all elevated = hot zone',
    source: 'USGS Aeroradiometric Compilation'
  },

  // ── GEOPHYSICAL ──
  magnetic: {
    name: 'Magnetic Anomaly (nT)',
    description: 'North American Magnetic Anomaly Map — reveals buried igneous bodies, fault structures, and the deep carbonatite source beneath Hicks Dome.',
    url: 'https://www.sciencebase.gov/arcgis/services/mrt/NAmag_webmerc/MapServer/WmsServer',
    wmsLayers: '2',
    alpha: 0.5,
    category: 'geophysical',
    legend: 'Red/magenta = magnetic HIGH = buried igneous body',
    source: 'USGS/GSC North American Magnetic Anomaly Map'
  },
  gravity: {
    name: 'Bouguer Gravity Anomaly (mGal)',
    description: 'Bouguer gravity anomaly — gravity lows indicate low-density carbonatite intrusions. Hicks Dome produces a distinctive gravity signature.',
    url: 'https://mrdata.usgs.gov/services/gravity',
    wmsLayers: 'bouguer',
    alpha: 0.5,
    category: 'geophysical',
    legend: 'Blue/cool = gravity LOW = possible low-density intrusion',
    source: 'USGS Gravity Database of the United States'
  },

  // ── GEOLOGY ──
  geology: {
    name: 'Geologic Map (SGMC)',
    description: 'USGS State Geologic Map Compilation — mapped geological units, faults, and contacts.',
    url: 'https://mrdata.usgs.gov/services/sgmc2',
    wmsLayers: 'sgmc2contact,sgmc2structure',
    alpha: 0.6,
    category: 'geology',
    legend: 'Lines = mapped faults & contacts, colored = rock units',
    source: 'USGS State Geologic Map Compilation (SGMC v2)'
  },

  // ── MINERAL OCCURRENCES — the killer layers ──
  fluorspar: {
    name: 'Fluorspar Deposits (MRDS)',
    description: 'USGS Mineral Resources Data System — every documented fluorspar occurrence. Shows the full extent of the IL-KY Fluorspar District and where our mines sit within it.',
    url: 'https://mrdata.usgs.gov/services/mrds',
    wmsLayers: 'mrds-F',
    alpha: 0.9,
    category: 'minerals',
    legend: 'Dots = documented fluorspar deposits/mines',
    source: 'USGS MRDS — Mineral Resources Data System'
  },
  reeCerium: {
    name: 'REE Cerium Group Deposits',
    description: 'USGS MRDS — documented Light Rare Earth Element (Cerium group: La, Ce, Pr, Nd) occurrences. Shows confirmed LREE across the district.',
    url: 'https://mrdata.usgs.gov/services/mrds',
    wmsLayers: 'mrds-REE_CE',
    alpha: 0.9,
    category: 'minerals',
    legend: 'Dots = documented LREE (Ce group) occurrences',
    source: 'USGS MRDS'
  },
  reeYttrium: {
    name: 'REE Yttrium Group Deposits',
    description: 'USGS MRDS — documented Heavy Rare Earth Element (Yttrium group: Y, Dy, Tb, Er) occurrences. These are the HIGH-VALUE HREEs — Hicks Dome is one of very few U.S. sources.',
    url: 'https://mrdata.usgs.gov/services/mrds',
    wmsLayers: 'mrds-REE_Y',
    alpha: 0.9,
    category: 'minerals',
    legend: 'Dots = documented HREE (Y group) occurrences — highest value',
    source: 'USGS MRDS'
  },
  carbonatites: {
    name: 'Known Carbonatites',
    description: 'USGS carbonatite database — mapped carbonatite intrusions worldwide. Shows Hicks Dome in context of global carbonatite-hosted REE deposits.',
    url: 'https://mrdata.usgs.gov/services/carbonatite',
    wmsLayers: 'carbonatite',
    alpha: 0.9,
    category: 'minerals',
    legend: 'Dots = mapped carbonatite intrusions (host REE globally)',
    source: 'USGS Global Carbonatite Database'
  },
  reeDeposits: {
    name: 'REE Mines & Deposits',
    description: 'USGS dedicated REE deposit database — all known rare earth element mines and deposits. Shows where U.S. REE resources are confirmed.',
    url: 'https://mrdata.usgs.gov/services/ree',
    wmsLayers: 'ree',
    alpha: 0.9,
    category: 'minerals',
    legend: 'Dots = confirmed REE deposits and mines',
    source: 'USGS REE Database'
  },
  mvtDeposits: {
    name: 'MVT Lead-Zinc-Fluorite Deposits',
    description: 'Mississippi Valley-Type deposits — the deposit classification for the IL-KY Fluorspar District. Shows the full extent of MVT mineralization in the region.',
    url: 'https://mrdata.usgs.gov/services/sedexmvt',
    wmsLayers: 'sedexmvt',
    alpha: 0.9,
    category: 'minerals',
    legend: 'Dots = MVT deposits (same system as fluorspar district)',
    source: 'USGS SedEx-MVT Database'
  }
};

// ---- Layer Visibility State ----
const layers = {
  property: true,
  mines: true,
  hicksDome: true,
  sparksHill: true,
  faultLine: true,
  // Geophysical overlays (off by default — user toggles on)
  thorium: false,
  uranium: false,
  potassium: false,
  radComposite: false,
  magnetic: false,
  gravity: false,
  geology: false,
  // Mineral occurrence layers
  fluorspar: false,
  reeCerium: false,
  reeYttrium: false,
  carbonatites: false,
  reeDeposits: false,
  mvtDeposits: false
};

let viewer;
let propertyEntity, mineEntities = [], hicksDomeEntity, sparksHillEntity, faultEntity, hicksDomeRing;

// Store imagery layer references for toggle
const imageryLayerRefs = {};

// ---- Initialize Map ----
async function initMap() {
  try {
    viewer = new Cesium.Viewer('cesiumContainer', {
      terrain: Cesium.Terrain.fromWorldTerrain(),
      baseLayerPicker: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      geocoder: false,
      homeButton: false,
      timeline: false,
      animation: false,
      fullscreenButton: true,
      selectionIndicator: true,
      infoBox: true,
    });

    viewer.scene.globe.enableLighting = false;

    // Remove the placeholder
    const placeholder = document.getElementById('mapPlaceholder');
    if (placeholder) placeholder.style.display = 'none';

    // Pre-create all geophysical imagery layers (hidden)
    initGeophysicalLayers();

    // Start the fly-in sequence
    await flyInSequence();
  } catch (e) {
    console.error('Cesium initialization failed:', e);
    const placeholder = document.getElementById('mapPlaceholder');
    if (placeholder) {
      placeholder.style.display = 'flex';
      placeholder.querySelector('p').textContent =
        'Could not initialize Cesium. Please check your access token in js/map.js.';
    }
  }
}

// ---- Initialize USGS Geophysical Overlay Layers ----
function initGeophysicalLayers() {
  for (const [key, overlay] of Object.entries(GEOPHYSICAL_OVERLAYS)) {
    try {
      const provider = new Cesium.WebMapServiceImageryProvider({
        url: overlay.url,
        layers: overlay.wmsLayers,
        parameters: {
          transparent: true,
          format: 'image/png',
          version: '1.3.0'
        },
        credit: overlay.source
      });

      const layer = viewer.imageryLayers.addImageryProvider(provider);
      layer.alpha = overlay.alpha;
      layer.show = false; // All geophysical layers start hidden
      imageryLayerRefs[key] = layer;
    } catch (e) {
      console.warn(`Failed to initialize ${key} layer:`, e);
    }
  }
}

// ---- Fly-In Animation Sequence ----
async function flyInSequence() {
  // 1. Start high over US
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-89.0, 38.0, 1000000)
  });

  // 2. Fly to Hardin County
  await flyTo(-88.4, 37.5, 80000, 4);

  // 3. Final approach to property
  await flyTo(-88.38205, 37.44795, 5000, 3);

  // 4. Add property boundary
  addPropertyBoundary();

  // 5. Add mine markers (staggered)
  for (let i = 0; i < MINES.length; i++) {
    await delay(500);
    addMineMarker(MINES[i], i);
  }

  // 6. Add Hicks Dome
  await delay(400);
  addHicksDome();

  // 7. Add Sparks Hill
  await delay(300);
  addSparksHill();

  // 8. Draw fault line
  await delay(300);
  addFaultLine();
}

function flyTo(lon, lat, height, duration) {
  return new Promise(resolve => {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      duration: duration,
      complete: resolve
    });
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- Add Entities ----
function addPropertyBoundary() {
  propertyEntity = viewer.entities.add({
    name: 'ALLEE MINERAL RIGHTS — 40 ACRES',
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray(PROPERTY_BOUNDARY),
      material: Cesium.Color.fromCssColorString('#C9A84C').withAlpha(0.4),
      outline: true,
      outlineColor: Cesium.Color.fromCssColorString('#C9A84C'),
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    label: {
      text: 'ALLEE MINERAL RIGHTS — 40 ACRES',
      font: '14px "Rajdhani", sans-serif',
      fillColor: Cesium.Color.fromCssColorString('#C9A84C'),
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    position: Cesium.Cartesian3.fromDegrees(-88.38205, 37.44795, 100)
  });
}

function addMineMarker(mine, index) {
  const entity = viewer.entities.add({
    name: mine.name,
    position: Cesium.Cartesian3.fromDegrees(mine.lon, mine.lat),
    point: {
      pixelSize: 12,
      color: mine.color,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    label: {
      text: mine.name,
      font: '12px "IBM Plex Mono", monospace',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, -20),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    description: mine.description
  });
  mineEntities.push(entity);
}

function addHicksDome() {
  hicksDomeEntity = viewer.entities.add({
    name: 'HICKS DOME REE DEPOSIT',
    position: Cesium.Cartesian3.fromDegrees(HICKS_DOME.lon, HICKS_DOME.lat),
    point: {
      pixelSize: 16,
      color: Cesium.Color.fromCssColorString('#00FF88'),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    label: {
      text: 'HICKS DOME REE DEPOSIT — 7.8 MI — 12-65M TONS',
      font: '13px "IBM Plex Mono", monospace',
      fillColor: Cesium.Color.fromCssColorString('#00FF88'),
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, -24),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    description: HICKS_DOME.description
  });

  hicksDomeRing = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(HICKS_DOME.lon, HICKS_DOME.lat),
    ellipse: {
      semiMajorAxis: 3000,
      semiMinorAxis: 3000,
      material: Cesium.Color.fromCssColorString('#00FF88').withAlpha(0.1),
      outline: true,
      outlineColor: Cesium.Color.fromCssColorString('#00FF88').withAlpha(0.5),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    }
  });
}

function addSparksHill() {
  sparksHillEntity = viewer.entities.add({
    name: 'SPARKS HILL DIATREME',
    position: Cesium.Cartesian3.fromDegrees(SPARKS_HILL.lon, SPARKS_HILL.lat),
    point: {
      pixelSize: 10,
      color: Cesium.Color.fromCssColorString('#00FF88'),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    label: {
      text: 'SPARKS HILL — 3.1 MI',
      font: '11px "IBM Plex Mono", monospace',
      fillColor: Cesium.Color.fromCssColorString('#00FF88'),
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(0, -18),
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    description: SPARKS_HILL.description
  });
}

function addFaultLine() {
  faultEntity = viewer.entities.add({
    name: 'ILLINOIS FURNACE FAULT ZONE',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        -88.42, 37.42,
        -88.40, 37.43,
        -88.39, 37.44,
        -88.3814, 37.4480,
        -88.37, 37.46,
        -88.35, 37.47
      ]),
      width: 3,
      material: new Cesium.PolylineDashMaterialProperty({
        color: Cesium.Color.fromCssColorString('#FF4444').withAlpha(0.7),
        dashLength: 16
      }),
      clampToGround: true
    },
    label: {
      text: 'ILLINOIS FURNACE FAULT ZONE — 850 ft displacement',
      font: '11px "IBM Plex Mono", monospace',
      fillColor: Cesium.Color.fromCssColorString('#FF4444'),
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    },
    position: Cesium.Cartesian3.fromDegrees(-88.385, 37.45, 200),
    description: `<div style="font-family:'IBM Plex Mono',monospace;font-size:12px;line-height:1.6;max-width:320px;">
      <div style="color:#FF4444;font-weight:bold;font-size:14px;margin-bottom:8px;">ILLINOIS FURNACE FAULT ZONE</div>
      <div><strong>Displacement:</strong> 850 ft vertical</div>
      <div><strong>Strike:</strong> N60°–65°E</div>
      <div style="margin-top:10px;padding:8px;background:rgba(255,68,68,0.08);border-left:3px solid #FF4444;font-size:11px;line-height:1.5;">
        Same brecciated pathway system described as REE transport conduit in Trela, Freiburg et al. 2024 (Terra Nova). The Allee property sits directly on this structure.
      </div>
    </div>`
  });
}

// ---- Layer Toggles ----
function toggleLayer(layerName) {
  layers[layerName] = !layers[layerName];
  const show = layers[layerName];

  // Entity-based layers
  switch (layerName) {
    case 'property':
      if (propertyEntity) propertyEntity.show = show;
      break;
    case 'mines':
      mineEntities.forEach(e => e.show = show);
      break;
    case 'hicksDome':
      if (hicksDomeEntity) hicksDomeEntity.show = show;
      if (hicksDomeRing) hicksDomeRing.show = show;
      break;
    case 'sparksHill':
      if (sparksHillEntity) sparksHillEntity.show = show;
      break;
    case 'faultLine':
      if (faultEntity) faultEntity.show = show;
      break;
  }

  // Imagery-based layers (geophysical overlays)
  if (imageryLayerRefs[layerName]) {
    imageryLayerRefs[layerName].show = show;
  }

  updateLayerCount();
  updateLegend();
}

// ---- Opacity Slider for Geophysical Layers ----
function setOverlayOpacity(layerName, value) {
  const alpha = parseFloat(value);
  if (imageryLayerRefs[layerName]) {
    imageryLayerRefs[layerName].alpha = alpha;
  }
  // Update the displayed value
  const valEl = document.getElementById(`opacity-val-${layerName}`);
  if (valEl) valEl.textContent = Math.round(alpha * 100) + '%';
}

function updateLayerCount() {
  const count = Object.values(layers).filter(Boolean).length;
  const el = document.getElementById('layerCount');
  if (el) el.textContent = count + ' ACTIVE';
}

// ---- Dynamic Legend ----
function updateLegend() {
  const legendEl = document.getElementById('activeLegend');
  if (!legendEl) return;

  const activeOverlays = Object.entries(GEOPHYSICAL_OVERLAYS)
    .filter(([key]) => layers[key]);

  if (activeOverlays.length === 0) {
    legendEl.style.display = 'none';
    return;
  }

  legendEl.style.display = 'block';
  legendEl.innerHTML = activeOverlays.map(([key, overlay]) => `
    <div style="margin-bottom:8px;">
      <div style="font-size:0.7rem;color:#C9A84C;font-weight:600;margin-bottom:2px;">${overlay.name}</div>
      <div style="font-size:0.65rem;color:#94A3B8;line-height:1.4;">${overlay.legend}</div>
      <div style="font-size:0.6rem;color:#64748B;margin-top:2px;">Source: ${overlay.source}</div>
    </div>
  `).join('');
}

// ---- Mouse Position Tracking ----
function setupMouseTracking() {
  if (!viewer) return;

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function(movement) {
    const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
    if (cartesian) {
      const carto = Cesium.Cartographic.fromCartesian(cartesian);
      const lat = Cesium.Math.toDegrees(carto.latitude).toFixed(5);
      const lon = Cesium.Math.toDegrees(carto.longitude).toFixed(5);
      const elev = Math.round(carto.height * 3.28084);

      const latEl = document.getElementById('statusLat');
      const lonEl = document.getElementById('statusLon');
      const elevEl = document.getElementById('statusElev');
      if (latEl) latEl.textContent = lat;
      if (lonEl) lonEl.textContent = lon;
      if (elevEl) elevEl.textContent = elev + ' ft';
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

// ---- Sidebar Toggle ----
function toggleSidebar() {
  const sidebar = document.getElementById('mapSidebar');
  sidebar.classList.toggle('collapsed');
}

// ---- Quick View: Fly to and enable thorium overlay ----
function quickViewThorium() {
  // Enable thorium layer
  if (!layers.thorium) {
    layers.thorium = true;
    imageryLayerRefs.thorium.show = true;
    const cb = document.getElementById('cb-thorium');
    if (cb) cb.checked = true;
    updateLayerCount();
    updateLegend();
  }
  // Zoom out to see the regional pattern
  flyTo(-88.40, 37.48, 30000, 2);
}

function quickViewMagnetic() {
  if (!layers.magnetic) {
    layers.magnetic = true;
    if (imageryLayerRefs.magnetic) imageryLayerRefs.magnetic.show = true;
    const cb = document.getElementById('cb-magnetic');
    if (cb) cb.checked = true;
    updateLayerCount();
    updateLegend();
  }
  flyTo(-88.40, 37.48, 40000, 2);
}

// Show all fluorspar + REE deposits across the district
function quickViewFluorspar() {
  ['fluorspar', 'reeCerium', 'reeYttrium', 'reeDeposits'].forEach(key => {
    if (!layers[key]) {
      layers[key] = true;
      if (imageryLayerRefs[key]) imageryLayerRefs[key].show = true;
      const cb = document.getElementById('cb-' + key);
      if (cb) cb.checked = true;
    }
  });
  updateLayerCount();
  updateLegend();
  flyTo(-88.40, 37.48, 60000, 2);
}

// Full intelligence view — thorium + REE + fluorspar + fault
function quickViewFullIntel() {
  ['thorium', 'fluorspar', 'reeYttrium', 'reeDeposits'].forEach(key => {
    if (!layers[key]) {
      layers[key] = true;
      if (imageryLayerRefs[key]) imageryLayerRefs[key].show = true;
      const cb = document.getElementById('cb-' + key);
      if (cb) cb.checked = true;
    }
  });
  // Make sure property features are on
  ['property', 'mines', 'hicksDome', 'sparksHill', 'faultLine'].forEach(key => {
    if (!layers[key]) {
      layers[key] = true;
      const cb = document.querySelector(`input[onchange="toggleLayer('${key}')"]`);
      if (cb) cb.checked = true;
    }
  });
  if (propertyEntity) propertyEntity.show = true;
  mineEntities.forEach(e => e.show = true);
  if (hicksDomeEntity) hicksDomeEntity.show = true;
  if (hicksDomeRing) hicksDomeRing.show = true;
  if (sparksHillEntity) sparksHillEntity.show = true;
  if (faultEntity) faultEntity.show = true;
  updateLayerCount();
  updateLegend();
  // Zoom out to see the full picture — property in context of the district
  flyTo(-88.40, 37.47, 35000, 2);
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Cesium === 'undefined' || Cesium.Ion.defaultAccessToken === 'PASTE_YOUR_CESIUM_ION_TOKEN_HERE') {
    const placeholder = document.getElementById('mapPlaceholder');
    if (placeholder) placeholder.style.display = 'flex';
    return;
  }

  initMap().then(() => {
    setupMouseTracking();
    updateLayerCount();
    updateLegend();
  });
});
