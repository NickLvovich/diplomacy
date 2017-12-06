
function verifyMove (fromPosition, toPosition, unitType) {
  if (unitType === "army") {
    return fromPosition.landNeighbors.includes( toPosition ) ? true : false;
  } else {
    return fromPosition.seaNeighbors.all.includes( toPosition ) ? true : false;
  }
}

function createOrder (turnId, fromPosition, toPosition, unit, orderType, turnId, phase, coast){
  if (verifyMove(fromPosition, toPosition, unit.type)) {
    createOrderToAPI(turnId, unit.id, phase, orderType, fromTerritory, toTerritory, coast)
  }
}
