
// Order Resolution function
// takes in an array of orders, which have (turn, type, unit (is an object), currentLoc, destination)
let germanyUnits = countries.Germany.units
let franceUnits = countries.France.units
let britainUnits = countries.Britain.units
let italyUnits = countries.Italy.units
let austriaUnits = countries.Austria.units
let russiaUnits = countries.Russia.units
let turkeyUnits = countries.Turkey.units
let allUnitsNested = [germanyUnits, franceUnits, britainUnits, italyUnits, austriaUnits, russiaUnits, turkeyUnits]
let allUnitsArray = [].concat.apply([], allUnitsNested)


let ordersArray = [new Order(1, "move", countries.Germany.units[0], territories.Ber, territories.Kie ),
                   new Order(1, "move", countries.Germany.units[1], territories.Mun, territories.Bur ),
                   new Order(1, "support", countries.Germany.units[2], territories.Mun, territories.Bur ),
                   new Order(1, "move", countries.France.units[0], territories.Par, territories.Bur ),
                   new Order(1, "support", countries.France.units[1], territories.Par, territories.Bur ),
                   new Order(1, "move", countries.France.units[2], territories.Bre, territories.Gas )]

function moveResolution(ordersArray){
  ordersArray.forEach( order => {
    if (order.type === "move" || order.type === "hold")
    order.unit.location = order.destination
  })
}

function isThereConflict(ordersArray){
  let array = []
  let conflictsArray = []
  ordersArray.forEach ( order => {
      if (orderTypeHoldOrMove(order)){
        if (array.includes(order.destination)){
          conflictsArray.push(order.destination)
        }
        array.push(order.destination)
      }
  })
  return conflictsArray
}

function orderResolution(ordersArray){
  // grab conflicting locations
  addSupports(ordersArray)
  let conflictingLocations = isThereConflict(ordersArray)
  let conflictOrders = conflictingOrders(ordersArray, conflictingLocations)
  let nonconflictingOrders = nonConflictingOrders(ordersArray, conflictingLocations)

  while (conflictingLocations.length > 0) {
    let x = resolveConflict(conflictOrders, conflictingLocations[0])
    if (x != undefined){
      nonconflictingOrders.push(x)
    }
    conflictingLocations.shift()
  }
  moveResolution(nonconflictingOrders);
  return nonconflictingOrders
}

function resolveConflict(conflictOrders, conflict){
  var conflictingOrders =  conflictOrders.filter(order => {
    return order.destination == conflict
  })
  var maximum = Math.max.apply(Math, conflictingOrders.map(order => order.support));
  conflictingOrders = conflictingOrders.filter( order => order.support === maximum)
  if (conflictingOrders.length === 1){
    return conflictingOrders[0];
  }
}


function conflictingOrders(ordersArray, conflictingLocations){
  let conflictOrders = []
  ordersArray.forEach( order => {
    conflictingLocations.forEach( location => {
      if (order.destination == location && orderTypeHoldOrMove(order)){

        conflictOrders.push(order);
      }
    })
  })
    return conflictOrders
}

function nonConflictingOrders(ordersArray, conflictingLocations){
 var newOrders = ordersArray
 let issues = [...conflictingLocations]
  while (issues.length > 0 ) {
      newOrders = newOrders.filter( order => order.destination != conflictingLocations[0])
      issues.shift()
  }
  return newOrders
}

function orderTypeHoldOrMove(order) {
  return order.type == "move" || order.type == "hold"
}


const supports = (ordersArray) => {
  return ordersArray.filter(order => {
    return order.type === "support"
  })
}


function addSupports(ordersArray){
  let supportArray = supports(ordersArray)
  ordersArray.forEach( order => {
    if (supportArray.find(support => support.destination === order.destination && support.currentLoc === order.currentLoc) && order.type != "support"){
        order.support++;
    }
  })
}




// Is the territory occupied (helper)

// Method to loop through countries for unit locations
function getUnitLocations(){
  allUnitsArray.forEach( unit =>
  console.log(unit.location))
}


// Is there support (helper)

// Is support cut(helper)
