function updateDisplay() {
  // timerToggleButton.innerHTML = "Pause Timer";
  phase.innerHTML = game.currentTurn.phase;
  turn.innerHTML = `${game.currentTurn.season} ${game.currentTurn.year}`
}

function play() {
  switch (game.currentTurn.phase) {
    case "Diplomatic Phase":
      infoText.innerHTML = "Select a unit to begin issuing orders"
      addUnits();
      game.currentTurn.year === 1901 && game.currentTurn.season === "Spring" ? colorTerritories() : null
      updateDisplay();
      addEventListeners();
      currentTimer = new Timer(15);
      break;
    case "Order Writing Phase":
      infoText.innerHTML = "Select a unit to begin issuing orders"
      updateDisplay();
      currentTimer = new Timer(5);
      break;
    case "Order Resolution Phase":
      orderResolution(orderStore);
      printOrderMessages(orderStore);
      moveResolution(orderStore);
      retreatingUnits = filterForRetreats(orderStore)
      deleteUnitsThatCannotRetreat(retreatingUnits)
      if (retreatingUnits.length > 0) {
        addEventListeners();
      }
      addUnits();
      clearOrderDiplay()
      updateDisplay();
      currentTimer = new Timer(5);
      orderStore = []
      toggleModal()
      break;
    case "Retreat and Disbanding Phase":
      infoText.innerHTML = "Select a displaced unit to enter a retreat order"
      updateDisplay();
      currentTimer = new Timer(5);
      break;
    case "Gaining and Losing Units Phase":
      addEventListeners();
      updateDisplay();
      colorTerritories();
      gainOrLoseUnits();
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
    for (let unit of countries[countryKey].units) {
      if (unit.location.findOwner() !== countryKey && unit.location.type !== "water") {
        try {
          const a = countries[unit.location.findOwner()].territories.findIndex(terr => {
            return terr === unit.location;
          })
          const b = countries[unit.location.findOwner()].territories.splice(a, 1)
          countries[countryKey].territories.push(b[0]);
        } catch (err) {
          debugger;
        }
      }
    }
  })
  Object.keys(countries).forEach(countryKey => {
    for (let territory of countries[countryKey].territories) {
      // debugger;
      if (!document.getElementById(territory.abbreviation).classList.contains(countryKey)) {
        const previousOwner = document.getElementById(territory.abbreviation).classList[0]
        document.getElementById(territory.abbreviation).classList.remove(previousOwner)
        document.getElementById(territory.abbreviation).classList.add(countryKey);
      }
    }
  })
}

function clearOrderDiplay() {
  var orders = document.querySelectorAll('.order')
  orders.forEach(x => x.remove())
}

function addUnits() {
  let oldData = [...document.querySelectorAll(".fleet"), ...document.querySelectorAll(".army")]
  oldData.forEach( x => x.remove())
  Object.keys(countries).forEach(countryKey => {
    for (let unit of countries[countryKey].units) {
      if (unit.type === "fleet") {
        if (!unit.coast) {
          const x = unit.location.coordinates.main.x
          const y = unit.location.coordinates.main.y
          gameMap.innerHTML += fleetSVG(x, y, countryKey, unit.id);
        } else {
          const x = unit.location.coordinates[unit.coast].x
          const y = unit.location.coordinates[unit.coast].y
          gameMap.innerHTML += fleetSVG(x, y, countryKey, unit.id);
        }
      } else if (unit.type === "army") {
        const x = unit.location.coordinates.main.x
        const y = unit.location.coordinates.main.y
        gameMap.innerHTML += armySVG(x, y, countryKey, unit.id);
      }
    }
  })
}

function addEventListeners() {
  document.querySelectorAll("#map > path").forEach(path => {
    path.addEventListener("mouseover", e => {
      const terr = territories[e.target.id]
      let owner = "Water"
      if (terr.type === "coastal" || terr.type === "inland") {
        owner = terr.findOwner();
      }
      if (owner === "Water") {
        document.getElementById("territory_description").textContent = `${terr.name} (${terr.abbreviation}) - Water`
      } else {
        document.getElementById("territory_description").textContent = `${terr.name} (${terr.abbreviation}) - ${countries[owner].possessive}`
      }
    })
    path.addEventListener("mouseleave", e => {
      document.getElementById("territory_description").textContent = ""
    })
    path.addEventListener("click", e => {
      const terr = territories[e.target.id]
      const target = e.target
      infoText.innerHTML = "Select where you want the unit to move";
      if (inputMode === "normal") {
        if (target === document.querySelector(".targeted")) {
          const info = territories[document.querySelector(".targeted").id]
          createOrReplaceOrder(game.currentTurn, "Hold", terr.findUnit(), terr, terr)
          clearTargets();
        } else if (target.classList.contains("potentialMove")) {
          const fromTerr = territories[document.querySelector(".targeted").id]
          const toTerr = territories[target.id]
          if (fromTerr.findOccupied().type === "army" && toTerr.type === "water") {
            commenceConvoy(e);
          } else {
            if (toTerr.seaNeighbors &&
              Object.keys(toTerr.seaNeighbors).length > 1 &&
              territories[document.querySelector(".targeted").id].findOccupied().type === "fleet") {
              const possibleCoasts = fromTerr.seaNeighbors.all.reduce((arr, abbr) => {
                if (abbr.match(/_(.{2})$/)) {
                  arr.push(abbr.match(/_(.{2})$/)[1])
                }
                return arr
              }, [])
              if (possibleCoasts.length > 1) {
                infoText.innerHTML = "Which coast should the unit move to?";
                coastSelectionButtons.innerHTML = `
              <button class="coast_selection">${possibleCoasts[0]}</button>
              <button class="coast_selection">${possibleCoasts[1]}</button>`
                for (let button of document.querySelectorAll(".coast_selection")) {
                  button.addEventListener("click", e => {
                    createOrReplaceOrder(game.currentTurn, "Move", fromTerr.findUnit(), fromTerr, toTerr, e.target.textContent)
                    clearTargets();
                  })
                }
              } else {
                createOrReplaceOrder(game.currentTurn, "Move", fromTerr.findUnit(), fromTerr, toTerr, possibleCoasts[0])
                clearTargets();
              }
            } else {

              createOrReplaceOrder(game.currentTurn, "Move", fromTerr.findUnit(), fromTerr, toTerr)
              for (let convoyPath of document.querySelectorAll(".targeted2")) {
                createOrReplaceOrder(game.currentTurn, "Convoy", territories[convoyPath.id].findUnit(), fromTerr, toTerr)
              }
              clearTargets();
            }
          }
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
          infoText.innerHTML = "Select where you want the supported unit to move";
          supportStep2(terr, target);
        } else if (target.classList.contains("potentialMove") && document.querySelector(".targeted2")) {
          const fromInfo = territories[document.querySelector(".targeted").id]
          const fromInfo2 = territories[document.querySelector(".targeted2").id]
          const toInfo = territories[target.id]
          createOrReplaceOrder(game.currentTurn, "Support", fromInfo.findUnit(), fromInfo2, toInfo)
          clearTargets();
        } else if (target.classList.contains("targeted2")) {
          if (territories[document.querySelector(".targeted").id].findRelevantNeighbors().includes(target.id)) {
            const fromInfo = territories[document.querySelector(".targeted").id]
            const toInfo = territories[target.id]
            createOrReplaceOrder(game.currentTurn, "Support", fromInfo.findUnit(), toInfo, toInfo)
            clearTargets();
          }
        }
      }
    })
  })
  document.addEventListener("keydown", e => {
    e.key === "Escape" ? clearTargets() : null;
  })
  document.addEventListener("keydown", e => {
    e.key === "s" ? triggerSupportMode() : null;
  })
}

function triggerSupportMode() {
  // If no unit is selected, prompt the user to select a unit
  if (!document.querySelector(".targeted")) {
    infoText.innerHTML = "Please select which unit should do the supporting";
  } else if (document.querySelector(".targeted")) {
    infoText.innerHTML = "Please select which unit you'd like the selected unit to support";
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
    const target = document.querySelector(".targeted")
    const terr = territories[target.id]
    addTargetsSupport(terr, target)
  }
  inputMode = "support";
}

$('.fixed-action-btn').floatingActionButton({
  direction: 'top', // Direction menu comes out
  hoverEnabled: true, // Hover enabled
  toolbarEnabled: false // Toolbar transition enabled
});

function toggleModal() {
  let elem = document.querySelector('.modal');
  let instance = new M.Modal(elem)
  instance.open();
}
function toggleMoves() {
  let elem = document.querySelector('#modal2');
  let instance = new M.Modal(elem)
  instance.open();
}

function displayDisplacedUnits(units){
  let displacedDiv = document.querySelector('.displaced')
  let ul = document.createElement('ul')
  units.forEach(unit => {
    let li = document.createElement('li')
    li.innerText = `${unit.type.charAt(0).toUpperCase()}${unit.type.slice(1, unit.type.length)} in ${unit.location.name} has been displaced.`
    ul.append(li)
  })
  displacedDiv.append(ul)
}
