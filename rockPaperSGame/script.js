let userScore = 0;
let computerScore = 0;
let tie =0;

let rockIcon = document.querySelector(".rock");
let paperIcon = document.querySelector(".paper");
let scissorsIcon = document.querySelector(".scissors");
let resultmsg = document.querySelector(".resultmsg");
let resetbtn = document.querySelector(".reStart")

let userSCount = document.querySelector(".userSCount");
let computerSCount = document.querySelector(".computerSCount");
let tieSCount = document.querySelector(".tieSCount");

let ComputerChoice = "rock";
let userChoice = "rock";
let result;


let computerSelect = () => {
  let randomVal = Math.floor(Math.random()*3);
  if (randomVal === 0) {
    ComputerChoice = "rock"; 
  } else if (randomVal === 1) {
    ComputerChoice = "paper"; 
  } else {
    ComputerChoice = "scissors"; 
  }
};

let winner = () => {
  if (ComputerChoice === userChoice) {
    result = "Tie";
    tie++;
  }else if (ComputerChoice === "rock") {
    if (userChoice === "scissors") {
      result = "Lose..";
      computerScore++;
    } else if (userChoice === "paper") {
      result = "Won!!";
      userScore++;
    }
  }else if (ComputerChoice === "paper") {
    if (userChoice === "rock") {
      result = "Lose..";
      computerScore++;
    } else if (userChoice === "scissors") {
      result = "Won!!";
      userScore++;
    }
  }else if (ComputerChoice === "scissors") {
    if (userChoice === "rock") {
      result = "Won!!";
      userScore++;
    } else if (userChoice === "paper") {
      result = "Lose..";
      computerScore++;
    }
  }
};

function Finalresult() {
  computerSelect();
  winner();
  resultmsg.innerHTML =`Result : ${result}`; 
  userSCount.innerHTML = `Your Score: ${userScore}`;
  computerSCount.innerHTML = `Computer Score: ${computerScore}`;
  tieSCount.innerHTML = `Tie: ${tie}`;
}

rockIcon.addEventListener("click", () => {
  userChoice = "rock";
  Finalresult();
});
paperIcon.addEventListener("click", () => {
  userChoice = "paper";
  Finalresult();
});
scissorsIcon.addEventListener("click", () => {
  userChoice = "scissors";
  Finalresult();
});
resetbtn.addEventListener("click",()=>{
  userScore = 0;
  tie = 0;
  computerScore = 0;
  userSCount.innerHTML = `Your Score: ${userScore}`;
  computerSCount.innerHTML = `Computer Score: ${computerScore}`;
  tieSCount.innerHTML = `Tie: ${tie}`;
})
