console.log("Connected");

let cross = "X";
let zero = "O";
const winningCombo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let turn;
let boxes;

startGame();

function startGame() {
  turn = true;
  boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((box) => {
    box.addEventListener("click", handleClick,{once: true});
  });
}

// By default player 1 starts the game when turn is true
function handleClick(e) {
  //for player1
  if (turn) {
    e.target.innerText = cross;
    e.target.classList.add("Player-1");
    checkWinningStatus("Player-1");
  }
  //for player2
  else {
    e.target.innerText = zero;
    e.target.classList.add("Player-2");
    checkWinningStatus("Player-2");
  }
  turn = !turn;
  drawCheck();
}

function checkWinningStatus(player) {
  let list = document.getElementsByClassName(player);
  let position = [];
  Array.from(list).forEach((element) => {
    let id = Number(element.id);
    position.push(id);
  });
  winningCombo.forEach((arr) => {
    let flag = true;
    arr.forEach((element) => {
      if (!position.includes(element)) {
        flag = false;
      }
    });
    if (flag) {
      showResult(`${player} has won. Game will restart in 10s`);
    }
  });
}

function drawCheck() {
  let boxes = document.querySelectorAll('.box');
  let flag = true;
  let arr = Array.from(boxes);
  for(let elem of arr) {
    if(!elem.classList.contains('Player-1') && !elem.classList.contains('Player-2')){
      flag = false
      break;
    }
  }
  if(flag){
    showResult('Its a draw. Game will restart in 10s');
  }
}

function showResult(text) {
  document.querySelector(".show-winner").innerText = text;
  resetBtn.disabled = true;
  setTimeout(() => {
    endGame();
  }, 10000);
}

// adding event listener to the reset button
let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", endGame);

function endGame() {
  Array.from(boxes).forEach((box) => {
    box.classList.remove("Player-1","Player-2");
    box.innerText = "";
    box.removeEventListener('click',handleClick);
  });
  document.querySelector(".show-winner").innerText = "";
  resetBtn.disabled = false;
  startGame();
}


