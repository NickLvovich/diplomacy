const territories = {
  ADR: new Territory(
    "Adriatic Sea",
    "ADR",
    "water",
    false,
    ["Alb", "Apu", "Tri", "Ven"],
    { all: ["Alb", "Apu", "ION", "Tri", "Ven"] },
    { main: { x: 1640, y: 1800 } }
  ),
  AEG: new Territory(
    "Aegean Sea",
    "AEG",
    "water",
    false,
    ["Bul", "Con", "Gre", "Smy"],
    { all: ["Bul_SC", "Con", "EAS", "Gre", "ION", "Smy"] },
    { main: { x: 2070, y: 2150 } }
  ),
  Alb: new Territory(
    "Albania",
    "Alb",
    "coastal",
    false,
    ["Gre", "Tri", "Ser"],
    { all: ["ADR", "Gre", "ION", "Tri"] },
    { main: { x: 1800, y: 1880 } }
  ),
  Ank: new Territory(
    "Ankara",
    "Ank",
    "coastal",
    true,
    ["Arm", "Con", "Smy"],
    { all: ["Arm", "BLA", "Con"] },
    { main: { x: 2500, y: 1800 } }
  ),
  Apu: new Territory(
    "Apulia",
    "Apu",
    "coastal",
    false,
    ["Nap", "Rom", "Ven"],
    { all: ["ADR", "ION", "Nap", "Ven"] },
    { main: { x: 1650, y: 1880 } }
  ),
  Arm: new Territory(
    "Armenia",
    "Arm",
    "coastal",
    false,
    ["Ank", "Sev", "Smy", "Syr"],
    { all: ["Ank", "BLA", "Sev"] },
    { main: { x: 0, y: 0 } }
  ),
  BAL: new Territory(
    "Baltic Sea",
    "BAL",
    "water",
    false,
    ["Ber", "Den", "Kie", "Lvn", "Pru", "Swe"],
    { all: ["Ber", "BOT", "Den", "Kie", "Lvn", "Pru", "Swe"] },
    { main: { x: 0, y: 0 } }
  ),
  BAR: new Territory(
    "Barents Sea",
    "BAR",
    "water",
    false,
    ["Nwy", "Stp"],
    { all: ["NWG", "Nwy", "Stp_NC"] },
    { main: { x: 0, y: 0 } }
  ),
  Bel: new Territory(
    "Belgium",
    "Bel",
    "coastal",
    true,
    ["Bur", "Hol", "Pic", "Ruh"],
    { all: ["ENG", "Hol", "NTH", "Pic"] },
    { main: { x: 0, y: 0 } }
  ),
  Ber: new Territory(
    "Berlin",
    "Ber",
    "coastal",
    true,
    ["Kie", "Mun", "Pru", "Sil"],
    { all: ["BAL", "Kie", "Pru"] },
    { main: { x: 1550, y: 1100 } }
  ),
  BLA: new Territory(
    "Black Sea",
    "BLA",
    "water",
    false,
    ["Ank", "Arm", "Bul", "Con", "Rum", "Sev"],
    { all: ["Ank", "Arm", "Bul_EC", "Con", "Rum", "Sev"] },
    { main: { x: 0, y: 0 } }
  ),
  Boh: new Territory(
    "Bohemia",
    "Boh",
    "inland",
    false,
    ["Gal", "Mun", "Sil", "Tyr", "Vie"],
    null,
    { main: { x: 0, y: 0 } }
  ),
  BOT: new Territory(
    "Gulf of Bothnia",
    "BOT",
    "water",
    false,
    ["Fin", "Lvn", "Stp", "Swe"],
    { all: ["BAL", "Fin", "Lvn", "Stp_SC", "Swe"] },
    { main: { x: 0, y: 0 } }
  ),
  Bre: new Territory(
    "Brest",
    "Bre",
    "coastal",
    false,
    ["Gas", "Par", "Pic"],
    { all: ["ENG", "Gas", "MAO", "Pic"] },
    { main: { x: 900, y: 1310 } }
  ),
  Bud: new Territory(
    "Budapest",
    "Bud",
    "inland",
    true,
    ["Gal", "Rum", "Ser", "Tri", "Vie"],
    null,
    { main: { x: 1850, y: 1520 } }
  ),
  Bul: new Territory(
    "Bulgaria",
    "Bul",
    "coastal",
    true,
    ["Con", "Gre", "Ser", "Rum"],
    {
      EC: ["BLA", "Con", "Rum"],
      SC: ["AEG", "Con", "Gre"]
    },
    { main: { x: 0, y: 0 } }
  ),
  Bur: new Territory(
    "Burgundy",
    "Bur",
    "inland",
    false,
    ["Bel", "Gas", "Mar", "Mun", "Ruh", "Par", "Pic"],
    null,
    { main: { x: 0, y: 0 } }
  ),
  Cly: new Territory(
    "Clyde",
    "Cly",
    "coastal",
    false,
    ["Edi", "Lvp"],
    { all: ["Edi", "Lvp", "NAO", "NWG"] },
    { main: { x: 0, y: 0 } }
  ),
  Con: new Territory(
    "Constantinople",
    "Con",
    "coastal",
    true,
    ["Ank", "Bul", "Smy"],
    { all: ["AEG", "Ank", "BLA", "Bul_SC", "Bul_EC", "Smy"] },
    { main: { x: 2250, y: 1930 } }
  ),
  Den: new Territory(
    "Denmark",
    "Den",
    "coastal",
    true,
    ["Kie", "Swe"],
    { all: ["BAL", "HEL", "Kie", "NTH", "SKA", "Swe"] },
    { main: { x: 0, y: 0 } }
  ),
  EAS: new Territory(
    "Eastern Mediterranean",
    "EAS",
    "water",
    false,
    ["Smy", "Syr"],
    { all: ["AEG", "ION", "Smy", "Syr"] },
    { main: { x: 0, y: 0 } }
  ),
  Edi: new Territory(
    "Edinburgh",
    "Edi",
    "coastal",
    true,
    ["Cly", "Lvp", "Yor"],
    { all: ["Cly", "NTH", "NWG", "Yor"] },
    { main: { x: "1060", y: "750" } }
  ),
  ENG: new Territory(
    "English Channel",
    "ENG",
    "water",
    false,
    ["Bel", "Bre", "Lon", "Pic", "Wal"],
    { all: ["Bel", "Bre", "IRI", "Lon", "MAO", "NTH", "Pic", "Wal"] },
    { main: { x: 0, y: 0 } }
  ),
  Fin: new Territory(
    "Finland",
    "Fin",
    "coastal",
    false,
    ["Nwy", "Stp", "Swe"],
    { all: ["BOT", "Stp_SC", "Swe"] },
    { main: { x: 0, y: 0 } }
  ),
  Gal: new Territory(
    "Galicia",
    "Gal",
    "inland",
    false,
    ["Boh", "Bud", "Rum", "Sil", "Ukr", "Vie", "War"],
    null,
    { main: { x: 0, y: 0 } }
  ),
  Gas: new Territory(
    "Gascony",
    "Gas",
    "coastal",
    false,
    ["Bre", "Bur", "Mar", "Spa", "Par"],
    { all: ["Bre", "MAO", "Spa_NC"] },
    { main: { x: 0, y: 0 } }
  ),
  Gre: new Territory(
    "Greece",
    "Gre",
    "coastal",
    true,
    ["Alb", "Bul", "Ser"],
    { all: ["AEG", "Alb", "Bul_SC", "ION"] },
    { main: { x: 0, y: 0 } }
  ),
  HEL: new Territory(
    "Helgoland Bight",
    "HEL",
    "water",
    false,
    ["Den", "Hol", "Kie"],
    { all: ["Den", "Hol", "Kie", "NTH"] },
    { main: { x: 0, y: 0 } }
  ),
  Hol: new Territory(
    "Holland",
    "Hol",
    "coastal",
    true,
    ["Bel", "Kie", "Ruh"],
    { all: ["Bel", "HEL", "Kie", "NTH"] },
    { main: { x: 0, y: 0 } }
  ),
  ION: new Territory(
    "Ionian Sea",
    "ION",
    "water",
    false,
    ["Alb", "Apu", "Gre", "Nap", "Tun"],
    { all: ["ADR", "AEG", "Alb", "Apu", "EAS", "Gre", "Nap", "Tun", "TYS"] },
    { main: { x: 0, y: 0 } }
  ),
  IRI: new Territory(
    "Irish Sea",
    "IRI",
    "water",
    false,
    ["Lvp", "Wal"],
    { all: ["ENG", "Lvp", "MAO", "NAO", "Wal"] },
    { main: { x: 0, y: 0 } }
  ),
  Kie: new Territory(
    "Kiel",
    "Kie",
    "coastal",
    true,
    ["Ber", "Den", "Hol", "Mun", "Ruh"],
    { all: ["BAL", "Ber", "Den", "HEL", "Hol"] },
    { main: { x: 1375, y: 1100 } }
  ),
  Lon: new Territory(
    "London",
    "Lon",
    "coastal",
    true,
    ["Wal", "Yor"],
    { all: ["ENG", "NTH", "Wal", "Yor"] },
    { main: { x: 1050, y: 1100 } }
  ),
  Lvn: new Territory(
    "Livonia",
    "Lvn",
    "coastal",
    false,
    ["Mos", "Pru", "Stp", "War"],
    { all: ["BAL", "BOT", "Pru", "Stp_SC"] },
    { main: { x: 2000, y: 900 } }
  ),
  Lvp: new Territory(
    "Liverpool",
    "Lvp",
    "coastal",
    true,
    ["Cly", "Edi", "Wal", "Yor"],
    { all: ["Cly", "IRI", "NAO", "Wal"] },
    { main: { x: 960, y: 900 } }
  ),
  LYO: new Territory(
    "Gulf of Lyon",
    "LYO",
    "water",
    false,
    ["Mar", "Pie", "Spa", "Tus"],
    { all: ["Mar", "Pie", "Spa_SC", "Tus", "TYS", "WES"] },
    { main: { x: 1110, y: 1800 } }
  ),
  MAO: new Territory(
    "Mid Atlantic Ocean",
    "MAO",
    "water",
    false,
    ["Bre", "Gas", "Naf", "Por", "Spa"],
    { all: ["Bre", "ENG", "Gas", "IRI", "Naf", "NAO", "Por", "Spa_NC", "Spa_SC", "WES"] },
    { main: { x: 200, y: 1600 } }
  ),
  Mar: new Territory(
    "Marseilles",
    "Mar",
    "coastal",
    true,
    ["Bur", "Gas", "Pie", "Spa"],
    { all: ["LYO", "Pie", "Spa_SC"] },
    { main: { x: 1160, y: 1600 } }
  ),
  Mos: new Territory(
    "Moscow",
    "Mos",
    "inland",
    true,
    ["Lvn", "Sev", "Stp", "Ukr", "War"],
    null,
    { main: { x: 2400, y: 950 } }
  ),
  Mun: new Territory(
    "Munich",
    "Mun",
    "inland",
    true,
    ["Ber", "Boh", "Bur", "Kie", "Ruh", "Sil", "Tyr"],
    null,
    { main: { x: 1400, y: 1370 } }
  ),
  Naf: new Territory(
    "North Africa",
    "Naf",
    "coastal",
    false,
    ["Tun"],
    { all: ["MAO", "Tun", "WES"] },
    { main: { x: 800, y: 2150 } }
  ),
  NAO: new Territory(
    "North Atlantic Ocean",
    "NAO",
    "water",
    false,
    ["Cly", "Lvp"],
    { all: ["Cly", "IRI", "Lvp", "MAO", "NWG"] },
    { main: { x: 400, y: 500 } }
  ),
  Nap: new Territory(
    "Naples",
    "Nap",
    "coastal",
    true,
    ["Apu", "Rom"],
    { all: ["Apu", "ION", "Rom", "TYS"] },
    { main: { x: 1570, y: 1940 } }
  ),
  NTH: new Territory(
    "North Sea",
    "NTH",
    "water",
    false,
    ["Bel", "Den", "Edi", "Hol", "Lon", "Nwy", "Yor"],
    { all: ["Bel", "Den", "Edi", "ENG", "HEL", "Hol", "Lon", "NWG", "Nwy", "SKA", "Yor"] },
    { main: { x: 1240, y: 820 } }
  ),
  NWG: new Territory(
    "Norwegian Sea",
    "NWG",
    "water",
    false,
    ["Cly", "Edi", "Nwy"],
    { all: ["BAR", "Cly", "Edi", "NAO", "NTH", "Nwy"] },
    { main: { x: 1300, y: 240 } }
  ),
  Nwy: new Territory(
    "Norway",
    "Nwy",
    "coastal",
    true,
    ["Fin", "Stp", "Swe"],
    { all: ["BAR", "NTH", "NWG", "SKA", "Stp_NC", "Swe"] },
    { main: { x: 1470, y: 600 } }
  ),
  Par: new Territory(
    "Paris",
    "Par",
    "inland",
    true,
    ["Bre", "Bur", "Gas", "Pic"],
    null,
    { main: { x: 1030, y: 1400 } }
  ),
  Pic: new Territory(
    "Picardy",
    "Pic",
    "coastal",
    false,
    ["Bel", "Bre", "Bur", "Par"],
    { all: ["Bel", "Bre", "ENG"] },
    { main: { x: 1060, y: 1280 } }
  ),
  Pie: new Territory(
    "Piedmont",
    "Pie",
    "coastal",
    false,
    ["Mar", "Tus", "Tyr", "Ven"],
    { all: ["LYO", "Mar", "Tus"] },
    { main: { x: 1300, y: 1610 } }
  ),
  Por: new Territory(
    "Portugal",
    "Por",
    "coastal",
    true,
    ["Spa"],
    { all: ["MAO", "Spa_NC", "Spa_SC"] },
    { main: { x: 510, y: 1690 } }
  ),
  Pru: new Territory(
    "Prussia",
    "Pru",
    "coastal",
    false,
    ["Ber", "Lvn", "Sil", "War"],
    { all: ["BAL", "Ber", "Lvn"] },
    { main: { x: 1700, y: 1110 } }
  ),
  Rom: new Territory(
    "Rome",
    "Rom",
    "coastal",
    false,
    ["Apu", "Nap", "Tus", "Ven"],
    { all: ["Nap", "Tus", "TYS"] },
    { main: { x: 1470, y: 1820 } }
  ),
  Ruh: new Territory(
    "Ruhr",
    "Ruh",
    "inland",
    false,
    ["Bel", "Bur", "Hol", "Kie", "Mun"],
    null,
    { main: { x: 1315, y: 1280 } }
  ),
  Rum: new Territory(
    "Rumania",
    "Rum",
    "coastal",
    true,
    ["Bud", "Bul", "Gal", "Ser", "Sev", "Ukr"],
    { all: ["BLA", "Bul_EC", "Sev"] },
    { main: { x: 2150, y: 1630 } }
  ),
  Ser: new Territory(
    "Serbia",
    "Ser",
    "inland",
    true,
    ["Alb", "Bud", "Bul", "Gre", "Rum", "Tri"],
    null,
    { main: { x: 1850, y: 1740 } }
  ),
  Sev: new Territory(
    "Sevastopol",
    "Sev",
    "coastal",
    true,
    ["Arm", "Mos", "Rum", "Ukr"],
    { all: ["Arm", "BLA", "Rum"] },
    { main: { x: 2400, y: 1450 } }
  ),
  Sil: new Territory(
    "Silesia",
    "Sil",
    "inland",
    false,
    ["Ber", "Boh", "Gal", "Mun", "Pru", "War"],
    null,
    { main: { x: 1650, y: 1234 } }
  ),
  SKA: new Territory(
    "Skagerrak",
    "SKA",
    "water",
    false,
    ["Den", "Nwy", "Swe"],
    { all: ["Den", "NTH", "Nwy", "Swe"] },
    { main: { x: 1465, y: 800 } }
  ),
  Smy: new Territory(
    "Smyrna",
    "Smy",
    "coastal",
    true,
    ["Ank", "Arm", "Con", "Syr"],
    { all: ["AES", "Con", "EAS", "SYR"] },
    { main: { x: 2420, y: 2060 } }
  ),
  Spa: new Territory(
    "Spain",
    "Spa",
    "coastal",
    true,
    ["Gas", "Mar", "Por"],
    {
      NC: ["Gas", "MAO", "Por"],
      SC: ["LYO", "MAO", "MAR", "Por", "WES"]
    },
    { main: { x: 700, y: 1800 },
    NC: { x: 700, y: 1620 },
    SC: { x: 700, y: 1950 } }
  ),
  Stp: new Territory(
    "St.Petersburg",
    "Stp",
    "coastal",
    true,
    ["Fin", "Lvn", "Mos", "Nwy"],
    {
      NC: ["BAR", "Nwy"],
      SC: ["BOT", "Fin", "Lvn"]
    },
    {
      main: { x: 2300, y: 600 },
      NC: { x: 2500, y: 200 },
      SC: { x: 2125, y: 725 }
    }
  ),
  Swe: new Territory(
    "Sweden",
    "Swe",
    "coastal",
    true,
    ["Den", "Fin", "Nwy"],
    { all: ["BAL", "BOT", "Den", "Fin", "Nwy", "SKA"] },
    { main: { x: 1700, y: 500 } }
  ),
  Syr: new Territory(
    "Syria",
    "Syr",
    "coastal",
    false,
    ["Arm", "Smy"],
    { all: ["EAS", "Smy"] },
    { main: { x: 2800, y: 2150 } }
  ),
  Tri: new Territory(
    "Trieste",
    "Tri",
    "coastal",
    true,
    ["Alb", "Bud", "Ser", "Tyr", "Ven", "Vie"],
    { all: ["ADR", "Alb", "Ven"] },
    { main: { x: 1650, y: 1675 } }
  ),
  Tun: new Territory(
    "Tunisia",
    "Tun",
    "coastal",
    true,
    ["Naf"],
    { all: ["ION", "Naf", "TYS", "WES"] },
    { main: { x: 0, y: 0 } }
  ),
  Tus: new Territory(
    "Tuscany",
    "Tus",
    "coastal",
    false,
    ["Pie", "Rom", "Ven"],
    { all: ["LYO", "Pie", "Rom", "TYS"] },
    { main: { x: 0, y: 0 } }
  ),
  Tyr: new Territory(
    "Tyrolia",
    "Tyr",
    "inland",
    false,
    ["Boh", "Mun", "Pie", "Tri", "Ven", "Vie"],
    null,
    { main: { x: 0, y: 0 } }
  ),
  TYS: new Territory(
    "Tyrrhenian Sea",
    "TYS",
    "water",
    false,
    ["Nap", "Rom", "Tun", "Tus"],
    { all: ["ION", "LYO", "Nap", "Rom", "Tun", "Tus", "WES"] },
    { main: { x: 0, y: 0 } }
  ),
  Ukr: new Territory(
    "Ukraine",
    "Ukr",
    "inland",
    false,
    ["Gal", "Mos", "Rum", "Sev", "War"],
    null,
    { main: { x: 0, y: 0 } }
  ),
  Ven: new Territory(
    "Venice",
    "Ven",
    "coastal",
    true,
    ["Apu", "Pie", "Rom", "Tri", "Tus", "Tyr"],
    { all: ["ADR", "Apu", "Tri"] },
    { main: { x: 1420, y: 1620 } }
  ),
  Vie: new Territory(
    "Vienna",
    "Vie",
    "inland",
    true,
    ["Boh", "Bud", "Gal", "Tri", "Tyr"],
    null,
    { main: { x: 1690, y: 1420 } }
  ),
  Wal: new Territory(
    "Wales",
    "Wal",
    "coastal",
    false,
    ["Lon", "Lvp", "Yor"],
    { all: ["ENG", "IRI", "Lon", "Lvp"] },
    { main: { x: 0, y: 0 } }
  ),
  War: new Territory(
    "Warsaw",
    "War",
    "inland",
    true,
    ["Gal", "Lvn", "Mos", "Pru", "Sil", "Ukr"],
    null,
    { main: { x: 1870, y: 1200 } }
  ),
  WES: new Territory(
    "Western Mediterranean",
    "WES",
    "water",
    false,
    ["Naf", "Spa", "Tun"],
    { all: ["LYO", "MAO", "Naf", "Spa_SC", "Tun", "TYS"] },
    { main: { x: 0, y: 0 } }
  ),
  Yor: new Territory(
    "Yorkshire",
    "Yor",
    "coastal",
    false,
    ["Edi", "Lon", "Lvp", "Wal"],
    { all: ["Edi", "Lon", "NTH"] },
    { main: { x: 0, y: 0 } }
  )
}
