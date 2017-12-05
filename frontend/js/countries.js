const countries = {
  Britain: new Country(
    game,
    users.u1,
    [territories.Lon, territories.Lvp, territories.Edi],
    [
      territories.Lon,
      territories.Lvp,
      territories.Edi,
      territories.Wal,
      territories.Yor,
      territories.Cly
    ],
    [
      new Unit("army", territories.Lvp, null),
      new Unit("fleet", territories.Edi, null),
      new Unit("fleet", territories.Lon, null)
    ],
    "British"
  ),
  France: new Country(
    game,
    users.u2,
    [territories.Par, territories.Bre, territories.Mar],
    [
      territories.Par,
      territories.Bre,
      territories.Mar,
      territories.Pic,
      territories.Bur,
      territories.Gas
    ],
    [
      new Unit("army", territories.Par, null),
      new Unit("army", territories.Mar, null),
      new Unit("fleet", territories.Bre, null)
    ],
    "French"
  ),
  Germany: new Country(
    game,
    users.u3,
    [territories.Ber, territories.Kie, territories.Mun],
    [
      territories.Ber,
      territories.Kie,
      territories.Mun,
      territories.Ruh,
      territories.Pru,
      territories.Sil
    ],
    [
      new Unit("army", territories.Ber, null),
      new Unit("army", territories.Mun, null),
      new Unit("fleet", territories.Kie, null)
    ],
    "German"
  ),
  Italy: new Country(
    game,
    users.u4,
    [territories.Rom, territories.Nap, territories.Ven],
    [
      territories.Rom,
      territories.Nap,
      territories.Ven,
      territories.Pie,
      territories.Tus,
      territories.Apu
    ],
    [
      new Unit("army", territories.Rom, null),
      new Unit("army", territories.Ven, null),
      new Unit("fleet", territories.Nap, null)
    ],
    "Italian"
  ),
  Austria: new Country(
    game,
    users.u5,
    [territories.Vie, territories.Tri, territories.Bud],
    [
      territories.Vie,
      territories.Tri,
      territories.Bud,
      territories.Tyr,
      territories.Boh,
      territories.Gal
    ],
    [
      new Unit("army", territories.Vie, null),
      new Unit("army", territories.Bud, null),
      new Unit("fleet", territories.Tri, null)
    ],
    "Austrian"
  ),
  Russia: new Country(
    game,
    users.u6,
    [
      territories.Mos,
      territories.Stp,
      territories.War,
      territories.Sev
    ],
    [
      territories.Mos,
      territories.Stp,
      territories.War,
      territories.Sev,
      territories.Lvn,
      territories.Ukr
    ],
    [
      new Unit("army", territories.Mos, null),
      new Unit("army", territories.War, null),
      new Unit("fleet", territories.Stp, "SC"),
      new Unit("fleet", territories.Sev, null)
    ],
    "Russian"
  ),
  Turkey: new Country(
    game,
    users.u7,
    [territories.Con, territories.Ank, territories.Smy],
    [
      territories.Con,
      territories.Ank,
      territories.Smy,
      territories.Arm,
      territories.Syr,
    ],
    [
      new Unit("army", territories.Con, null),
      new Unit("army", territories.Smy, null),
      new Unit("fleet", territories.Ank, null)
    ],
    "Turkish"
  ),
  Neutral: new Country(
    game,
    null,
    null,
    [
      territories.Fin,
      territories.Swe,
      territories.Nwy,
      territories.Den,
      territories.Hol,
      territories.Bel,
      territories.Spa,
      territories.Por,
      territories.Naf,
      territories.Tun,
      territories.Ser,
      territories.Alb,
      territories.Gre,
      territories.Rum,
      territories.Bul
    ],
    [],
    "Neutral"
  )
}