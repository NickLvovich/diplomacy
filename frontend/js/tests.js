let germanyUnits = countries.Germany.units
let franceUnits = countries.France.units
let britainUnits = countries.Britain.units
let italyUnits = countries.Italy.units
let austriaUnits = countries.Austria.units
let russiaUnits = countries.Russia.units
let turkeyUnits = countries.Turkey.units
let allUnitsNested = [germanyUnits, franceUnits, britainUnits, italyUnits, austriaUnits, russiaUnits, turkeyUnits]
let allUnitsArray = [].concat.apply([], allUnitsNested)

function retreatingArmysTest() {
  germanyUnits[0].location = territories.Ruh
  germanyUnits[2].location = territories.Bel

  franceUnits[0].location = territories.Bur

  let ordersArray = [new Order(1, "Move", germanyUnits[0], territories.Ruh, territories.Bur ),
                     new Order(1, "Support", germanyUnits[1], territories.Ruh, territories.Bur ),
                     new Order(1, "Move", germanyUnits[2], territories.Bel, territories.Pic ),
                     new Order(1, "Hold", franceUnits[0], territories.Bur, territories.Bur ),
                     new Order(1, "Move", franceUnits[1], territories.Mar, territories.Spa ),
                     new Order(1, "Move", franceUnits[2], territories.Bre, territories.Gas )];

  orderResolution(ordersArray);
  needsToRetreat(ordersArray)

  let attempt = filterForRetreats(ordersArray)
  displayDisplacedUnits(attempt)
  let answer = [franceUnits[0]]

  if (attempt.length == answer.length && attempt.every((v,i)=> v === answer[i])) {
    return true;
  } else {
    return false;
  }
}

function oneArmyWithMoreSupportTest(){
  germanyUnits[0].location = territories.Ruh
  germanyUnits[2].location = territories.Bel

  franceUnits[0].location = territories.Bur

  let ordersArray = [new Order(1, "Support", germanyUnits[0], territories.Ruh, territories.Bur ),
                     new Order(1, "Move", germanyUnits[1], territories.Ruh, territories.Bur ),
                     new Order(1, "Move", germanyUnits[2], territories.Bel, territories.Pic ),
                     new Order(1, "Hold", franceUnits[0], territories.Bur, territories.Bur ),
                     new Order(1, "Move", franceUnits[1], territories.Mar, territories.Spa ),
                     new Order(1, "Move", franceUnits[2], territories.Bre, territories.Gas )];

  orderResolution(ordersArray)
  moveResolution(ordersArray)

}

function armiesWithEvenSupportConflict(){
  germanyUnits[0].location = territories.Ruh
  germanyUnits[2].location = territories.Bel

  franceUnits[0].location = territories.Bur

  let ordersArray = [new Order(1, "Move", germanyUnits[0], territories.Ruh, territories.Bel ),
                     new Order(1, "Move", germanyUnits[1], territories.Ruh, territories.Bur ),
                     new Order(1, "Move", germanyUnits[2], territories.Bel, territories.Pic ),
                     new Order(1, "Hold", franceUnits[0], territories.Bur, territories.Bur ),
                     new Order(1, "Move", franceUnits[1], territories.Mar, territories.Spa ),
                     new Order(1, "Move", franceUnits[2], territories.Bre, territories.Gas )];

  orderResolution(ordersArray)
  moveResolution(ordersArray)

}


function displayDisplacedUnitsTest(){
  displayDisplacedUnits(units)
}
