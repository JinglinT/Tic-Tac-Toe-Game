function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }
  gameAreaElement.style.display = "block";
  activePlayerNameElement.textContent = players[0].name;
}

function selectGameField(event) {
  const selectedRow = event.target.dataset.row - 1;
  const selectedCol = event.target.dataset.col - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    alert("Please select an empty field");
    return;
  }

  gameData[selectedRow][selectedCol] = activePlayer + 1;

  console.log(gameData);

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  const winnerId = checkForGameOver();
  console.log(winnerId);

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
  for (i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // check col
  for (i = 0; i < 3; i++) {
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
