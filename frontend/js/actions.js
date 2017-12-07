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
  document.querySelector("#info_text").innerHTML = "";
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
