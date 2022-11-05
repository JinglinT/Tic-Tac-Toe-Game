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
