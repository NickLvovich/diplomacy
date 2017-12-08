
function moveResolution(ordersArray){
  ordersArray.forEach( order => {
    if (order.type === "Move" || order.type === "Hold"){
    order.unit.coast = order.coast
    order.unit.location = order.destination
  }
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
  
  addSupports(ordersArray)
  let conflictingLocations = isThereConflict(ordersArray)
  let conflictOrders = conflictingOrders(ordersArray, conflictingLocations)
  let nonconflictingOrders = nonConflictingOrders(ordersArray, conflictingLocations)
  let retreatingUnits= [];
  while (conflictingLocations.length > 0) {
    let results = resolveConflict(conflictOrders, conflictingLocations[0])
    if (results != undefined){
      nonconflictingOrders.push(results.winner[0])
      let winningDestination = results.winner[0].destination
      results.lost.forEach( loser => {
        if (loser.unit.location === winningDestination){
          retreatingUnits.push(loser.unit)
        }
      })
    }
    conflictingLocations.shift()
  }
  moveResolution(nonconflictingOrders);
  return retreatingUnits
}


function printOrderMessages(ordersArray) {
  document.getElementById("headers").innerHTML = `
  <tr>
    <th>Country</th>
    <th>Status</th>
  </tr>
  `
  let listItems = "";
  for (let order of ordersArray) {
    // debugger;
    listItems += `
    <tr class="order">
      <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
      <td>${order.message}</td>
    </tr>`
  }
  document.getElementById("orders").innerHTML = listItems;
}


function resolveConflict(conflictOrders, conflict){
  let conflictingOrders =  conflictOrders.filter(order => {
    return order.destination == conflict
  })
  let maximum = Math.max.apply(Math, conflictingOrders.map(order => order.support));
  let possibleWinners = conflictingOrders.filter( order => order.support === maximum)
  let losersArray = conflictingOrders.filter( order => order.support !== maximum)
  let resultsHash = { winner: possibleWinners, lost: losersArray }
  if (possibleWinners.length === 1){
    return resultsHash;
  }
}


function addStatusToConflictingOrders(ordersArray){
  ordersArray.forEach( order => {
    if (order.conflict != true && order.type == "Move"){
      order.message = `${order.unit.type[0].toUpperCase()} - ${order.unit.location.name} moves to ${order.destination.name}`
    } else if (order.type == "Support") {
      order.message = `${order.unit.findOwner().name} ${order.unit.type} supports move or hold to ${order.destination.name}`
    }
  })
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
  return order.type == "Move" || order.type == "Hold"
}


const supports = (ordersArray) => {
  return ordersArray.filter(order => {
    return order.type === "Support"
  })
}


function addSupports(ordersArray){
  let supportArray = supports(ordersArray)
  ordersArray.forEach( order => {
    if (supportArray.find(support => !areSupportsCutOff(ordersArray, support) && support.destination === order.destination && support.currentLoc === order.currentLoc) && order.type != "Support"){
      order.support++;
    }
  })
}

function areSupportsCutOff(ordersArray, support){
  if (getMoveDestinations(ordersArray).includes(support.unit.location)){
    return true
  }
}


function getMoveDestinations(ordersArray){
  return ordersArray.map(order => {
  return order.destination
  })
}

function holdByDefault(ordersArray){
  unitsWithOrders =  []
  orderStore.forEach(order => {  unitsWithOrders.push(order.unit)})
  allUnitsArray.forEach(unit => {
    if (!unitsWithOrders.includes(unit)){
      createOrReplaceOrder(game.currentTurn, "Hold", unit, unit.location, unit.location, unit.coast )
    }


  })
}
