const territories = {
  ADR: new Territory(
    "Adriatic Sea",
    "ADR",
    "water",
    false,
    ["Alb", "Apu", "Tri", "Ven"],
    { all: ["Alb", "Apu", "ION", "Tri", "Ven"] },
  ),
  AEG: new Territory(
    "Aegean Sea",
    "AEG",
    "water",
    false,
    ["Bul", "Con", "Gre", "Smy"],
    { all: ["Bul_SC", "Con", "EAS", "Gre", "ION", "Smy"] }
  ),
  Alb: new Territory(
    "Albania",
    "Alb",
    "coastal",
    false,
    ["Gre", "Tri", "Ser"],
    { all: ["ADR", "Gre", "ION", "Tri"] }
  ),
  Ank: new Territory(
    "Ankara",
    "Ank",
    "coastal",
    true,
    ["Arm", "Con", "Smy"],
    { all: ["Arm", "BLA", "Con"] }
  ),
  Apu: new Territory(
    "Apulia",
    "Apu",
    "coastal",
    false,
    ["Nap", "Rom", "Ven"],
    { all: ["ADR", "ION", "Nap", "Ven"] }
  ),
  Arm: new Territory(
    "Armenia",
    "Arm",
    "coastal",
    false,
    ["Ank", "Sev", "Smy", "Syr"],
    { all: ["Ank", "BLA", "Sev"] }
  ),
  BAL: new Territory(
    "Baltic Sea",
    "BAL",
    "water",
    false,
    ["Ber", "Den", "Kie", "Lvn", "Pru", "Swe"],
    { all: ["Ber", "BOT", "Den", "Kie", "Lvn", "Pru", "Swe"] }
  ),
  BAR: new Territory(
    "Barents Sea",
    "BAR",
    "water",
    false,
    ["Nwy", "Stp"],
    { all: ["NWG", "Nwy", "Stp_NC"] }
  ),
  Bel: new Territory(
    "Belgium",
    "Bel",
    "coastal",
    true,
    ["Bur", "Hol", "Pic", "Ruh"],
    { all: ["ENG", "Hol", "NTH", "Pic"] }
  ),
  Ber: new Territory(
    "Berlin",
    "Ber",
    "coastal",
    true,
    ["Kie", "Mun", "Pru", "Sil"],
    { all: ["BAL", "Kie", "Pru"] }
  ),
  BLA: new Territory(
    "Black Sea",
    "BLA",
    "water",
    false,
    ["Ank", "Arm", "Bul", "Con", "Rum", "Sev"],
    { all: ["Ank", "Arm", "Bul_EC", "Con", "Rum", "Sev"] }
  ),
  Boh: new Territory(
    "Bohemia",
    "Boh",
    "inland",
    false,
    ["Gal", "Mun", "Sil", "Tyr", "Vie"],
    null
  ),
  BOT: new Territory(
    "Gulf of Bothnia",
    "BOT",
    "water",
    false,
    ["Fin", "Lvn", "Stp", "Swe"],
    { all: ["BAL", "Fin", "Lvn", "Stp_SC", "Swe"] }
  ),
  Bre: new Territory(
    "Brest",
    "Bre",
    "coastal",
    false,
    ["Gas", "Par", "Pic"],
    { all: ["ENG", "Gas", "MAO", "Pic"] }
  ),
  Bud: new Territory(
    "Budapest",
    "Bud",
    "inland",
    true,
    ["Gal", "Rum", "Ser", "Tri", "Vie"],
    null
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
    }
  ),
  Bur: new Territory(
    "Burgundy",
    "Bur",
    "inland",
    false,
    ["Bel", "Gas", "Mar", "Mun", "Ruh", "Par", "Pic"],
    null
  ),
  Cly: new Territory(
    "Clyde",
    "Cly",
    "coastal",
    false,
    ["Edi", "Lvp"],
    { all: ["Edi", "Lvp", "NAO", "NWG"] }
  ),
  Con: new Territory(
    "Constantinople",
    "Con",
    "coastal",
    true,
    ["Ank", "Bul", "Smy"],
    { all: ["AEG", "Ank", "BLA", "Bul_SC", "Bul_EC", "Smy"] }
  ),
  Den: new Territory(
    "Denmark",
    "Den",
    "coastal",
    true,
    ["Kie", "Swe"],
    { all: ["BAL", "HEL", "Kie", "NTH", "SKA", "Swe"] }
  ),
  EAS: new Territory(
    "Eastern Mediterranean",
    "EAS",
    "water",
    false,
    ["Smy", "Syr"],
    { all: ["AEG", "ION", "Smy", "Syr"] }
  ),
  Edi: new Territory(
    "Edinburgh",
    "Edi",
    "coastal",
    true,
    ["Cly", "Lvp", "Yor"],
    { all: ["Cly", "NTH", "NWG", "Yor"] },
    { main: { x: "1040", y: "800" } }
  ),
  ENG: new Territory(
    "English Channel",
    "ENG",
    "water",
    false,
    ["Bel", "Bre", "Lon", "Pic", "Wal"],
    { all: ["Bel", "Bre", "IRI", "Lon", "MAO", "NTH", "Pic", "Wal"] }
  ),
  Fin: new Territory(
    "Finland",
    "Fin",
    "coastal",
    false,
    ["Nwy", "Stp", "Swe"],
    { all: ["BOT", "Stp_SC", "Swe"] }
  ),
  Gal: new Territory(
    "Galicia",
    "Gal",
    "inland",
    false,
    ["Boh", "Bud", "Rum", "Sil", "Ukr", "Vie", "War"],
    null
  ),
  Gas: new Territory(
    "Gascony",
    "Gas",
    "coastal",
    false,
    ["Bre", "Bur", "Mar", "Spa", "Par"],
    { all: ["Bre", "MAO", "Spa_NC"] }
  ),
  Gre: new Territory(
    "Greece",
    "Gre",
    "coastal",
    true,
    ["Alb", "Bul", "Ser"],
    { all: ["AEG", "Alb", "Bul_SC", "ION"] }
  ),
  HEL: new Territory(
    "Helgoland Bight",
    "HEL",
    "water",
    false,
    ["Den", "Hol", "Kie"],
    { all: ["Den", "Hol", "Kie", "NTH"] }
  ),
  Hol: new Territory(
    "Holland",
    "Hol",
    "coastal",
    true,
    ["Bel", "Kie", "Ruh"],
    { all: ["Bel", "HEL", "Kie", "NTH"] }
  ),
  ION: new Territory(
    "Ionian Sea",
    "ION",
    "water",
    false,
    ["Alb", "Apu", "Gre", "Nap", "Tun"],
    { all: ["ADR", "AEG", "Alb", "Apu", "EAS", "Gre", "Nap", "Tun", "TYS"] }
  ),
  IRI: new Territory(
    "Irish Sea",
    "IRI",
    "water",
    false,
    ["Lvp", "Wal"],
    { all: ["ENG", "Lvp", "MAO", "NAO", "Wal"] }
  ),
  Kie: new Territory(
    "Kiel",
    "Kie",
    "coastal",
    true,
    ["Ber", "Den", "Hol", "Mun", "Ruh"],
    { all: ["BAL", "Ber", "Den", "HEL", "Hol"] }
  ),
  Lon: new Territory(
    "London",
    "Lon",
    "coastal",
    true,
    ["Wal", "Yor"],
    { all: ["ENG", "NTH", "Wal", "Yor"] }
  ),
  Lvn: new Territory(
    "Livonia",
    "Lvn",
    "coastal",
    false,
    ["Mos", "Pru", "Stp", "War"],
    { all: ["BAL", "BOT", "Pru", "Stp_SC"] }
  ),
  Lvp: new Territory(
    "Liverpool",
    "Lvp",
    "coastal",
    true,
    ["Cly", "Edi", "Wal", "Yor"],
    { all: ["Cly", "IRI", "NAO", "Wal"] }
  ),
  LYO: new Territory(
    "Gulf of Lyon",
    "LYO",
    "water",
    false,
    ["Mar", "Pie", "Spa", "Tus"],
    { all: ["Mar", "Pie", "Spa_SC", "Tus", "TYS", "WES"] }
  ),
  MAO: new Territory(
    "Mid Atlantic Ocean",
    "MAO",
    "water",
    false,
    ["Bre", "Gas", "Naf", "Por", "Spa"],
    { all: ["Bre", "ENG", "Gas", "IRI", "Naf", "NAO", "Por", "Spa_NC", "Spa_SC", "WES"] }
  ),
  Mar: new Territory(
    "Marseilles",
    "Mar",
    "coastal",
    true,
    ["Bur", "Gas", "Pie", "Spa"],
    { all: ["LYO", "Pie", "Spa_SC"] }
  ),
  Mos: new Territory(
    "Moscow",
    "Mos",
    "inland",
    true,
    ["Lvn", "Sev", "Stp", "Ukr", "War"],
    null
  ),
  Mun: new Territory(
    "Munich",
    "Mun",
    "inland",
    true,
    ["Ber", "Boh", "Bur", "Kie", "Ruh", "Sil", "Tyr"],
    null
  ),
  Naf: new Territory(
    "North Africa",
    "Naf",
    "coastal",
    false,
    ["Tun"],
    { all: ["MAO", "Tun", "WES"] }
  ),
  NAO: new Territory(
    "North Atlantic Ocean",
    "NAO",
    "water",
    false,
    ["Cly", "Lvp"],
    { all: ["Cly", "IRI", "Lvp", "MAO", "NWG"] }
  ),
  Nap: new Territory(
    "Naples",
    "Nap",
    "coastal",
    true,
    ["Apu", "Rom"],
    { all: ["Apu", "ION", "Rom", "TYS"] }
  ),
  NTH: new Territory(
    "North Sea",
    "NTH",
    "water",
    false,
    ["Bel", "Den", "Edi", "Hol", "Lon", "Nwy", "Yor"],
    { all: ["Bel", "Den", "Edi", "ENG", "HEL", "Hol", "Lon", "NWG", "Nwy", "SKA", "Yor"] }
  ),
  NWG: new Territory(
    "Norwegian Sea",
    "NWG",
    "water",
    false,
    ["Cly", "Edi", "Nwy"],
    { all: ["BAR", "Cly", "Edi", "NAO", "NTH", "Nwy"] }
  ),
  Nwy: new Territory(
    "Norway",
    "Nwy",
    "coastal",
    true,
    ["Fin", "Stp", "Swe"],
    { all: ["BAR", "NTH", "NWG", "SKA", "Stp_NC", "Swe"] }
  ),
  Par: new Territory(
    "Paris",
    "Par",
    "inland",
    true,
    ["Bre", "Bur", "Gas", "Pic"],
    null
  ),
  Pic: new Territory(
    "Picardy",
    "Pic",
    "coastal",
    false,
    ["Bel", "Bre", "Bur", "Par"],
    { all: ["Bel", "Bre", "ENG"] }
  ),
  Pie: new Territory(
    "Piedmont",
    "Pie",
    "coastal",
    false,
    ["Mar", "Tus", "Tyr", "Ven"],
    { all: ["LYO", "Mar", "Tus"] }
  ),
  Por: new Territory(
    "Portugal",
    "Por",
    "coastal",
    true,
    ["Spa"],
    { all: ["MAO", "Spa_NC", "Spa_SC"] }
  ),
  Pru: new Territory(
    "Prussia",
    "Pru",
    "coastal",
    false,
    ["Ber", "Lvn", "Sil", "War"],
    { all: ["BAL", "Ber", "Lvn"] }
  ),
  Rom: new Territory(
    "Rome",
    "Rom",
    "coastal",
    false,
    ["Apu", "Nap", "Tus", "Ven"]
  ),
  Ruh: new Territory(
    "Ruhr",
    "Ruh",
    "inland",
    false,
    ["Bel", "Bur", "Hol", "Kie", "Mun"],
    null
  ),
  Rum: new Territory(
    "Rumania",
    "Rum",
    "coastal",
    true,
    ["Bud", "Bul", "Gal", "Ser", "Sev", "Ukr"],
    { all: ["BLA", "Bul_EC", "Sev"] }
  ),
  Ser: new Territory(
    "Serbia",
    "Ser",
    "inland",
    true,
    ["Alb", "Bud", "Bul", "Gre", "Rum", "Tri"],
    null
  ),
  Sev: new Territory(
    "Sevastopol",
    "Sev",
    "coastal",
    true,
    ["Arm", "Mos", "Rum", "Ukr"],
    { all: ["Arm", "BLA", "Rum"] }
  ),
  Sil: new Territory(
    "Silesia",
    "Sil",
    "inland",
    false,
    ["Ber", "Boh", "Gal", "Mun", "Pru", "War"],
    null
  ),
  SKA: new Territory(
    "Skagerrak",
    "SKA",
    "water",
    false,
    ["Den", "Nwy", "Swe"],
    { all: ["Den", "NTH", "Nwy", "Swe"] }
  ),
  Smy: new Territory(
    "Smyrna",
    "Smy",
    "coastal",
    true,
    ["Ank", "Arm", "Con", "Syr"],
    { all: ["AES", "Con", "EAS", "SYR"] }
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
    }
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
    }
  ),
  Swe: new Territory(
    "Sweden",
    "Swe",
    "coastal",
    true,
    ["Den", "Fin", "Nwy"],
    { all: ["BAL", "BOT", "Den", "Fin", "Nwy", "SKA"] }
  ),
  Syr: new Territory(
    "Syria",
    "Syr",
    "coastal",
    false,
    ["Arm", "Smy"],
    { all: ["EAS", "Smy"] }
  ),
  Tri: new Territory(
    "Trieste",
    "Tri",
    "coastal",
    true,
    ["Alb", "Bud", "Ser", "Tyr", "Ven", "Vie"],
    { all: ["ADR", "Alb", "Ven"] }
  ),
  Tun: new Territory(
    "Tunisia",
    "Tun",
    "coastal",
    true,
    ["Naf"],
    { all: ["ION", "Naf", "TYS", "WES"] }
  ),
  Tus: new Territory(
    "Tuscany",
    "Tus",
    "coastal",
    false,
    ["Pie", "Rom", "Ven"],
    { all: ["LYO", "Pie", "Rom", "TYS"] }
  ),
  Tyr: new Territory(
    "Tyrolia",
    "Tyr",
    "inland",
    false,
    ["Boh", "Mun", "Pie", "Tri", "Ven", "Vie"],
    null
  ),
  TYS: new Territory(
    "Tyrrhenian Sea",
    "TYS",
    "water",
    false,
    ["Nap", "Rom", "Tun", "Tus"],
    { all: ["ION", "LYO", "Nap", "Rom", "Tun", "Tus", "WES"] }
  ),
  Ukr: new Territory(
    "Ukraine",
    "Ukr",
    "inland",
    false,
    ["Gal", "Mos", "Rum", "Sev", "War"],
    null
  ),
  Ven: new Territory(
    "Venice",
    "Ven",
    "coastal",
    true,
    ["Apu", "Pie", "Rom", "Tri", "Tus", "Tyr"],
    { all: ["ADR", "Apu", "Tri"] }
  ),
  Vie: new Territory(
    "Vienna",
    "Vie",
    "inland",
    true,
    ["Boh", "Bud", "Gal", "Tri", "Tyr"],
    null
  ),
  Wal: new Territory(
    "Wales",
    "Wal",
    "coastal",
    false,
    ["Lon", "Lvp", "Yor"],
    { all: ["ENG", "IRI", "Lon", "Lvp"] }
  ),
  War: new Territory(
    "Warsaw",
    "War",
    "inland",
    true,
    ["Gal", "Lvn", "Mos", "Pru", "Sil", "Ukr"]
  ),
  WES: new Territory(
    "Western Mediterranean",
    "WES",
    "water",
    false,
    ["Naf", "Spa", "Tun"],
    { all: ["LYO", "MAO", "Naf", "Spa_SC", "Tun", "TYS"] }
  ),
  Yor: new Territory(
    "Yorkshire",
    "Yor",
    "coastal",
    false,
    ["Edi", "Lon", "Lvp", "Wal"],
    { all: ["Edi", "Lon", "NTH"] }
  )
}