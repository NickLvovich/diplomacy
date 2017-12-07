// Made this a separate file since it will be happening in a different game phase.
// We can probably merge this back into game logic after.


// This is test data. Delete before trying to impliment full functionality.
let retreatArray = [countries.Germany.units[0], countries.Germany.units[1], countries.Germany.units[2]]


let occupiedTerritories = []
  for (let countryKey of Object.keys(countries)) {
    for (let unit of countries[countryKey].units) {
      occupiedTerritories.push(unit.location.abbreviation)
  }
}
//


function deleteUnitsThatCannotRetreat(retreatArray){
  retreatArray.forEach(unit => {
    if (unit.type === "army"){
      if (landNeighborsOccupied(unit.location.landNeighbors)){
        console.log(`Deleting unit in ${unit.location.name}`)
        delete(unit)
    }
  }
    else {
      if (unit.type === "fleet"){
        if (seaNeighborsOccupied(unit.location.seaNeighbors)){
          console.log(`Deleting unit in ${unit.location.name}`)
          delete(unit)
          }
        }
      }
    })
  }

function landNeighborsOccupied(landNeighbors){
  landNeighbors.forEach(territory =>{
  if (!occupiedTerritories.includes(territory))
    return false
  })
}

function seaNeighborsOccupied(seaNeighbors){
  neighborsNested = Object.values(seaNeighbors)
  neighborsArray = [].concat.apply([], neighborsNested)
  neighborsArray.forEach(territory => {
  if (!occupiedTerritories.includes(territory))
    return false
  })
}

  function findAllUnitsLocations(){
    return allUnitsArray.map(unit =>{
      return unit.location.abbreviation
    })
  }
