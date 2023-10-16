// If you want to refresh the scores you will need to run this window.onload function
// window.onload = () => {
//   localStorage.clear();
// };

import { checkWinner } from "./winner.js";

// **** All selected DOM elements **** //
// SPS stands for Stone Paper Scissor
const wholeBlockOfSPS = document.querySelector(".whole-block");
const showRulesBtn = document.querySelector(".btn-rules");
const rules = document.querySelector(".rules");
const closeRulesBtn = document.querySelector(".rules-closeBtn");
const selectPcScore = document.querySelector(".pc");
const selectUserScore = document.querySelector(".user");
const selectHandSign = document.querySelector(".hand-signs");
const selectMainPage = document.querySelector(".main-page");
const headingBox = document.querySelector(".heading-box");

const selectHurrayPage = document.querySelector(".hurray-page");
selectHurrayPage.style.display = "none";
// Array for reference of stone,paper or scissor
const gameItems = ["stone", "paper", "scissor"];

// ****** All the functions are listed here ******* //

// Function For PC to Choose random option or item
const selectRandomItem = function () {
  const num = Math.floor(Math.random() * 3);
  return gameItems[num];
};

// Function to show Rules
showRulesBtn.addEventListener("click", (e) => {
  console.log(e.target);
  rules.classList.remove("hidden");
});

// Function to close rules
closeRulesBtn.addEventListener("click", () => {
  rules.classList.add("hidden");
});

let userSelected;
let pcSelected;
let winner;

let userScore =
  window.localStorage.length === 0
    ? 0
    : parseInt(localStorage.getItem("userScore"));
let pcScore =
  window.localStorage.length === 0
    ? 0
    : parseInt(localStorage.getItem("pcScore"));

// Persisting previous scores even after a refresh
selectUserScore.innerText =
  window.localStorage.length === 0 ? 0 : localStorage.getItem("userScore");
selectPcScore.innerText =
  window.localStorage.length === 0 ? 0 : localStorage.getItem("pcScore");

//** Function for updating the scores in every round */
const updateScore = (winner) => {
  if (winner === "user") {
    userScore += 2;
    localStorage.setItem("userScore", userScore);
    selectUserScore.innerText = localStorage.getItem("userScore");
  } else if (winner === "pc") {
    pcScore += 2;
    localStorage.setItem("pcScore", pcScore);
    selectPcScore.innerText = localStorage.getItem("pcScore");
  }
};

let openBtnNext;
const removeNextButton = () => {
  if (openBtnNext !== undefined) {
    openBtnNext.remove();
    showRulesBtn.style.right = "3%";
  }
};

// *** Added Next button dynamically when user wins his round ***//
const addNextButton = (playAgainBtn, winnerDispSection) => {
  const html = `<button class="btn btn-next" type="button">NEXT</button>`;
  selectMainPage.insertAdjacentHTML("beforeend", html);
  showRulesBtn.style.right = "15%";

  openBtnNext = document.querySelector(".btn-next");

  openBtnNext.addEventListener("click", () => {
    // Hiding the main page from the user and displays the hooray page
    selectMainPage.style.display = "none";
    headingBox.style.display = "none";
    wholeBlockOfSPS.style.display = "none";
    showRulesBtn.style.right = "3%";
    selectHurrayPage.style.display = "flex";
    winnerDispSection.style.display = "none";

    // Create a playAgain button for hooray page
    const newPlayAgain = document.createElement("button");
    newPlayAgain.classList.add("play-againBTN", "newPlay");
    newPlayAgain.style.width = "8rem";
    newPlayAgain.style.height = "5rem";
    newPlayAgain.innerText = "PLAY AGAIN";
    selectHurrayPage.insertAdjacentElement("beforeend", newPlayAgain);
    newPlayAgain.addEventListener("click", () => {
      location.reload();
    });
  });
};

//** Adding animation to the winner ***/
const addAnimation = (val) => {
  let parent = val.parentNode;
  let newElem = document.createElement("div");
  newElem.classList.add("animate-winner");
  parent.replaceChild(newElem, val);
  newElem.appendChild(val);
};

//** Here We added a new Section which display's the results of the round ***/
const addNewSection = () => {
  wholeBlockOfSPS.style.display = "none";
  const html = `<div class="winner-display-section">
    <div class="fist-box">
      <div class="player">YOU PICKED</div>
      <div class="userCircle circle"></div>
    </div>
  
    <div class="second-box">
      <div class="game-result">YOU WIN</div>
      <div class="against">AGAINST PC</div>
      <button class="play-againBTN" type="button">PLAY AGAIN</button>
    </div>
    <div class="fist-box">
      <div class="player">PC PICKED</div>
      <div class="pcCircle circle"></div>
    </div>
  </div>`;

  selectHandSign.insertAdjacentHTML("afterbegin", html);
};

//** This changes the display for winner-display-section and adds a new element to the page inside main page element */
const changeDisplay = (winner, userSelected, pcSelected) => {
  addNewSection();

  //Selecting all the necessary DOM elements from the newly added section
  const winnerDispSection = document.querySelector(".winner-display-section");
  const selectYou = document.querySelector(".userCircle");
  const selectComp = document.querySelector(".pcCircle");
  const gameResult = document.querySelector(".game-result");
  const selectTextAgainst = document.querySelector(".against");
  const playAgainBtn = document.querySelector(".play-againBTN");

  selectYou.classList.add(userSelected);
  selectComp.classList.add(pcSelected);

  //Here we added eventlistner for playing the game again
  playAgainBtn.addEventListener("click", () => {
    winnerDispSection.style.display = "none";
    removeNextButton();
    wholeBlockOfSPS.style.display = "block";
  });

  if (winner === "user") {
    addAnimation(selectYou);

    // Passing playAgainBtn as an argument so that I can I access it after clicking on next button
    addNextButton(playAgainBtn, winnerDispSection);
    gameResult.innerText = "YOU WIN";
  } else if (winner === "pc") {
    addAnimation(selectComp);
    removeNextButton();
    gameResult.innerText = "YOU LOST";
  } else {
    gameResult.innerText = "TIE UP";
    selectTextAgainst.classList.add("hidden");
    removeNextButton();
    playAgainBtn.innerText = "REPLAY";
  }
};

//Used event delegation for selecting the elements stone,paper and scissor
wholeBlockOfSPS.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    userSelected = e.target.dataset.fist;
    pcSelected = selectRandomItem();

    // Function to check who won the round or it's a tie
    //** Here check Winner Func is imported from external js winner.js */
    winner = checkWinner(userSelected, pcSelected);

    // Updating the scores after every round
    updateScore(winner);

    // This function changes the display for results where we see You Win, You Lost or Tie up
    changeDisplay(winner, userSelected, pcSelected);
  }
});
