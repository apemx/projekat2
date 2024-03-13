const divCanvas = document.getElementById("game");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  let newCardWidth, newCardHeight;
  if (window.innerHeight > window.innerWidth) {
    let currentScreenWidth = window.innerWidth;
    newCardWidth = currentScreenWidth * 0.22;
    newCardHeight = (newCardWidth * 429) / 268;
  } else {
    let currentScreenHeight = window.innerHeight;
    newCardHeight = currentScreenHeight * 0.3;
    newCardWidth = (newCardHeight * 268) / 429;
  }

  canvas.style.width = newCardWidth + "px";
  canvas.style.height = newCardHeight + "px";
  let ratio = window.devicePixelRatio || 1;
  canvas.width = newCardWidth * ratio;
  canvas.height = newCardHeight * ratio;
}
window.addEventListener("resize", resizeCanvas);
function enableButton() {
  btnRed.disabled = false;
  btnBlack.disabled = false;
}

function disableButton() {
  btnRed.disabled = true;
  btnBlack.disabled = true;
}
