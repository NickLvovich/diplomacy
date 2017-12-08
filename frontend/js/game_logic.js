


function moveResolution(ordersArray){
  ordersArray.forEach( order => {
    if ((order.type === "Move" || order.type === "Hold") && !( order.conflictOutcome == "neutral" || order.conflictOutcome == "loser"))
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

  addStatusToNonConflictingOrders(ordersArray)
  needsToRetreat(ordersArray)
  return ordersArray
}

function printOrderMessages(ordersArray){

  ordersArray.forEach ( order => {
    let li = document.createElement('li')
    li.innerText = order.message
    li.class = "collection-item"
    if (order.unit.findOwner() === "France") {
      fraceUl.append(li)
    } else if (order.unit.findOwner().name === "Britain") {
      britianUl.append(li)
    } else if (order.unit.findOwner().name === "Germany") {
      germanyUl.append(li)
    } else if (order.unit.findOwner().name === "Italy") {
      italyUl.append(li)
    } else if (order.unit.findOwner().name === "Austria") {
      austriaUl.append(li)
    } else if (order.unit.findOwner().name === "Russia") {
      russiaUl.append(li)
    } else if (order.unit.findOwner().name === "Turkey") {
      turkeyUl.append(li)
    }
  })
  div.appendChild(fraceUl);
  div.appendChild(britianUl);
  div.appendChild(germanyUl);
  div.appendChild(italyUl);
  div.appendChild(austriaUl);
  div.appendChild(russiaUl);
  div.appendChild(turkeyUl);
}


function resolveConflict(conflictOrders, conflict){
  let maximum = Math.max.apply(Math, conflictOrders.map(order => order.support));
  let morethanOne = conflictOrders.filter(order => order.support == maximum)
  if (morethanOne.length > 1 ) {
    conflictOrders.forEach( order => {
      order.conflictOutcome = "neutral";
      order.message = `${order.unit.findOwner().name} ${order.unit.type} didn't have enough support to take ${order.destination.name}`
      })
  } else {
  conflictOrders.forEach(order => {
      if (order.support == maximum){
        order.message = `${order.unit.findOwner().name} ${order.type}s ${order.unit.type} from ${order.currentLoc.name} to ${order.destination.name}`
        order.conflictOutcome = "winner"
      } else {
        order.conflictOutcome = "loser"
        order.message = `${order.unit.findOwner().name}'s' ${order.unit.type} ${order.type == "Hold" ? 'could not hold' : 'did not have support to move to'} ${order.destination.name}`
      }
    })
  }
}

function needsToRetreat(ordersArray){
  ordersArray.forEach( order => {
    if(order.conflict == true && order.conflictOutcome == "loser" && order.type == "Hold"){
      order.retreat = true
      order.message = `${order.unit.findOwner().name}'s' ${order.unit.type} needs to retreat.`
    }
  })
}

function filterForRetreats(ordersArray){
  let retreat = []
  ordersArray.forEach (order => {
    if (order.retreat == true) {
      retreat.push(order.unit)
    }
  })
  return retreat
}

function addStatusToNonConflictingOrders(ordersArray){
  ordersArray.forEach( order => {
    if (order.conflict != true && order.type == "Move"){
      order.message = `${order.unit.findOwner().name} ${order.unit.type} in ${order.unit.location.name} has moved to ${order.destination.name}`
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

function displayDisplacedUnits(retreatingUnits){
  let array = []
  retreatingUnits.forEach( unit => {
    let hash = {}
    hash.unit = unit
    hash.locations = availableLocations(unit)
  })
  return array
}

function holdByDefault(ordersArray){
  unitsWithOrders =  []
  orderStore.forEach(order => {  unitsWithOrders.push(order.unit)})
  allUnitsArray.forEach(unit => {
    if (!unitsWithOrders.includes(unit)){
      createOrReplaceOrder(game.currentTurn, "hold", unit, unit.location, unit.location )
    }
  })
}
