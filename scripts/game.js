function resetGameStatus() {
  activePlayer = 0;
  currentRound = 0;
  gameIsOver = false;
  //reset the <h2> in game over section to the original html, because in endGame(), one line relies on it, and the other line will overwrite it, so we need to recover it
  gameOverElement.firstElementChild.innerHTML =
    "You won, <span id='winner-name'>Player Name</span>!";
  gameOverElement.style.display = "none";
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardIndex += 1;
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  gameAreaElement.style.display = "block";
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameIsOver === true) {
    return;
  }

  const selectedRow = event.target.dataset.row - 1;
  const selectedCol = event.target.dataset.col - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    alert("Please select an empty field");
    return;
  }

  gameData[selectedRow][selectedCol] = activePlayer + 1;

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  const winnerId = checkForGameOver();

  if (winnerId > 0) {
    endGame(winnerId);
  }

  currentRound += 1;

  switchPlayer();
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function checkForGameOver() {
  // check row
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // check col
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // check diagonal
  if (gameData[0][0] == gameData[1][1] && gameData[1][1] == gameData[2][2]) {
    return gameData[0][0];
  }

  //check diagonal
  if (gameData[0][2] == gameData[1][1] && gameData[1][1] == gameData[2][0]) {
    return gameData[0][2];
  }

  //check if draw
  if (currentRound === 9) {
    return -1;
  }

  //no winning or draw
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  } else {
    gameOverElement.firstElementChild.textContent = "It' s a draw";
  }
}
