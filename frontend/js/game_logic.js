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
  holdByDefault(ordersArray)
  addSupports(ordersArray)
  let conflictingLocations = isThereConflict(ordersArray)
  conflictingOrders(ordersArray, conflictingLocations)

  while (conflictingLocations.length > 0) {
    resolveConflict(filterConflicts(ordersArray, conflictingLocations[0]), conflictingLocations[0])
    conflictingLocations.shift()
  }

  addStatusToConflictingOrders(ordersArray)
  return ordersArray
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

function addDataToConsole(nonconflictingOrders){
  let div = document.querySelector('.displaced')
  let ul = document.createElement('ul')
  nonconflictingOrders.forEach(order => {
    let li = document.createElement('li')
    li.innerText = `${order.unit.findOwner().name} ${order.type}s ${order.unit.type} from ${order.currentLoc.name} to ${order.destination.name}.`
    ul.append(li)
  })
  div.append(ul)
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
      createOrReplaceOrder(turn, "hold", unit, unit.location, unit.location )
    }


  })
}
