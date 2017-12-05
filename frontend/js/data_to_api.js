function createGame(gameName) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({name: gameName})
  }
  fetch('http://localhost:3000/games/', obj).then(res => res.json())
}

function createUser(userName) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({username: userName})
  }
  fetch('http://localhost:3000/users/', obj).then(res => res.json())
}

function createCountry(countryName, userId, gameId) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({name: countryName, user_id: userId, game_id: gameId})
  }
  fetch('http://localhost:3000/countries', obj).then(res => res.json())
}

function createUnit(unitType,territory, countryId, coast) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({unit_type: unitType, territory: territory, country_id: countryId, coast: coast})
  }
  fetch('http://localhost:3000/units', obj).then(res => res.json())
}

function createOrder(turnId, unitId, phase, orderType, fromTerritory, toTerritory, coast) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({turn_id: turnId,
                            unit_id: unitId,
                            phase: phase,
                            order_type: orderType,
                            from_territory: fromTerritory,
                            to_territory: toTerritory,
                            coast: coast})
  }
  fetch('http://localhost:3000/orders', obj).then(res => res.json())
}

function createTurn(season, year, gameId) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({season: season, year: year, game_id: gameId})
  }
  fetch('http://localhost:3000/turns', obj).then(res => res.json())
}

function editUnit(unitId, unitType, territory, countryId, coast){
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "put",
      body: JSON.stringify({unit_type: unitType, territory: territory, country_id: countryId, coast: coast})
  }
  let url = 'http://localhost:3000/units/' + unitId + "/"
  fetch(url, obj).then(res => res.json())
}

function deleteUnit(unitId) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "delete"
  }
  let url = 'http://localhost:3000/units/' + unitId + "/"
  fetch(url, obj)
}
