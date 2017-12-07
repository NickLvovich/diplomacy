class User {
  constructor(username) {
    this.username = username
  }
}

class Game {
  constructor( id, name, currentTurn, active) {
    this.id
    this.name = name
    this.currentTurn = currentTurn
    this.active = active
  }
}

class Turn {
  constructor(season, year, phase) {
    this.season = season
    this.year = year
    this.phase = phase
  }
}

class Order {
  constructor(turn, type, unit, currentLoc, destination, coast) {
    this.turn = turn
    this.type = type
    this.unit = unit
    this.currentLoc = currentLoc
    this.destination = destination
    this.support = 0
    this.coast = coast
  }
}

class Country {
  constructor(id, game, user, homeSupplyCenters, territories, units, name, possessive) {
    this.id = id
    this.game = game
    this.user = user
    this.homeSupplyCenters = homeSupplyCenters
    this.territories = territories
    this.units = units
    this.name = name
    this.possessive = possessive
  }
}

class Territory {
  constructor(name, abbreviation, type, supplyCenter, landNeighbors, seaNeighbors, coordinates) {
    this.name = name
    this.abbreviation = abbreviation
    this.type = type
    this.supplyCenter = supplyCenter
    this.landNeighbors = landNeighbors
    this.seaNeighbors = seaNeighbors
    this.coordinates = coordinates
  }

  findOwner() {
    for (let countryKey of Object.keys(countries)) {
      const result = countries[countryKey].territories.find(function(territory) {
        return territory === this;
      }, this);
      if (result) {
        return countryKey;
      }
    }
  }

  findOccupied() {
    for (let countryKey of Object.keys(countries)) {
      const result = countries[countryKey].units.find(function (unit) {
        return unit.location === this;
      }, this);
      if (result) {
        return {
          type: result.type,
          country: countryKey,
          coast: result.coast
        }
      }
    }
  }

  findUnit() {
    for (let countryKey of Object.keys(countries)) {
      const result = countries[countryKey].units.find(function (unit) {
        return unit.location === this;
      }, this);
      if (result) {
        return result;
      }
    }
  }

  findRelevantNeighbors() {
    if (this.findOccupied().type === "army") {
      return this.landNeighbors
    } else if (this.findOccupied().type === "fleet") {
      if (this.findOccupied().coast) {
        return this.seaNeighbors[this.findOccupied().coast]
      } else {
        return this.seaNeighbors.all;
      }
    }
  }
}

class Unit {
  constructor(id, type, location, coast) {
    this.id = id
    this.type = type
    this.location = location
    this.coast = coast
  }

  findOwner() {
    for (let countryKey of Object.keys(countries)) {
      const result = countries[countryKey].units.find(function (unit) {
        return unit.id === this.id;
      }, this);
      if (result) {
        return countries[countryKey];
      }
    }
  }

  findWhereItCanMove() {
    let possibleLocations = []
    if (this.type === "army") {
      possibleLocations = [...this.location.landNeighbors]
      if (this.location.seaNeighbors) {
        for (let coast of Object.keys(this.location.seaNeighbors)) {
          for (let abbr of this.location.seaNeighbors[coast]) {
            let parsedAbbr;
            /_/.test(abbr) ? parsedAbbr = abbr.split("_")[0] : parsedAbbr = abbr;
            const territory = territories[parsedAbbr]
            if (territory.type === "water" && territory.findOccupied() && !possibleLocations.includes(parsedAbbr)) {
              possibleLocations.push(parsedAbbr);
            }
          }
        }
      }
    } else if (this.type === "fleet") {
      if (this.coast) {
        possibleLocations = [...this.location.seaNeighbors[this.coast]]
      } else {
        possibleLocations = [...this.location.seaNeighbors.all]
      }
    }
    return possibleLocations;
  }
}

class Timer {
  constructor(minutes, seconds = 0) {
    this.minutes = minutes
    this.seconds = seconds + 1
    this.active = true;
    this.runTimer();
  }

  runTimer() {
    if (this.active) {
      if (!!this.minutes || !!this.seconds) {
        this.seconds -= 1;
        if (this.seconds >= 10) {
          timer.innerHTML = `${this.minutes}:${this.seconds}`
        } else if (this.seconds < 10 && this.seconds >= 0) {
          timer.innerHTML = `${this.minutes}:0${this.seconds}`
        } else if (this.seconds < 0) {
          this.minutes -= 1
          this.seconds = 59
          timer.innerHTML = `${this.minutes}:${this.seconds}`
        } else {
          this.timer.innerHTML = `${this.minutes}:00`
        }
        setTimeout(() => this.runTimer(), 1000);
      } else {
        alert(`${game.currentTurn.phase} complete!`)
        switchPhase();
      }
    }
  }

  stopTimer() {
    this.active = false;
  }

  timerToggle() {
    if (this.active) {
      this.active = false;
      // timerToggleButton.innerHTML = "Start Timer";
    } else {
      this.active = true;
      // timerToggleButton.innerHTML = "Pause Timer";
      setTimeout(() => this.runTimer(), 1000);
    }
  }

}

// 1100 1050
