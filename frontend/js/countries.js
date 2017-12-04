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
      new Army(territories.Lvp)
    ],
    [
      new Fleet(territories.Edi, null),
      new Fleet(territories.Lon, null)
    ]
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
      new Army(territories.Par),
      new Army(territories.Mar)
    ],
    [
      new Fleet(territories.Bre, null)
    ]
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
      new Army(territories.Ber),
      new Army(territories.Mun)
    ],
    [
      new Fleet(territories.Kie, null)
    ]
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
      new Army(territories.Rom),
      new Army(territories.Ven)
    ],
    [
      new Fleet(territories.Nap, null)
    ]
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
      new Army(territories.Vie),
      new Army(territories.Bud)
    ],
    [
      new Fleet(territories.Tri, null)
    ]
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
      new Army(territories.Mos),
      new Army(territories.War)
    ],
    [
      new Fleet(territories.Stp, "SC"),
      new Fleet(territories.Sev, null)
    ]
  ),
  Ottoman: new Country(
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
      new Army(territories.Con),
      new Army(territories.Smy)
    ],
    [
      new Fleet(territories.Ank, null)
    ]
  )
}