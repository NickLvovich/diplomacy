
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


let ordersArray = [new Order(1, "support", countries.Germany.units[0], territories.Mun, territories.Bur ),
                   new Order(1, "move", countries.Germany.units[1], territories.Mun, territories.Bur ),
                   new Order(1, "move", countries.Germany.units[2], territories.Kie, territories.Mar ),
                   new Order(1, "move", countries.France.units[0], territories.Par, territories.Bur ),
                   new Order(1, "support", countries.France.units[1], territories.Par, territories.Bur ),
                   new Order(1, "move", countries.France.units[2], territories.Bre, territories.Mar )]

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
      if (order.type === "move" || order.type === "hold"){
        if (array.includes(order.destination)){
          conflictsArray.push(order.destination)
        }
        array.push(order.destination)
      }
  })
  return conflictsArray
}

function orderResolution(ordersArray){
  let conflicts = isThereConflict(ordersArray)
  let newOrders;
      conflicts.forEach( conflict => {
      newOrders = resolveConflict(ordersArray, conflict)
  })
  return newOrders
  // moveResolution(newOrdersArray)
}



function resolveConflict(ordersArray, conflict){
  var conflictingOrders =  ordersArray.filter(order => {
    return order.destination == conflict
  })
  return conflictingOrders
}

const supports = (ordersArray) => {
  return ordersArray.filter(order => {
  return order.type === "support"
})
}


function addSupports(ordersArray){
  let supportArray = supports(ordersArray)
  ordersArray.forEach( order => {
    if (supportArray.find(support => !areSupportsCutOff(ordersArray, support) && support.destination === order.destination && support.currentLoc === order.currentLoc) && order.type != "support"){
      order.support++;
    }
  })
}

function areSupportsCutOff(ordersArray, support){
  if (getMoveDestinations(ordersArray).includes(support.unit.location)){
    return true
  }
}
 // && areSupportsCutOff(ordersArray, support) != "true"



// Method to loop through countries for unit locations
function getMoveDestinations(ordersArray){
  return ordersArray.map(order => {
  return order.destination
  })
}


// Is there support (helper)

// Is support cut(helper)
