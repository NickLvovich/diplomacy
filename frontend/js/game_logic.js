function moveResolution(ordersArray){
  ordersArray.forEach( order => {
    debugger;
    if ((order.type === "Move" || order.type === "Hold") && !( order.conflictOutcome == "neutral" || order.conflictOutcome == "loser"))
    order.unit.coast = order.coast
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
  let div = document.querySelector('#moves')
  let fraceUl = document.createElement('ul')
  let britianUl = document.createElement('ul')
  let germanyUl = document.createElement('ul')
  let italyUl = document.createElement('ul')
  let austriaUl = document.createElement('ul')
  let russiaUl = document.createElement('ul')
  let turkeyUl = document.createElement('ul')

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
  debugger;
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
      order.message = `${order.unit.findOwner().name} ${order.unit.type} in ${order.unit.location.name} has moved to ${order.destination.name}`
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

function nextStep() {
  var data = document.querySelector('#info_text')
  data.innerText = "There are no conflicts. Checkout the order logs to see all the moves."
}
