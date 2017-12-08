
function moveResolution(ordersArray){
  ordersArray.forEach( order => {
    if ((order.type === "Move" || order.type === "Hold") && !( order.conflictOutcome === "neutral" || order.conflictOutcome === "loser")){
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


function orderResolution(ordersArray) {
  holdByDefault(ordersArray)
  addSupports(ordersArray)
  let conflictingLocations = isThereConflict(ordersArray)
  conflictingOrders(ordersArray, conflictingLocations)

  while (conflictingLocations.length > 0) {
    resolveConflict(filterConflicts(ordersArray, conflictingLocations[0]), conflictingLocations[0])
    conflictingLocations.shift()
  }
  addStatusToNonConflictingOrders(ordersArray)
  needsToRetreat(ordersArray)

  return ordersArray
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


function printOrderMessages(ordersArray) {
  document.getElementById("headers").innerHTML = `
  <tr>
    <th>Country</th>
    <th>Status</th>
  </tr>
  `
  let listItems = "";
  for (let order of ordersArray) {
    listItems += `
    <tr class="order">
      <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
      <td>${order.message}</td>
    </tr>`
  }
  document.getElementById("orders").innerHTML = listItems;
}

function filterConflicts(array, location){
  return array.filter(order => {
    return order.conflict == true && order.conflictLocation == location.name})
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



function addStatusToNonConflictingOrders(ordersArray) {
  ordersArray.forEach( order => {
    if (order.conflict != true && order.type == "Move"){
      order.message = `${order.unit.findOwner().name} ${order.unit.type} in ${order.unit.location.name} has moved to ${order.destination.name}`
    } else if (order.type == "Support") {
      try {
        const supportedType = order.currentLoc.findOccupied().type[0].toUpperCase();
        const supportedPossessive = countries[order.currentLoc.findOccupied().country].possessive
        let supportedMove;
        order.currentLoc === order.destination ? supportedMove = "hold" : supportedMove = "move"
        if (supportedMove === "hold") {
          order.message = `${order.unit.type[0].toUpperCase()} - ${order.unit.location.name} supports ${supportedPossessive} ${supportedType} - ${order.currentLoc.name} hold`
        } else {
          order.message = `${order.unit.type[0].toUpperCase()} - ${order.unit.location.name} supports ${supportedPossessive} ${supportedType} - ${order.currentLoc.name} move to ${order.destination}`
        }
      } catch (err) {

      }
    } else if (order.type == "Hold") {
      order.message = `${order.unit.type[0].toUpperCase()} - ${order.unit.location.name} holds`
    }
  })
}

function conflictingOrders(ordersArray, conflictingLocations){
  ordersArray.forEach( order => {
    conflictingLocations.forEach( location => {
      if (order.destination == location && orderTypeHoldOrMove(order)){
        order.conflict = true
        order.conflictLocation = location.name
      }
    })
  })
    return ordersArray
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

function nextStep() {
  var data = document.querySelector('#info_text')
  data.innerText = "There are no conflicts. Checkout the order logs to see all the moves."
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
