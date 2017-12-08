function checkForOtherTargets() {
  document.querySelector(".targeted") ? clearTargets() : null;
}

function addTargets(terr, target) {
  target.classList.add("targeted")
  terr.findUnit().findWhereItCanMove().forEach(abbr => {
    let parsedAbbr;
    /_/.test(abbr) ? parsedAbbr = abbr.split("_")[0] : parsedAbbr = abbr;
    document.getElementById(parsedAbbr).classList.add("potentialMove");
  });
}

function addTargetsSupport(terr, target) {
  target.classList.add("targeted")
  const potentialSupports = [];
  if (terr.findOccupied().type === "army") {
    for (let abbr of terr.landNeighbors) {
      territories[abbr].findOccupied() && !potentialSupports.includes(abbr) ? potentialSupports.push(abbr) : null;
      for (let abbr2 of territories[abbr].landNeighbors) {
        if (territories[abbr2].findOccupied() &&
          !potentialSupports.includes(abbr2) &&
          abbr2 !== terr.abbreviation &&
          !(territories[abbr].type === "inland" && territories[abbr2].findOccupied().type === "fleet")) {
          potentialSupports.push(abbr2);
        }
      }
      if (territories[abbr].seaNeighbors) {
        for (let coast of Object.keys(territories[abbr].seaNeighbors)) {
          for (let abbr2 of territories[abbr].seaNeighbors[coast]) {
            let item;
            /_/.test(abbr2) ? item = abbr2.split("_")[0] : item = abbr2;
            if (territories[item].findOccupied() &&
              !potentialSupports.includes(item) &&
              item !== terr.abbreviation) {
              potentialSupports.push(item);
            }
          }
        }
      }
    }
  } else if (terr.findOccupied().type === "fleet") {
    if (terr.findOccupied().coast) {
      for (let abbr of terr.seaNeighbors[terr.findOccupied().coast]) {
        territories[abbr].findOccupied() ? potentialSupports.push(abbr) : null;
        for (let abbr2 of territories[abbr].landNeighbors) {
          if (territories[abbr2].findOccupied() &&
            !potentialSupports.includes(abbr2) &&
            abbr2 !== terr.abbreviation) {
            potentialSupports.push(abbr2);
          }
        }
        if (territories[abbr].seaNeighbors) {
          for (let coast of Object.keys(territories[abbr].seaNeighbors)) {
            for (let abbr2 of territories[abbr].seaNeighbors[coast]) {
              let item;
              /_/.test(abbr2) ? item = abbr2.split("_")[0] : item = abbr2;
              if (territories[item].findOccupied() &&
                !potentialSupports.includes(item) &&
                item !== terr.abbreviation) {
                potentialSupports.push(item);
              }
            }
          }
        }
      }
    } else {
      for (let abbr of terr.seaNeighbors.all) {
        let parsedAbbr;
        /_/.test(abbr) ? parsedAbbr = abbr.split("_")[0] : parsedAbbr = abbr;
        if (territories[parsedAbbr].findOccupied() && !potentialSupports.includes(parsedAbbr)) {
          potentialSupports.push(parsedAbbr);
        }
        if (territories[parsedAbbr].type === "coastal") {
          for (let abbr2 of territories[parsedAbbr].landNeighbors) {
            if (territories[abbr2].findOccupied() &&
              !potentialSupports.includes(abbr2) &&
              abbr2 !== terr.abbreviation) {
              potentialSupports.push(abbr2);
            }
          }
        }
        if (territories[parsedAbbr].seaNeighbors) {
          for (let coast of Object.keys(territories[parsedAbbr].seaNeighbors)) {
            for (let abbr2 of territories[parsedAbbr].seaNeighbors[coast]) {
              let item;
              /_/.test(abbr2) ? item = abbr2.split("_")[0] : item = abbr2;
              if (territories[item].findOccupied() &&
                !potentialSupports.includes(item) &&
                item !== terr.abbreviation) {
                if (territories[abbr2].findOccupied().type === "army" && territories[parsedAbbr].type === "water") {
                  null
                } else {
                  potentialSupports.push(item);
                }
              }
            }
          }
        }
      }
    }
  }
  potentialSupports.forEach(abbr => {
    document.getElementById(abbr).classList.add("potentialMove");
  })
}

function supportStep2(terr, target) {
  Object.keys(document.getElementsByClassName("potentialMove")).forEach(abbr => {
    if (document.getElementById(abbr)) {
      document.getElementById(abbr).classList.remove("potentialMove");
    }
  })
  target.classList.add("targeted2")
  // find all common territories
  const terr2 = territories[document.querySelector(".targeted").id];
  const common = []
  if (terr.findOccupied().type === "army") {
    for (let n of terr.landNeighbors) {
      if (terr2.findOccupied().type === "army") {
        for (let n2 of terr2.landNeighbors) {
          n === n2 ? common.push(n) : null;
        }
      } else if (terr2.findOccupied().type === "fleet") {
        if (terr2.findOccupied().coast) {
          for (let n2 of terr2.seaNeighbors[terr2.findOccupied().coast]) {
            n === n2 ? common.push(n) : null;
          }
        } else {
          for (let n2 of terr2.seaNeighbors.all) {
            let parsedAbbr;
            /_/.test(n2) ? parsedAbbr = n2.split("_")[0] : parsedAbbr = n2;
            n === parsedAbbr ? common.push(n) : null;
          }
        }
      }
    }
  } else if (terr.findOccupied().type === "fleet") {
    if (terr.findOccupied().coast) {
      for (let n of terr.seaNeighbors[terr.findOccupied().coast]) {
        if (terr2.findOccupied().type === "army") {
          for (let n2 of terr2.landNeighbors) {
            n === n2 ? common.push(n) : null;
          }
        } else if (terr2.findOccupied().type === "fleet") {
          if (terr2.findOccupied().coast) {
            for (let n2 of terr2.seaNeighbors[terr.findOccupied().coast]) {
              n === n2 ? common.push(n) : null;
            }
          } else {
            for (let n2 of terr2.seaNeighbors.all) {
              n === n2 ? common.push(n) : null;
            }
          }
        }
      }
    } else {
      for (let n of terr.seaNeighbors.all) {
        if (terr2.findOccupied().type === "army") {
          for (let n2 of terr2.landNeighbors) {
            n === n2 ? common.push(n) : null;
          }
        } else if (terr2.findOccupied().type === "fleet") {
          if (terr2.findOccupied().coast) {
            for (let n2 of terr2.seaNeighbors[terr.findOccupied().coast]) {
              n === n2 ? common.push(n) : null;
            }
          } else {
            for (let n2 of terr2.seaNeighbors.all) {
              n === n2 ? common.push(n) : null;
            }
          }
        }
      }
    }
  }
  for (let abbr of common) {
    document.getElementById(abbr).classList.add("potentialMove");
  }
}

function clearTargets() {
  inputMode = "normal";
  infoText.innerHTML = "Select a unit to begin issuing orders";
  coastSelectionButtons.innerHTML = "";
  Object.keys(document.getElementsByClassName("targeted")).forEach(abbr => {
    if (document.getElementById(abbr)) {
      document.getElementById(abbr).classList.remove("targeted");
    }
  })
  Object.keys(document.getElementsByClassName("potentialMove")).forEach(abbr => {
    if (document.getElementById(abbr)) {
      document.getElementById(abbr).classList.remove("potentialMove");
    }
  })
  Object.keys(document.getElementsByClassName("targeted2")).forEach(abbr => {
    if (document.getElementById(abbr)) {
      document.getElementById(abbr).classList.remove("targeted2");
    }
  })
}

function createOrReplaceOrder(turn, type, unit, currentLoc, destination, coast) {
  const orderIndex = orderStore.findIndex(order => {
    return order.unit.location === unit.location
  }, unit)
  if (orderIndex >= 0) {
    orderStore.splice(orderIndex, 1, new Order(turn, type, unit, currentLoc, destination, coast))
  } else {
    orderStore.push(new Order(turn, type, unit, currentLoc, destination, coast))
  }
  updateOrderDisplay();
}

function updateOrderDisplay() {
  let listItems = "";
  for (let order of orderStore) {
    if (order.type === "Hold") {
      listItems += `
      <tr class="order">
        <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
        <td>${order.unit.type[0].toUpperCase()} - ${order.unit.location.name}</td>
        <td>Hold</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>`
    } else if (order.type === "Move") {
      let item;
      if (order.coast) {
        item = `
        <tr class="order">
          <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
          <td>${order.unit.type[0].toUpperCase()} - ${order.unit.location.name}</td>
          <td>Move</td>
          <td>-</td>
          <td>${order.currentLoc.name}</td>
          <td>${order.destination.name} ${order.coast}</td>
        </tr>`
      } else {
        item = `
        <tr class="order">
          <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
          <td>${order.unit.type[0].toUpperCase()} - ${order.unit.location.name}</td>
          <td>Move</td>
          <td>-</td>
          <td>${order.currentLoc.name}</td>
          <td>${order.destination.name}</td>
        </tr>`
      }
      listItems += item;
    } else if (order.type === "Support" && order.currentLoc !== order.destination) {
      listItems += `
      <tr class="order">
        <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
        <td>${order.unit.type[0].toUpperCase()} - ${order.unit.location.name}</td>
        <td>Support</td>
        <td>${order.currentLoc.findUnit().findOwner().possessive} ${order.currentLoc.findOccupied().type[0].toUpperCase()}</td>
        <td>${order.currentLoc.name}</td>
        <td>${order.destination.name}</td>
      </tr>`
    } else if (order.type === "Support" && order.currentLoc === order.destination) {
      listItems += `
      <tr class="order">
        <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
        <td>${order.unit.type[0].toUpperCase()} - ${order.unit.location.name}</td>
        <td>Support</td>
        <td>${order.currentLoc.findUnit().findOwner().possessive} ${order.currentLoc.findOccupied().type[0].toUpperCase()}</td>
        <td>${order.currentLoc.name}</td>
        <td>-</td>
      </tr>`
    } else if (order.type === "Convoy") {
      listItems += `
      <tr class="order">
        <td><img src="assets/flag_icons/png/${order.unit.findOwner().name}.png" style="height: 30px;"/></td>
        <td>${order.unit.type[0].toUpperCase()} - ${order.unit.location.name}</td>
        <td>Convoy</td>
        <td>${order.currentLoc.findUnit().findOwner().possessive} ${order.currentLoc.findOccupied().type[0].toUpperCase()}</td>
        <td>${order.currentLoc.name}</td>
        <td>${order.destination.name}</td>
      </tr>`
    }
  }
  orders.innerHTML = listItems;
}

function commenceConvoy(e) {
  // inputMode = "convoy"
  Object.keys(document.getElementsByClassName("potentialMove")).forEach(abbr => {
    if (document.getElementById(abbr)) {
      document.getElementById(abbr).classList.remove("potentialMove");
    }
  })
  e.target.classList.add("targeted2");
  for (let abbr of territories[e.target.id].seaNeighbors.all) {
    let parsedAbbr;
    /_/.test(abbr) ? parsedAbbr = abbr.split("_")[0] : parsedAbbr = abbr;
    if ((territories[parsedAbbr].type === "coastal" && parsedAbbr !== document.querySelector(".targeted").id) ||
      (territories[parsedAbbr].type === "water" && territories[parsedAbbr].findOccupied() &&
        !document.querySelector(`#${parsedAbbr}`).classList.contains("targeted2"))) {
      document.getElementById(parsedAbbr).classList.add("potentialMove");
    }
  }
}

function gainOrLoseUnits() {
  gainingCountries = {};
  losingCountries = {};
  // figure out which countries are losing/gaining units
  for (let countryKey of Object.keys(countries)) {
    if (countryKey !== "Neutral") {
      const supplyCenterCount = countries[countryKey].countSupplyCenters();
      const numberOfUnits = countries[countryKey].units.length
      if (supplyCenterCount > numberOfUnits) {
        gainingCountries[countryKey] = supplyCenterCount - numberOfUnits
      } else if (supplyCenterCount < numberOfUnits) {
        losingCountries[countryKey] = numberOfUnits - supplyCenterCount
      }
    }
  }
  // go through the keys in both those objects, highlight territories appropriately
  for (let countryKey of Object.keys(gainingCountries)) {
    // check home supply centers
    for (let homeSupplyCenter of countries[countryKey].homeSupplyCenters) {
      // if it still belongs to the original owner and isn't occupied, color it
      if (homeSupplyCenter.findOwner() === countryKey && !homeSupplyCenter.findOccupied()) {
        const regionPath = document.getElementById(homeSupplyCenter.abbreviation);
        regionPath.classList.add("targeted")
      }
    }
  }
  for (let countryKey of Object.keys(losingCountries)) {
    for (let unit of countries[countryKey].units) {
      const regionPath = document.getElementById(unit.location.abbreviation);
      regionPath.classList.add("potentialMove");
    }
  }
  // add event listeners for both kinds of territories
  addEventListenersForGainingAndLosingUnitsPhase();
}

function addEventListenersForGainingAndLosingUnitsPhase() {
  if (document.querySelector(".targeted") || document.querySelector(".potentialMove")) {
    infoText.innerHTML = "Select a yellow territory to create a new unit, or a red territory to delete a unit" 
  }
  for (let path of document.querySelectorAll(".targeted")) {
    path.addEventListener("click", e => {
      // check if coastal, if so prompt for type
      if (territories[e.target.id].type === "coastal") {
        infoText.innerHTML = "Do you want to build an army or a fleet there?"
        // not sure why, but this passes e.target to the functions instead of e.target.id.
        buttons.innerHTML = `
        <button onclick="createUnit('army', ${e.target.id})">Army</button>
        <button onclick="createUnit('fleet', ${e.target.id})">Fleet</button>`
      } else {
        createUnit("army", e.target, gainingCountries)
      }
    })
  }
  for (let path of document.querySelectorAll(".potentialMove")) {
    path.addEventListener("click", e => {
      // remove unit from country's array
      const unit = territories[e.target.id].findUnit();
      const unitOwner = unit.findOwner().name
      const unitIndex = unit.findOwner().units.findIndex(unit2 => unit2 === unit)
      unit.findOwner().units.splice(unitIndex, 1)
      // delete unit from board
      document.getElementById(`unit_${unit.id}`).remove()
      // remove class from territory
      e.target.classList.remove("potentialMove");
      losingCountries[unitOwner] -= 1
      if (losingCountries[unitOwner] === 0) {
        for (let unit of countries[unitOwner].units) {
          const path = document.getElementById(unit.location.abbreviation)
          path.classList.contains("potentialMove") ? path.classList.remove("potentialMove") : null
        }
      }
    })
  }
}

function createUnit(type, target) {
  // add unit to country's array
  let newUnit;
  for (let countryKey of Object.keys(countries)) {
    // don't look at neutral
    if (countryKey !== "Neutral") {
      if (countries[countryKey].homeSupplyCenters.find(terr => terr.abbreviation === target.id)) {
        if (target.id === "Stp" && type === "fleet") {
          // add ID here
          newUnit = new Unit(++unitIndex, fleet, territories[target.id], "SC")
          countries.Russia.units.push(newUnit)
        } else {
          // and here
          newUnit = new Unit(++unitIndex, type, territories[target.id], null)
          countries[countryKey].units.push(newUnit)
        }
      }
    }   
  }
  // render unit on game board
  if (newUnit.type === "fleet") {
    if (!newUnit.coast) {
      const x = newUnit.location.coordinates.main.x
      const y = newUnit.location.coordinates.main.y
      gameMap.innerHTML += fleetSVG(x, y, newUnit.findOwner().name, newUnit.id);
    } else {
      const x = newUnit.location.coordinates[newUnit.coast].x
      const y = newUnit.location.coordinates[newUnit.coast].y
      gameMap.innerHTML += fleetSVG(x, y, newUnit.findOwner().name, newUnit.id);
    }
  } else if (newUnit.type === "army") {
    const x = newUnit.location.coordinates.main.x
    const y = newUnit.location.coordinates.main.y
    gameMap.innerHTML += armySVG(x, y, newUnit.findOwner().name, newUnit.id);
  }
  // remove highlighting for target territory
  for (let newTarget of document.querySelectorAll(".targeted")) {
    newTarget.id === target.id ? newTarget.classList.remove("targeted") : null
  }
  // check if country has any more builds. If not, remove highlighting from the remainder of their home territories
  gainingCountries[newUnit.findOwner().name] -= 1;
  if (gainingCountries[newUnit.findOwner().name] === 0) {
    for (let homeSupplyCenter of countries[newUnit.findOwner().name].homeSupplyCenters) {
      const path = document.getElementById(homeSupplyCenter.abbreviation)
      path.classList.contains("targeted") ? path.classList.remove("targeted") : null
    }
  }
  // reset info text
  infoText.innerHTML = "";
  buttons.innerHTML = "";
  addEventListenersForGainingAndLosingUnitsPhase();
}