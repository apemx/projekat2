const btnPlay = document.querySelector(".btn-play");
const btnInfo = document.querySelector(".btn-info");
const btnRed = document.querySelector(".red-button");
const btnBlack = document.querySelector(".black-button");
function checkOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    document.body.classList.add("portrait");
  } else {
    document.body.classList.remove("portrait");
  }
}
function enableButton() {
  btnRed.disabled = false;
  btnBlack.disabled = false;
}

function disableButton() {
  btnRed.disabled = true;
  btnBlack.disabled = true;
}

function fliptable() {
  const game = document.querySelector(".main-game-content");
  const rulesGame = document.querySelector(".rules");
  const computedGameDisplay = window.getComputedStyle(game).display;
  if (computedGameDisplay === "flex") {
    btnInfo.disabled = true;
    game.style.display = "none";
    rulesGame.style.display = "flex";
  } else {
    btnInfo.disabled = false;
    game.style.display = "flex";
    rulesGame.style.display = "none";
  }
}

btnInfo.addEventListener("click", () => {
  fliptable();
});

btnPlay.addEventListener("click", () => {
  fliptable();
});

btnRed.addEventListener("click", () => {
  if (!isRunning) {
    selectedColor = "red";
    startGame();
    betCollect();
  }
});

btnBlack.addEventListener("click", () => {
  if (!isRunning) {
    selectedColor = "black";
    startGame();
    betCollect();
  }
});
