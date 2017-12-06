function updateDisplay() {
  timerToggleButton.innerHTML = "Pause Timer";
  phase.innerHTML = game.currentTurn.phase;
  turn.innerHTML = `${game.currentTurn.season} ${game.currentTurn.year}`
}

function play() {
  switch (game.currentTurn.phase) {
    case "Diplomatic Phase":
      game.currentTurn.season === "Spring" ? colorTerritories() : null  
      addUnits();
      updateDisplay();
      currentTimer = new Timer(15);
      break;
    case "Order Writing Phase":
      updateDisplay();
      currentTimer = new Timer(5);
      break;
    case "Order Resolution Phase":
      updateDisplay();
      currentTimer = new Timer(5);
      break;
    case "Retreat and Disbanding Phase":
      updateDisplay();
      currentTimer = new Timer(5);
      break;
    case "Gaining and Losing Units Phase":
      updateDisplay();
      currentTimer = new Timer(5);
      break;
    default:
      alert("Something went wrong");
      break;
  }
}

function switchPhase() {
  currentTimer.stopTimer();
  switch (game.currentTurn.phase) {
    case "Diplomatic Phase": 
      game.currentTurn.phase = "Order Writing Phase";
      break;
    case "Order Writing Phase":
      game.currentTurn.phase = "Order Resolution Phase";
      break;
    case "Order Resolution Phase":
      game.currentTurn.phase = "Retreat and Disbanding Phase"
      break;
    case "Retreat and Disbanding Phase":
      switch (game.currentTurn.season) {
        case ("Spring"):
          game.currentTurn.phase = "Diplomatic Phase";
          game.currentTurn.season = "Fall"
          game.currentTurn.year += 1;
          break;
        case ("Fall"):
          game.currentTurn.phase = "Gaining and Losing Units Phase"
          break;
        default: 
          alert("Something went wrong");
          break;
      }  
      break;
    case "Gaining and Losing Units Phase":
      game.currentTurn.phase = "Diplomatic Phase";
      game.currentTurn.season = "Spring"
      game.currentTurn.year += 1;
      break;
    default: 
      alert("Something went wrong");
      break;
  }
  play();
}

play();

function colorTerritories() {
  Object.keys(countries).forEach(countryKey => {
    for (let territory of countries[countryKey].territories) {
      document.getElementById(territory.abbreviation).classList.add(countryKey);
    }
  })
}

function addUnits() {
  Object.keys(countries).forEach(countryKey => {
    for (let unit of countries[countryKey].units) {
      if (unit.type === "fleet") {
        if (!unit.coast) {
          const x = unit.location.coordinates.main.x
          const y = unit.location.coordinates.main.y
          gameMap.innerHTML += fleetSVG(x, y, countryKey);
        } else {
          const x = unit.location.coordinates[unit.coast].x
          const y = unit.location.coordinates[unit.coast].y
          gameMap.innerHTML += fleetSVG(x, y, countryKey);
        }     
      } else if (unit.type === "army") {
        const x = unit.location.coordinates.main.x
        const y = unit.location.coordinates.main.y
        gameMap.innerHTML += armySVG(x, y, countryKey);
      }
    }
  })
}

document.addEventListener("DOMContentLoaded", e => {
  document.querySelectorAll("#map > path").forEach(path => {
    path.addEventListener("mouseover", e => {
      const terr = territories[e.target.id]
      let owner = "Water"
      if (terr.type === "coastal" || terr.type === "inland") {
        owner = terr.findOwner();
      }
      if (owner === "Water") {
        document.getElementById("territory_description").textContent = `${terr.name} (${terr.abbreviation}) — Water`
      } else {
        document.getElementById("territory_description").textContent = `${terr.name} (${terr.abbreviation}) — ${countries[owner].possessive}`
      }
    })
    path.addEventListener("mouseleave", e => {
      document.getElementById("territory_description").textContent = ""
    })
    path.addEventListener("click", e => {
      const terr = territories[e.target.id]
      const target = e.target
      if (inputMode === "normal") {
        if (target === document.querySelector(".targeted")) {
          const info = territories[document.querySelector(".targeted").id]
          alert(`${info.findOccupied().type} in ${info.name} holds`)
          clearTargets();
        } else if (target.classList.contains("potentialMove")) {
          const fromInfo = territories[document.querySelector(".targeted").id]
          const toInfo = territories[target.id]
          alert(`${fromInfo.findOccupied().type} in ${fromInfo.name} moves to ${toInfo.name}`);
          clearTargets();
        } else {
          if (terr.findOccupied()) {
            checkForOtherTargets();
            addTargets(terr, target);
          } else {
            clearTargets();
          }
        }
      } else if (inputMode === "support") {
        if (!document.querySelector(".targeted")) {
          addTargetsSupport(terr, target);
        } else if (target.classList.contains("potentialMove") && !document.querySelector(".targeted2")) {
          supportStep2(terr, target);
        } else if (target.classList.contains("potentialMove") && document.querySelector(".targeted2")) {
          const fromInfo = territories[document.querySelector(".targeted").id]
          const fromInfo2 = territories[document.querySelector(".targeted2").id]
          const toInfo = territories[target.id]
          alert(`${fromInfo.findOccupied().type} in ${fromInfo.name} supports ${fromInfo2.findOccupied().type} in ${fromInfo2.name} move to ${toInfo.name}`);
          clearTargets();
        } else if (target.classList.contains("targeted2")) {
          const fromInfo = territories[document.querySelector(".targeted").id]
          const toInfo = territories[target.id]
          alert(`${fromInfo.findOccupied().type} in ${fromInfo.name} supports ${toInfo.findOccupied().type} in ${toInfo.name} holding`);
          clearTargets();
        }
      }      
    })
  })
  document.addEventListener("keydown", e => {
    e.key === "Escape" ? clearTargets() : null;
  })
})

function checkForOtherTargets() {
  document.querySelector(".targeted") ? clearTargets() : null;
}

function addTargets(terr, target) {  
  target.classList.add("targeted")
  if (terr.findOccupied().type === "army") {
    terr.landNeighbors.forEach(abbr => {
      document.getElementById(abbr).classList.add("potentialMove");
    })
  } else if (terr.findOccupied().type === "fleet" && !terr.findOccupied().coast) {
    terr.seaNeighbors.all.forEach(abbr => {
      document.getElementById(abbr).classList.add("potentialMove");
    })
  } else {
    terr.seaNeighbors[terr.findOccupied().coast].forEach(abbr => {
      document.getElementById(abbr).classList.add("potentialMove");
    })
  }
}

function addTargetsSupport(terr, target) {
  target.classList.add("targeted")
  const potentialSupports = [];
  if (terr.findOccupied().type === "army") {
    // find all neighbors of land neighbors
    for (let abbr of terr.landNeighbors) {
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
            n === n2 ? common.push(n) : null;
          }
        }
      }
    }
  }else if (terr.findOccupied().type === "fleet") {
    if (terr.findOccupied().coast) {
      for (let n of terr.seaNeighbors[terr.findOccupied().coast]) {
        for (let n2 of terr2.landNeighbors) {
          n === n2 ? common.push(n) : null;
        }
        if (terr2.seaNeighbors) {
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
        for (let n2 of terr2.landNeighbors) {
          n === n2 ? common.push(n) : null;
        }
        if (terr2.seaNeighbors) {
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
  document.querySelector("#info_text").innerHTML = "";
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

function triggerSupportMode() {
  // If no unit is selected, prompt the user to select a unit
  if (!document.querySelector(".targeted")) {
    document.querySelector("#info_text").innerHTML = "Please select which unit you'd like to give the support order to";
    inputMode = "support";
  }
}