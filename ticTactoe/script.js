let boxes = document.querySelectorAll(".box");
let result = document.querySelector(".result");
let resetbtn = document.querySelector(".resetgameBtn");
let newbtn = document.querySelector(".newgameBtn");
let countO = document.querySelector(".wincountO");
let countX = document.querySelector(".wincountX");
let counttie = document.querySelector(".tiecount");
let turnO = true;
let gameWon;
let scoreO = localStorage.getItem("O");
if (scoreO === null) {
  scoreO = 0;
} else {
  let a = localStorage.getItem("O");
  scoreO = parseInt(a);
}

let scoreX = localStorage.getItem("X");
if (scoreX === null) {
  scoreX = 0;
} else {
  let b = localStorage.getItem("X");
  scoreX = parseInt(b);
}

let scoretie = localStorage.getItem("tie");
if (scoretie === null) {
  scoretie = 0;
} else {
  let c = localStorage.getItem("tie");
  scoretie = parseInt(c);
}
countO.innerText = scoreO;
countX.innerText = scoreX;
counttie.innerText = scoretie;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let disabledbtns = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
let enabledbtns = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.textContent = "";
  });
};
newbtn.addEventListener("click", () => {
  enabledbtns();
  result.innerText = `?`;
  gameWon = false;
});
resetbtn.addEventListener("click", () => {
  enabledbtns();
  result.innerText = `?`;
  localStorage.clear();
  turnO = false;
  scoreO = 0;
  scoreX = 0;
  scoretie = 0;
  counttie.innerText = 0;
  countX.innerText = 0;
  countO.innerText = 0;
  gameWon = false;
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        disabledbtns();
        result.innerText = `${pos1Val}`;
        score(pos1Val);
        gameWon = true;
      }
    }
  }
  if (!gameWon) {
    checkTie();
  }
};
let checkTie = () => {
  if ([...boxes].every((box) => box.textContent !== "") && !gameWon) {
    result.innerText = "Tie";
    scoretie++;
    counttie.innerText = scoretie;
    localStorage.setItem("tie", scoretie);
    disabledbtns();
  }
};
let score = (value) => {
  if (value === "X") {
    scoreX++;
    countX.innerText = scoreX;
    localStorage.setItem("X", scoreX);
  } else if (value === "O") {
    scoreO++;
    countO.innerText = scoreO;
    localStorage.setItem("O", scoreO);
  }
};
boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (turnO === true) {
      box.textContent = "O";
      turnO = false;
    } else {
      box.textContent = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});
