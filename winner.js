// *** Function for checking the winner *** //

// If user won the round return 1 , if pc won the round return -1 and if there is a tie return 0;

const inCaseOfStone = (pc) => {
  if (pc === "paper") {
    return -1;
  } else if (pc === "scissor") {
    return 1;
  } else {
    return 0;
  }
};

const inCaseOfPaper = (pc) => {
  if (pc === "stone") {
    return 1;
  } else if (pc === "scissor") {
    return -1;
  } else {
    return 0;
  }
};

const inCaseOfScissor = (pc) => {
  if (pc === "stone") {
    return -1;
  } else if (pc === "paper") {
    return 1;
  } else {
    return 0;
  }
};
let ans;

const checkWinner = (userSelected, pcSelected) => {
  if (userSelected === "stone") {
    ans = inCaseOfStone(pcSelected);
  } else if (userSelected === "paper") {
    ans = inCaseOfPaper(pcSelected);
  } else {
    ans = inCaseOfScissor(pcSelected);
  }

  if (ans > 0) {
    return "user";
  } else if (ans < 0) {
    return "pc";
  } else {
    return "tie";
  }
};

export { checkWinner };
