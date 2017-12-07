const countries = {
  Britain: new Country(
    1,
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
      new Unit(1, "army", territories.Lvp, null),
      new Unit(2, "fleet", territories.Edi, null),
      new Unit(3, "fleet", territories.Lon, null)
    ],
    "Britain",
    "British"
  ),
  France: new Country(
    2,
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
      new Unit(4, "army", territories.Par, null),
      new Unit(5, "army", territories.Mar, null),
      new Unit(6, "fleet", territories.Bre, null)
    ],
    "France",
    "French"
  ),
  Germany: new Country(
    3,
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
      new Unit(7, "army", territories.Ber, null),
      new Unit(8, "army", territories.Mun, null),
      new Unit(9, "fleet", territories.Kie, null)
    ],
    "Germany",
    "German"
  ),
  Italy: new Country(
    4,
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
      new Unit(10, "army", territories.Rom, null),
      new Unit(11, "army", territories.Ven, null),
      new Unit(12, "fleet", territories.Nap, null)
    ],
    "Italy",
    "Italian"
  ),
  Austria: new Country(
    5,
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
      new Unit(13, "army", territories.Vie, null),
      new Unit(14, "army", territories.Bud, null),
      new Unit(15, "fleet", territories.Tri, null),
      new Unit(30, "army", territories.Boh, null),
      new Unit(31, "army", territories.Tyr, null),
      new Unit(32, "army", territories.Pie, null)
    ],
    "Austria",
    "Austrian"
  ),
  Russia: new Country(
    6,
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
      new Unit(16, "army", territories.Mos, null),
      new Unit(17, "army", territories.War, null),
      new Unit(18, "fleet", territories.Stp, "SC"),
      new Unit(19, "fleet", territories.Sev, null)
    ],
    "Russia",
    "Russian"
  ),
  Turkey: new Country(
    7,
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
      new Unit(20, "army", territories.Con, null),
      new Unit(21, "army", territories.Smy, null),
      new Unit(22, "fleet", territories.BLA, null)
    ],
    "Turkey",
    "Turkish"
  ),
  Neutral: new Country(
    8,
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
