const turn = document.getElementById("turn")
const phase = document.getElementById("phase")
const timer = document.getElementById("timer")
// const timerToggleButton = document.getElementById("timer_toggle")
const gameMap = document.getElementById("map")
const orders = document.getElementById("orders");
const coastSelectionButtons = document.getElementById("coast_selection_buttons")
let inputMode = "normal"
let currentTimer;

let orderStore = [];

const users = {
  u1: new User("user1"),
  u2: new User("user2"),
  u3: new User("user3"),
  u4: new User("user4"),
  u5: new User("user5"),
  u6: new User("user6"),
  u7: new User("user7")
};


const game = new Game(1, "test game", new Turn(
  "Spring", 1901, "Diplomatic Phase"
), true);
