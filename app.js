/**
 * Follow-the-Sun 24/7 Shift Coverage Calculator
 * app.js — Algorithm, rendering, event handling
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const SHIFT_COLORS = [
  { main: '#F59E0B', light: '#FEF3C7', name: 'Amber Sun' },
  { main: '#14B8A6', light: '#CCFBF1', name: 'Teal Dawn' },
  { main: '#A78BFA', light: '#EDE9FE', name: 'Violet Dusk' },
  { main: '#FB7185', light: '#FFE4E6', name: 'Rose Glow' },
  { main: '#38BDF8', light: '#E0F2FE', name: 'Sky Blue' },
  { main: '#10B981', light: '#D1FAE5', name: 'Emerald' },
  { main: '#6366F1', light: '#E0E7FF', name: 'Indigo' },
];

const SHIFT_DURATION = 8; // hours
const WORKDAY_START_LOCAL = 9; // 9 AM local time

// Population data (approx. 2024, millions) — used only for display sort order
const COUNTRY_POP = {
  CN: 1425, IN: 1428, US: 340, ID: 277, PK: 230, BR: 216, NG: 223, BD: 173,
  RU: 144, MX: 128, JP: 124, ET: 126, PH: 117, EG: 112, CD: 102, VN: 99,
  TR: 86, IR: 89, DE: 84, TH: 72, GB: 68, FR: 68, TZ: 65, ZA: 60, IT: 59,
  MM: 55, KE: 54, KR: 52, CO: 52, ES: 48, UG: 48, AR: 46, DZ: 45, SD: 47,
  UA: 37, IQ: 44, AF: 42, PL: 38, CA: 39, MA: 37, SA: 36, UZ: 35, PE: 34,
  AO: 36, MY: 34, MZ: 33, GH: 34, YE: 34, NP: 30, VE: 28, MG: 29, CM: 28,
  AU: 26, NE: 27, TW: 24, ML: 23, BF: 23, LK: 22, MW: 20, CL: 20, ZM: 20,
  RO: 19, KZ: 19, SY: 22, EC: 18, NL: 18, SN: 17, GT: 18, TD: 18, SO: 18,
  ZW: 16, KH: 17, GN: 14, RW: 14, BJ: 13, BI: 13, TN: 12, BO: 12, BE: 12,
  HT: 12, CU: 11, SS: 11, DO: 11, CZ: 11, GR: 10, JO: 11, PT: 10, AZ: 10,
  SE: 10, HN: 10, HU: 10, AE: 10, BY: 9, TJ: 10, AT: 9, PG: 10, RS: 7,
  IL: 10, CH: 9, TG: 9, SL: 8, LA: 8, PY: 7, LY: 7, BG: 7, NI: 7,
  SV: 6, KG: 7, LB: 5, TM: 6, SG: 6, DK: 6, FI: 6, NO: 5, SK: 5,
  NZ: 5, IE: 5, CR: 5, CF: 5, LR: 5, PS: 5, BA: 3, GE: 4, HR: 4,
  UY: 3, MN: 3, PR: 3, AM: 3, JM: 3, QA: 3, AL: 3, LT: 3, NA: 3,
  GM: 3, BW: 2, GA: 2, LS: 2, MK: 2, SI: 2, LV: 2, KW: 4, BH: 2,
  TT: 1, EE: 1, MU: 1, CY: 1, SZ: 1, DJ: 1, FJ: 1, RE: 1, GY: 1,
  BT: 1, MV: 1, SR: 1, LU: 1, ME: 1, IS: 0, BB: 0, BN: 0, BS: 0,
  MT: 1, BZ: 0, MQ: 0, GP: 0, NC: 0, PF: 0, GF: 0,
};

const CITY_POP = {
  Tokyo: 37, Delhi: 32, Shanghai: 29, Beijing: 21, Mumbai: 21, Cairo: 22,
  'Sao Paulo': 22, Dhaka: 23, 'Mexico City': 22, Osaka: 19, Kolkata: 15,
  Lagos: 15, Istanbul: 16, 'Buenos Aires': 15, Karachi: 16, Chongqing: 16,
  Manila: 14, Guangzhou: 13, Tianjin: 14, Lahore: 13, Bangalore: 13,
  'Rio de Janeiro': 13, Shenzhen: 13, Moscow: 13, Chennai: 11, Bogota: 11,
  Jakarta: 11, Lima: 10, Bangkok: 11, Seoul: 10, Hyderabad: 10, London: 9,
  Tehran: 9, Chicago: 9, Chengdu: 9, 'Ho Chi Minh': 9, Baghdad: 8,
  Riyadh: 8, Singapore: 6, Santiago: 7, 'Hong Kong': 7, Hanoi: 8,
  Toronto: 6, Yangon: 5, 'Los Angeles': 13, 'Kuala Lumpur': 8, Taipei: 7,
  'New York': 20, Nairobi: 5, Casablanca: 4, Johannesburg: 6, Berlin: 4,
  Madrid: 7, Rome: 4, Paris: 11, Sydney: 5, Melbourne: 5, Auckland: 2,
  Dubai: 4, Doha: 2, Muscat: 1, Amman: 4, Beirut: 3, Kuwait: 3,
  Kathmandu: 1, Colombo: 1, Tashkent: 3, Almaty: 2, Novosibirsk: 2,
  Vladivostok: 1, Yakutsk: 0, Magadan: 0, Kamchatka: 0, Tbilisi: 1,
  Baku: 2, Yerevan: 1, Kabul: 4, 'Addis Ababa': 5,
  'Dar es Salaam': 7, Kinshasa: 17, Accra: 4, Abidjan: 5, Dakar: 4,
  Kampala: 4, Harare: 2, Lusaka: 3, Maputo: 2, Luanda: 9,
  Khartoum: 6, Algiers: 4, Tunis: 2, Tripoli: 1,
  Denver: 3, Phoenix: 5, Anchorage: 0, Honolulu: 1, Winnipeg: 1,
  Vancouver: 3, Edmonton: 2, Halifax: 0, Regina: 0, 'St Johns': 0,
  Havana: 2, Kingston: 1, 'Port of Spain': 0, Barbados: 0,
  'Puerto Rico': 2, Guayaquil: 3, Asuncion: 3, Montevideo: 2, Caracas: 3,
  'La Paz': 2, Recife: 4, Manaus: 2, Belem: 2, Godthab: 0, Reykjavik: 0,
  Dublin: 2, Lisbon: 3, Stockholm: 2, Helsinki: 1, Oslo: 1, Copenhagen: 2,
  Amsterdam: 1, Brussels: 2, Zurich: 1, Vienna: 2, Prague: 1, Warsaw: 2,
  Budapest: 2, Bucharest: 2, Sofia: 1, Belgrade: 2, Zagreb: 1, Sarajevo: 0,
  Bratislava: 1, Ljubljana: 0, Tallinn: 0, Riga: 1, Vilnius: 1, Minsk: 2,
  Kyiv: 3, Athens: 4, Nicosia: 0, Valletta: 0, Perth: 2, Brisbane: 3,
  Adelaide: 1, Darwin: 0, Hobart: 0, Fiji: 0, Chatham: 0,
};

// Tech hub countries — ISO codes of countries with strong software developer ecosystems
const TECH_HUB_COUNTRIES = new Set([
  'US', 'IN', 'CN', 'DE', 'GB', 'BR', 'CA', 'FR', 'RU', 'KR',
  'JP', 'AU', 'NL', 'PL', 'UA', 'IL', 'SE', 'ES', 'IT', 'AR',
  'TW', 'RO', 'CZ', 'PT', 'CH', 'AT', 'DK', 'FI', 'NO', 'IE',
  'SG', 'NZ', 'BE', 'HU', 'BG', 'RS', 'HR', 'SK', 'EE', 'LT',
  'LV', 'VN', 'PH', 'MX', 'CO', 'CL', 'TR', 'TH', 'MY', 'ID',
  'GE', 'AM', 'BY', 'NG', 'KE', 'EG', 'ZA', 'PK', 'BD', 'GR',
]);

// City tech hub scores (0-100) — higher = stronger tech hub for hiring developers
const CITY_TECH = {
  // Tier 1: Global tech capitals
  'San Francisco': 100, 'New York': 95, 'London': 95, 'Bangalore': 95,
  'Seattle': 92, Berlin: 92, 'Tel Aviv': 90, Singapore: 90, Tokyo: 88,
  Toronto: 88, Amsterdam: 87, Sydney: 85, Seoul: 85, Shanghai: 85,
  Beijing: 84, Paris: 83, 'Los Angeles': 82, Boston: 80, Chicago: 78,
  // Tier 2: Major tech hubs
  Dublin: 78, Stockholm: 78, 'Ho Chi Minh': 77, Melbourne: 76,
  Vancouver: 76, Munich: 75, Copenhagen: 75, Helsinki: 74, Austin: 74,
  Denver: 73, Taipei: 73, Warsaw: 73, Zurich: 72, Vienna: 71,
  Barcelona: 70, Hyderabad: 70, 'Kuala Lumpur': 70, Bangkok: 68,
  Lisbon: 68, Prague: 68, Budapest: 67, Bucharest: 67, Oslo: 66,
  Dubai: 65, 'Buenos Aires': 65, Bogota: 64, Lagos: 64, Nairobi: 63,
  // Tier 3: Growing tech scenes
  Manila: 62, Jakarta: 62, Cairo: 60, Kyiv: 72, Krakow: 70,
  Wroclaw: 68, Gdansk: 66, Cluj: 65, Iasi: 62, Brno: 64,
  Sofia: 64, Belgrade: 63, Tallinn: 70, Riga: 58, Vilnius: 60,
  Tbilisi: 58, Yerevan: 56, Minsk: 60, Chennai: 68, Pune: 67,
  Delhi: 62, Mumbai: 65, Kolkata: 55, Ahmedabad: 52,
  'Sao Paulo': 65, 'Mexico City': 60, Santiago: 60, Lima: 55,
  'Rio de Janeiro': 55, Recife: 50, Hanoi: 65, Dhaka: 50,
  Karachi: 48, Lahore: 52, Islamabad: 55,
  Moscow: 70, Novosibirsk: 55, Kaliningrad: 50, Vladivostok: 45,
  Chengdu: 60, Shenzhen: 75, Guangzhou: 60, Hangzhou: 72,
  Nanjing: 58, Xian: 52, Chongqing: 50,
  Istanbul: 62, Ankara: 55, Izmir: 50,
  Athens: 55, Zagreb: 55, Sarajevo: 45, Bratislava: 58, Ljubljana: 55,
  Perth: 55, Brisbane: 58, Auckland: 60, Wellington: 55,
  Johannesburg: 58, 'Cape Town': 60, Accra: 50, Kampala: 45,
  'Dar es Salaam': 42, 'Addis Ababa': 40,
  Casablanca: 48, Tunis: 45, Algiers: 40,
  Riyadh: 50, Amman: 50, Beirut: 48,
  Colombo: 48, Kathmandu: 40, Tashkent: 38,
  Montevideo: 52, Asuncion: 42, Guayaquil: 42, Caracas: 40,
  Havana: 30, Kingston: 35, 'Port of Spain': 30,
  Honolulu: 40, Anchorage: 25,
};

// ─── State ─────────────────────────────────────────────────────────────────────

const state = {
  baseTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  numShifts: 3,
  toleranceMinutes: 60,
};

// ─── Security: HTML escaping ──────────────────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── Utility Functions ────────────────────────────────────────────────────────

function mod(n, m) {
  return ((n % m) + m) % m;
}

/**
 * Get DST-aware current UTC offset in minutes for a timezone.
 * Returns minutes offset (e.g. UTC-5 = -300, UTC+5:30 = 330).
 */
function getCurrentOffsetMinutes(timeZone) {
  try {
    const now = new Date();
    const utcParts = getDateParts(now, 'UTC');
    const tzParts = getDateParts(now, timeZone);

    const utcMinutes = utcParts.hours * 60 + utcParts.minutes;
    const tzMinutes = tzParts.hours * 60 + tzParts.minutes;

    let diff = tzMinutes - utcMinutes;

    // Handle day boundary crossings
    const utcDay = utcParts.day;
    const tzDay = tzParts.day;
    if (tzDay !== utcDay) {
      if (tzDay > utcDay || (utcDay > 27 && tzDay === 1)) {
        diff += 24 * 60;
      } else {
        diff -= 24 * 60;
      }
    }

    return diff;
  } catch (e) {
    return 0;
  }
}

function getDateParts(date, timeZone) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const get = (type) => parseInt(parts.find(p => p.type === type)?.value || '0', 10);
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hours: get('hour') % 24,
    minutes: get('minute'),
  };
}

function formatHour(hour) {
  const h = mod(Math.round(hour), 24);
  const suffix = h < 12 ? 'AM' : 'PM';
  const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${display}${suffix}`;
}

function formatOffset(minutes) {
  const sign = minutes >= 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = Math.round(abs % 60);
  return m === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(m).padStart(2, '0')}`;
}

function formatDuration(minutes) {
  const total = Math.round(minutes);
  if (total === 0) return '0m';
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatHourUTC(hour) {
  const h = mod(Math.round(hour), 24);
  return `${String(h).padStart(2, '0')}:00`;
}

function getCityFromTzName(tzName) {
  return tzName.split('/').pop().replace(/_/g, ' ');
}

// ─── Timezone Data Layer ──────────────────────────────────────────────────────

let tzCache = null;

function buildTzData() {
  if (tzCache) return tzCache;

  const allTz = ct.getAllTimezones();
  const result = [];

  for (const [tzId, tzInfo] of Object.entries(allTz)) {
    if (tzInfo.aliasOf) continue;
    if (tzId.startsWith('Etc/')) continue;

    const offsetMinutes = getCurrentOffsetMinutes(tzId);
    const city = getCityFromTzName(tzId);

    let countries = [];
    try {
      const ctryData = ct.getCountriesForTimezone(tzId);
      if (ctryData && ctryData.length > 0) {
        countries = ctryData.map(c => ({ id: c.id, name: c.name }));
      }
    } catch (e) {
      // ignore
    }

    const prefix = tzId.split('/')[0];
    let region = 'Other';
    if (['America'].includes(prefix)) region = 'Americas';
    else if (['Europe', 'Africa', 'Atlantic'].includes(prefix)) region = 'Europe / Africa';
    else if (['Asia', 'Indian'].includes(prefix)) region = 'Asia';
    else if (['Australia', 'Pacific'].includes(prefix)) region = 'Oceania';
    else if (prefix === 'UTC') region = 'UTC / Other';

    result.push({ id: tzId, offsetMinutes, city, countries, region });
  }

  result.sort((a, b) => {
    if (a.offsetMinutes !== b.offsetMinutes) return a.offsetMinutes - b.offsetMinutes;
    return a.id.localeCompare(b.id);
  });

  tzCache = result;
  return result;
}

// ─── Dropdown Population ──────────────────────────────────────────────────────

function populateDropdown() {
  const select = document.getElementById('tz-select');
  const tzData = buildTzData();

  const regions = {};
  for (const tz of tzData) {
    if (!regions[tz.region]) regions[tz.region] = [];
    regions[tz.region].push(tz);
  }

  const regionOrder = ['Americas', 'Europe / Africa', 'Asia', 'Oceania', 'UTC / Other', 'Other'];

  for (const regionName of regionOrder) {
    const tzs = regions[regionName];
    if (!tzs || tzs.length === 0) continue;

    const optgroup = document.createElement('optgroup');
    optgroup.label = regionName;

    for (const tz of tzs) {
      const opt = document.createElement('option');
      opt.value = tz.id;

      const offsetStr = formatOffset(tz.offsetMinutes);
      let label = `${offsetStr} — ${tz.city}`;
      if (tz.countries.length > 0) {
        const countryStr = tz.countries.slice(0, 2).map(c => c.name).join(', ');
        label = `${offsetStr} — ${tz.city} (${countryStr})`;
      }
      opt.textContent = label; // safe: textContent, not innerHTML

      if (tz.id === state.baseTimezone) {
        opt.selected = true;
      }

      optgroup.appendChild(opt);
    }

    select.appendChild(optgroup);
  }

  if (!select.value) {
    const firstOption = select.querySelector('option');
    if (firstOption) firstOption.selected = true;
  }
}

// ─── Core Algorithm ───────────────────────────────────────────────────────────

function calculateShifts() {
  const tzData = buildTzData();
  const baseTz = tzData.find(t => t.id === state.baseTimezone);
  const baseOffsetMinutes = baseTz ? baseTz.offsetMinutes : 0;
  const baseOffsetHours = baseOffsetMinutes / 60;

  const N = state.numShifts;
  const spacing = 24 / N;

  const baseShiftStartUTC = mod(WORKDAY_START_LOCAL - baseOffsetHours, 24);

  const shifts = [];
  for (let i = 0; i < N; i++) {
    const startUTC = mod(baseShiftStartUTC + i * spacing, 24);
    const endUTC = mod(startUTC + SHIFT_DURATION, 24);

    const idealOffsetHours = WORKDAY_START_LOCAL - startUTC;
    let normalizedIdealOffset = idealOffsetHours;
    while (normalizedIdealOffset > 14) normalizedIdealOffset -= 24;
    while (normalizedIdealOffset < -12) normalizedIdealOffset += 24;

    const idealOffsetMinutes = Math.round(normalizedIdealOffset * 60);
    const matches = findMatchingTimezones(tzData, idealOffsetMinutes);

    shifts.push({ index: i, startUTC, endUTC, idealOffsetMinutes, color: SHIFT_COLORS[i], matches });
  }

  return { shifts, spacing };
}

function findMatchingTimezones(tzData, idealOffsetMinutes) {
  const tolerance = state.toleranceMinutes;

  const matches = tzData.filter(tz => {
    const diff = Math.abs(tz.offsetMinutes - idealOffsetMinutes);
    const diffWrapped = Math.abs(diff - 24 * 60);
    return Math.min(diff, diffWrapped) <= tolerance;
  });

  matches.sort((a, b) => {
    const devA = Math.min(
      Math.abs(a.offsetMinutes - idealOffsetMinutes),
      Math.abs(Math.abs(a.offsetMinutes - idealOffsetMinutes) - 24 * 60)
    );
    const devB = Math.min(
      Math.abs(b.offsetMinutes - idealOffsetMinutes),
      Math.abs(Math.abs(b.offsetMinutes - idealOffsetMinutes) - 24 * 60)
    );
    if (devA !== devB) return devA - devB;
    return a.city.localeCompare(b.city);
  });

  return matches;
}

function computeOverlapZones(shifts) {
  const zones = [];
  const N = shifts.length;
  for (let i = 0; i < N; i++) {
    const a = shifts[i];
    const b = shifts[(i + 1) % N];
    const aIntervals = getIntervals(a.startUTC, a.endUTC);
    const bIntervals = getIntervals(b.startUTC, b.endUTC);

    for (const ai of aIntervals) {
      for (const bi of bIntervals) {
        const start = Math.max(ai[0], bi[0]);
        const end = Math.min(ai[1], bi[1]);
        if (start < end) {
          zones.push({ start, end, color: a.color.main });
        }
      }
    }
  }
  return zones;
}

function getIntervals(start, end) {
  if (start < end) return [[start, end]];
  return [[start, 24], [0, end]];
}

function computeCoverageDensity(shifts) {
  const density = new Array(24 * 60).fill(0);
  for (const shift of shifts) {
    const startMin = Math.round(shift.startUTC * 60);
    const endMin = Math.round(shift.endUTC * 60);
    if (startMin < endMin) {
      for (let m = startMin; m < endMin; m++) density[m]++;
    } else {
      for (let m = startMin; m < 24 * 60; m++) density[m]++;
      for (let m = 0; m < endMin; m++) density[m]++;
    }
  }
  return density;
}

// ─── Timeline SVG Rendering ───────────────────────────────────────────────────

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function renderTimeline(shifts, densityArray) {
  const container = document.getElementById('timeline-container');
  const containerWidth = container.clientWidth || 700;

  const LABEL_W = 60;
  const RIGHT_PAD = 20;
  const CHART_W = containerWidth - LABEL_W - RIGHT_PAD;
  const ROW_H = 38;
  const ROW_GAP = 10;
  const AXIS_H = 28;
  const DENSITY_H = 32;
  const TOP_PAD = 12;

  const numShifts = shifts.length;
  const totalHeight = TOP_PAD + AXIS_H + numShifts * (ROW_H + ROW_GAP) + 16 + DENSITY_H + 20;

  const svg = document.getElementById('timeline-svg');
  // Clear via DOM to avoid innerHTML
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  svg.setAttribute('viewBox', `0 0 ${containerWidth} ${totalHeight}`);
  svg.setAttribute('height', totalHeight);

  // ── Defs ──
  const defs = svgEl('defs', {});

  const pat = svgEl('pattern', {
    id: 'overlap-hatch', patternUnits: 'userSpaceOnUse',
    width: '8', height: '8', patternTransform: 'rotate(45)',
  });
  const patLine = svgEl('line', {
    x1: '0', y1: '0', x2: '0', y2: '8',
    stroke: '#F59E0B', 'stroke-width': '2', 'stroke-opacity': '0.5',
  });
  pat.appendChild(patLine);
  defs.appendChild(pat);

  const grad = svgEl('linearGradient', { id: 'daygrad', x1: '0%', y1: '0%', x2: '100%', y2: '0%' });
  const gradStops = [
    ['0%', '#0a1628'], ['25%', '#14213d'], ['45%', '#1a2c4a'],
    ['50%', '#1e3a5f'], ['55%', '#1a2c4a'], ['75%', '#14213d'], ['100%', '#0a1628'],
  ];
  for (const [offset, color] of gradStops) {
    const stop = svgEl('stop', { offset, 'stop-color': color });
    grad.appendChild(stop);
  }
  defs.appendChild(grad);
  svg.appendChild(defs);

  const chartTop = TOP_PAD + AXIS_H;
  const chartBottom = chartTop + numShifts * (ROW_H + ROW_GAP) - ROW_GAP;

  svg.appendChild(svgEl('rect', {
    x: LABEL_W, y: chartTop - 4,
    width: CHART_W, height: chartBottom - chartTop + 8,
    fill: 'url(#daygrad)', rx: '4',
  }));

  // ── Hour axis + gridlines ──
  const hourMarks = [0, 3, 6, 9, 12, 15, 18, 21, 24];
  for (const h of hourMarks) {
    const x = LABEL_W + (h / 24) * CHART_W;
    const isMain = h % 6 === 0;

    svg.appendChild(svgEl('line', {
      x1: x, y1: chartTop - 4,
      x2: x, y2: chartBottom + DENSITY_H + 20,
      stroke: isMain ? '#334155' : '#1e2d3d',
      'stroke-width': isMain ? '1' : '0.5',
      'stroke-dasharray': isMain ? '0' : '3,3',
    }));

    if (h < 24) {
      const txt = svgEl('text', {
        x, y: TOP_PAD + 16,
        fill: isMain ? '#94A3B8' : '#4B5563',
        'font-family': 'JetBrains Mono, monospace',
        'font-size': '11',
        'text-anchor': 'middle',
      });
      txt.textContent = String(h).padStart(2, '0');
      svg.appendChild(txt);
    }
  }

  const utcLabel = svgEl('text', {
    x: LABEL_W / 2, y: TOP_PAD + 16,
    fill: '#475569',
    'font-family': 'JetBrains Mono, monospace',
    'font-size': '10',
    'text-anchor': 'middle',
  });
  utcLabel.textContent = 'UTC';
  svg.appendChild(utcLabel);

  // ── Shift rows ──
  for (let i = 0; i < numShifts; i++) {
    const shift = shifts[i];
    const rowY = chartTop + i * (ROW_H + ROW_GAP);
    const color = shift.color.main;

    const labelEl = svgEl('text', {
      x: LABEL_W - 10, y: rowY + ROW_H / 2 + 4,
      fill: '#94A3B8',
      'font-family': 'DM Sans, sans-serif',
      'font-size': '12',
      'text-anchor': 'end',
      'font-weight': '500',
    });
    labelEl.textContent = `Shift ${i + 1}`;
    svg.appendChild(labelEl);

    const intervals = getIntervals(shift.startUTC, shift.endUTC);
    for (const [s, e] of intervals) {
      const x = LABEL_W + (s / 24) * CHART_W;
      const w = ((e - s) / 24) * CHART_W;
      if (w <= 0) continue;

      svg.appendChild(svgEl('rect', {
        x: x - 1, y: rowY + 3, width: w + 2, height: ROW_H - 6,
        rx: '5', fill: color, opacity: '0.12',
      }));

      svg.appendChild(svgEl('rect', {
        x, y: rowY + 5, width: w, height: ROW_H - 10,
        rx: '4', fill: color, opacity: '0.85',
      }));

      if (w > 80) {
        const startLabel = svgEl('text', {
          x: x + 8, y: rowY + ROW_H / 2 + 4,
          fill: '#0F172A',
          'font-family': 'JetBrains Mono, monospace',
          'font-size': '10', 'font-weight': '600',
        });
        startLabel.textContent = formatHourUTC(s);
        svg.appendChild(startLabel);
      }
    }
  }

  // ── Overlap zones ──
  const overlapZones = computeOverlapZones(shifts);
  for (const zone of overlapZones) {
    const x = LABEL_W + (zone.start / 24) * CHART_W;
    const w = ((zone.end - zone.start) / 24) * CHART_W;
    if (w <= 0) continue;

    svg.appendChild(svgEl('rect', {
      x, y: chartTop - 4, width: w, height: chartBottom - chartTop + 8,
      fill: 'url(#overlap-hatch)', opacity: '0.6',
    }));

    for (const lx of [x, x + w]) {
      svg.appendChild(svgEl('line', {
        x1: lx, y1: chartTop - 4, x2: lx, y2: chartBottom + 4,
        stroke: '#F59E0B', 'stroke-width': '1', opacity: '0.5',
      }));
    }
  }

  // ── Coverage density row ──
  const densityY = chartBottom + 16;

  const densityLabel = svgEl('text', {
    x: LABEL_W - 10, y: densityY + DENSITY_H / 2 + 4,
    fill: '#94A3B8',
    'font-family': 'DM Sans, sans-serif',
    'font-size': '11', 'text-anchor': 'end', 'font-weight': '500',
  });
  densityLabel.textContent = 'Depth';
  svg.appendChild(densityLabel);

  for (let h = 0; h < 24; h++) {
    const coverage = densityArray[h * 60] || 0;
    const x = LABEL_W + (h / 24) * CHART_W;
    const w = CHART_W / 24;

    let fill = '#1e2d3d';
    let opacity = '1';
    if (coverage === 1) { fill = '#14B8A6'; opacity = '0.55'; }
    else if (coverage === 2) { fill = '#F59E0B'; opacity = '0.70'; }
    else if (coverage >= 3) { fill = '#FB923C'; opacity = '0.80'; }

    svg.appendChild(svgEl('rect', {
      x: x + 1, y: densityY + 4, width: w - 2, height: DENSITY_H - 8,
      rx: '2', fill, opacity,
    }));

    if (coverage > 0) {
      const txt = svgEl('text', {
        x: x + w / 2, y: densityY + DENSITY_H / 2 + 4,
        fill: coverage >= 2 ? '#0F172A' : '#64748B',
        'font-family': 'JetBrains Mono, monospace',
        'font-size': '9', 'text-anchor': 'middle',
        'font-weight': coverage >= 2 ? '700' : '400',
      });
      txt.textContent = `${coverage}x`;
      svg.appendChild(txt);
    }
  }

  // Legend
  const legendY = totalHeight - 10;
  const legendItems = [
    { color: '#14B8A6', opacity: '0.55', label: '1x coverage' },
    { color: '#F59E0B', opacity: '0.70', label: '2x overlap' },
    { color: '#FB923C', opacity: '0.80', label: '3x+ overlap' },
  ];
  let lx = LABEL_W;
  for (const item of legendItems) {
    svg.appendChild(svgEl('rect', {
      x: lx, y: legendY - 7, width: 10, height: 10,
      rx: '2', fill: item.color, opacity: item.opacity,
    }));
    const ltxt = svgEl('text', {
      x: lx + 14, y: legendY + 2,
      fill: '#64748B', 'font-family': 'DM Sans, sans-serif', 'font-size': '10',
    });
    ltxt.textContent = item.label;
    svg.appendChild(ltxt);
    lx += 90;
  }

  svg.appendChild(svgEl('rect', {
    x: lx, y: legendY - 7, width: 10, height: 10,
    rx: '2', fill: 'url(#overlap-hatch)', opacity: '0.8',
  }));
  const overlapLtxt = svgEl('text', {
    x: lx + 14, y: legendY + 2,
    fill: '#64748B', 'font-family': 'DM Sans, sans-serif', 'font-size': '10',
  });
  overlapLtxt.textContent = 'overlap zone';
  svg.appendChild(overlapLtxt);
}

// ─── Shift Detail Cards — DOM-safe rendering ──────────────────────────────────

function el(tag, styles, attrs) {
  const node = document.createElement(tag);
  if (styles) Object.assign(node.style, styles);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'className') node.className = v;
      else node.setAttribute(k, v);
    }
  }
  return node;
}

function txt(content) {
  return document.createTextNode(content);
}

function renderShiftCards(shifts) {
  const grid = document.getElementById('shifts-grid');
  // Clear safely
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  for (const shift of shifts) {
    grid.appendChild(createShiftCard(shift));
  }
}

function createShiftCard(shift) {
  const { index, startUTC, endUTC, idealOffsetMinutes, color, matches } = shift;
  const shiftNum = index + 1;
  const utcRange = `${formatHourUTC(startUTC)} – ${formatHourUTC(endUTC)} UTC`;

  // Card wrapper
  const card = el('div', null, { className: 'shift-card fade-in' });

  // Flex row
  const row = el('div', { display: 'flex' });

  // Color stripe
  const stripe = el('div', { width: '4px', flexShrink: '0', background: color.main });
  stripe.className = 'shift-card-stripe';

  // Body
  const body = el('div', { flex: '1', padding: '1.125rem 1.25rem' });

  // ── Header ──
  const header = el('div', {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    marginBottom: '0.875rem', gap: '1rem',
  });

  // Left: shift name + UTC range
  const headerLeft = el('div');

  const titleRow = el('div', {
    display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem',
  });

  const shiftTitle = el('span', {
    fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '700', color: color.main,
  });
  shiftTitle.appendChild(txt(`Shift ${shiftNum}`));

  const colorBadge = el('span', {
    fontFamily: 'var(--font-mono)', fontSize: '0.8125rem',
    color: 'var(--color-text-secondary)',
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.25rem', padding: '0.15rem 0.5rem',
  });
  colorBadge.appendChild(txt(color.name));

  titleRow.appendChild(shiftTitle);
  titleRow.appendChild(colorBadge);

  const rangeDiv = el('div', {
    fontFamily: 'var(--font-mono)', fontSize: '0.875rem',
    color: 'var(--color-text-primary)', fontWeight: '500',
  });
  rangeDiv.appendChild(txt(utcRange));

  headerLeft.appendChild(titleRow);
  headerLeft.appendChild(rangeDiv);

  // Right: ideal offset
  const headerRight = el('div', { textAlign: 'right', flexShrink: '0' });

  const idealLabel = el('div', {
    fontSize: '0.6875rem', fontWeight: '600', textTransform: 'uppercase',
    letterSpacing: '0.08em', color: 'var(--color-text-secondary)', marginBottom: '0.25rem',
  });
  idealLabel.appendChild(txt('Ideal offset'));

  const idealValue = el('div', {
    fontFamily: 'var(--font-mono)', fontSize: '0.9375rem',
    fontWeight: '600', color: color.main,
  });
  idealValue.appendChild(txt(formatOffset(idealOffsetMinutes)));

  const idealSub = el('div', {
    fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem',
  });
  idealSub.appendChild(txt(`9AM = ${formatHourUTC(startUTC)} UTC`));

  headerRight.appendChild(idealLabel);
  headerRight.appendChild(idealValue);
  headerRight.appendChild(idealSub);

  header.appendChild(headerLeft);
  header.appendChild(headerRight);

  // ── Match section ──
  const matchSection = el('div');

  const matchLabelRow = el('div', {
    fontSize: '0.6875rem', fontWeight: '600', textTransform: 'uppercase',
    letterSpacing: '0.08em', color: 'var(--color-text-secondary)', marginBottom: '0.5rem',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
  });

  const matchLabelText = el('span');
  matchLabelText.appendChild(txt('Matching Timezones'));

  const matchCount = el('span', {
    fontFamily: 'var(--font-mono)', fontWeight: '400',
    background: 'var(--color-bg)', border: '1px solid var(--color-border)',
    borderRadius: '0.25rem', padding: '0.1rem 0.4rem',
    textTransform: 'none', letterSpacing: '0',
  });
  matchCount.appendChild(txt(String(matches.length)));

  matchLabelRow.appendChild(matchLabelText);
  matchLabelRow.appendChild(matchCount);

  const matchList = buildMatchList(matches);

  matchSection.appendChild(matchLabelRow);
  matchSection.appendChild(matchList);

  body.appendChild(header);
  body.appendChild(matchSection);

  row.appendChild(stripe);
  row.appendChild(body);
  card.appendChild(row);

  return card;
}

function buildMatchList(matches) {
  if (matches.length === 0) {
    const empty = el('div', { textAlign: 'center', padding: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' });
    empty.appendChild(txt('No timezone matches at current tolerance.'));
    empty.appendChild(document.createElement('br'));
    const hint = el('span', { color: '#64748B' });
    hint.appendChild(txt('Try widening tolerance to <2h or <3h.'));
    empty.appendChild(hint);
    return empty;
  }

  // Flat list: all countries & cities merged across offsets, sorted by population
  const byCountry = new Map();
  const countryPopMap = new Map();
  const countryIsoMap = new Map();
  const noCountry = [];

  for (const tz of matches) {
    if (tz.countries.length > 0) {
      const c = tz.countries[0];
      if (!byCountry.has(c.name)) {
        byCountry.set(c.name, []);
        countryPopMap.set(c.name, COUNTRY_POP[c.id] ?? -1);
        countryIsoMap.set(c.name, c.id);
      }
      const cities = byCountry.get(c.name);
      if (!cities.includes(tz.city)) cities.push(tz.city);
    } else {
      if (!noCountry.includes(tz.city)) noCountry.push(tz.city);
    }
  }

  // Sort cities by tech hub score (fallback to population)
  for (const [, cities] of byCountry) {
    cities.sort((a, b) => (CITY_TECH[b] ?? CITY_POP[b] ?? -1) - (CITY_TECH[a] ?? CITY_POP[a] ?? -1));
  }

  const countryEntries = [...byCountry.entries()].sort((a, b) => {
    const popA = countryPopMap.get(a[0]) ?? -1;
    const popB = countryPopMap.get(b[0]) ?? -1;
    if (popA !== popB) return popB - popA;
    return a[0].localeCompare(b[0]);
  });

  const maxPerCountry = 5;

  const wrapper = el('div', {
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem', overflow: 'hidden',
    padding: '0.5rem 0.75rem',
  });

  const citiesDiv = el('div', {
    fontSize: '0.75rem', color: 'var(--color-text-secondary)',
    lineHeight: '1.5',
  });

  for (let ci = 0; ci < countryEntries.length; ci++) {
    const [country, cities] = countryEntries[ci];
    const line = el('div', { marginBottom: ci < countryEntries.length - 1 || noCountry.length > 0 ? '0.15rem' : '0' });

    const countrySpan = el('span', {
      fontWeight: '600', color: 'var(--color-text-primary)',
    });
    countrySpan.appendChild(txt(country));
    line.appendChild(countrySpan);

    const iso = countryIsoMap.get(country);
    if (iso && TECH_HUB_COUNTRIES.has(iso)) {
      const techBadge = el('span', {
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: '600',
        padding: '0.1rem 0.3rem', borderRadius: '0.2rem', marginLeft: '0.35rem',
        background: 'rgba(52,211,153,0.12)', color: '#34D399',
        border: '1px solid rgba(52,211,153,0.25)',
        verticalAlign: 'middle', lineHeight: '1',
      });
      techBadge.appendChild(txt('dev'));
      line.appendChild(techBadge);
    }

    const display = cities.slice(0, maxPerCountry);
    line.appendChild(txt(': ' + display.join(', ')));

    const remaining = cities.length - display.length;
    if (remaining > 0) {
      const moreSpan = el('span', { color: '#475569' });
      moreSpan.appendChild(txt(` +${remaining} more`));
      line.appendChild(moreSpan);
    }

    citiesDiv.appendChild(line);
  }

  if (noCountry.length > 0) {
    const line = el('div');
    line.appendChild(txt(noCountry.join(', ')));
    citiesDiv.appendChild(line);
  }

  wrapper.appendChild(citiesDiv);
  return wrapper;
}

// ─── Stats Rendering ──────────────────────────────────────────────────────────

function renderStats(spacing) {
  document.getElementById('stat-spacing').textContent = formatDuration(Math.round(spacing * 60));
}

// ─── Main Recalculate ─────────────────────────────────────────────────────────

function recalculate() {
  const { shifts, spacing } = calculateShifts();
  const densityArray = computeCoverageDensity(shifts);

  renderStats(spacing);
  renderTimeline(shifts, densityArray);
  renderShiftCards(shifts);
}

// ─── Controls Wiring ──────────────────────────────────────────────────────────

function updateState(key, value) {
  state[key] = value;
  recalculate();
}

function initToggleButtons() {
  document.querySelectorAll('.toggle-btn[data-group="shifts"]').forEach(btn => {
    if (btn.dataset.value === '3') btn.classList.add('active');

    btn.addEventListener('click', () => {
      document.querySelectorAll('.toggle-btn[data-group="shifts"]')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateState('numShifts', parseInt(btn.dataset.value, 10));
    });
  });
}

function initToleranceSelect() {
  const select = document.getElementById('tolerance-select');
  if (!select) return;
  select.value = String(state.toleranceMinutes);
  select.addEventListener('change', (e) => {
    updateState('toleranceMinutes', parseInt(e.target.value, 10));
  });
}

function initDropdown() {
  document.getElementById('tz-select').addEventListener('change', (e) => {
    updateState('baseTimezone', e.target.value);
  });
}

// ─── Responsive Timeline ──────────────────────────────────────────────────────

let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const { shifts } = calculateShifts();
    const densityArray = computeCoverageDensity(shifts);
    renderTimeline(shifts, densityArray);
  }, 150);
}

// ─── Initialization ───────────────────────────────────────────────────────────

function init() {
  buildTzData();
  populateDropdown();
  initToggleButtons();
  initToleranceSelect();
  initDropdown();
  recalculate();
  window.addEventListener('resize', handleResize);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 0);
}
