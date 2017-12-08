let occupiedTerritories = []
  for (let countryKey of Object.keys(countries)) {
    for (let unit of countries[countryKey].units) {
      occupiedTerritories.push(unit.location.abbreviation)
  }
}

function deleteUnitsThatCannotRetreat(retreatArray){
  retreatArray.forEach(unit => {
    if (unit.type === "army"){
      if (landNeighborsOccupied(unit.location.landNeighbors)){
        country = unit.findOwner()
        console.log(`${country.name} lost a unit in ${unit.location.name}`)
        country.units = country.units.filter(countryUnit => countryUnit != unit)
        let index = retreatArray.indexOf(unit)
        retreatArray.splice(index, 1)
    }
  }
    else {
      if (unit.type === "fleet"){
        if (seaNeighborsOccupied(unit.location.seaNeighbors)){
          country = unit.findOwner()
          console.log(`${country.name} lost a unit in ${unit.location.name}`)
          country.units = country.units.filter(countryUnit => countryUnit != unit)
          let index = retreatArray.indexOf(unit)
          retreatArray.splice(index, 1)
          }
        }
      }
    })
  }

function landNeighborsOccupied(landNeighbors){
  occupationArray = []
  landNeighbors.forEach(territory =>{
    occupationArray.push(occupiedTerritories.includes(territory))
})
  if (occupationArray.includes(false)){
    return false
  }
  else {
    return true
  }
}

function seaNeighborsOccupied(seaNeighbors){
  neighborsNested = Object.values(seaNeighbors)
  neighborsArray = [].concat.apply([], neighborsNested)
  occupationArray = []
  neighborsArray.forEach(territory =>{
    occupationArray.push(occupiedTerritories.includes(territory))
})
  if (occupationArray.includes(false)){
    return false
  }
  else {
    return true
  }
}

  function findAllUnitsLocations(){
    return allUnitsArray.map(unit =>{
      return unit.location.abbreviation
    })
  }
