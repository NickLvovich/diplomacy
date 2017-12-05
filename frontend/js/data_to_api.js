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

function createUnit(unitType, coast, territory, countryId) {
  let obj = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({unit_type: unitType, coast: coast, territory: territory, country_id: countryId})
  }
  fetch('http://localhost:3000/units', obj).then(res => res.json())
}
