function openPlayerConfig() {
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
}

function savePlayerconfig(event) {
  event.preventDefault(event.target);
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("playerName");
  console.log(enteredPlayername);
}
