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

function createOrReplaceOrder(turn, type, unit, currentLoc, destination) {
  const orderIndex = orderStore.findIndex(order => {
    return order.unit.location === unit.location
  }, unit)
  if (orderIndex >= 0) {
    orderStore.splice(orderIndex, 1, new Order(turn, type, unit, currentLoc, destination))
  } else {
    orderStore.push(new Order(turn, type, unit, currentLoc, destination))
  }
  updateOrderDisplay();
}

function updateOrderDisplay() {
  let listItems = ""
  for (let order of orderStore) {
    if (order.type === "Hold") {
      listItems += `<li>${order.unit.findOwner().possessive} ${order.unit.type} in ${order.unit.location.name} holds</li>`
    } else if (order.type === "Move") {
      listItems += `<li>${order.unit.findOwner().possessive} ${order.unit.type} in ${order.unit.location.name} moves to ${order.destination.name}</li>`
    } else if (order.type === "Support" && order.currentLoc !== order.destination) {
      listItems += `<li>${order.unit.findOwner().possessive} ${order.unit.type} in ${order.unit.location.name} supports ${order.currentLoc.name} to ${order.destination.name}</li>`
    } else if (order.type === "Support" && order.currentLoc === order.destination) {
      listItems += `<li>${order.unit.findOwner().possessive} ${order.unit.type} in ${order.unit.location.name} supports ${order.currentLoc.name} holding</li>`
    }
  }
  orders.innerHTML = listItems;
}