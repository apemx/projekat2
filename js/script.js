let card = {
  redback: new Image(),
  blackback: new Image(),
  red1: new Image(),
  red2: new Image(),
  black1: new Image(),
  black2: new Image(),
};

card.redback.src = "Assets/red.png";
card.blackback.src = "Assets/black.png";
card.red1.src = "Assets/3.png";
card.red2.src = "Assets/1.png";
card.black1.src = "Assets/2.png";
card.black2.src = "Assets/0.png";

const elements = {
  bet: document.querySelector(".bet-amount"),
  betContainer: document.querySelector(".bet-container"),
  collect: document.querySelector(".collect-container"),
  credit: document.querySelector(".credit-value"),
  winAmount: document.querySelector(".winAmount"),
  winContainer: document.getElementById("label-win"),
  winPortrait: document.querySelector(".win-portrait"),
  winPortraitContainer: document.getElementById("label-portrait-win"),
};

let creditAmount = 1000;
let betMultiplier = 1;
let currentWinBet = 0;
let isRunning = false;
let animationInterval;

// Increase or decrease bet amount based on the action
function adjustBet(action) {
  const betAmount = [1, 2, 5, 10, 20, 50, 100];
  let index = betAmount.indexOf(betMultiplier);
  
  if (action === "increase") {
    if (index < betAmount.length - 1) {
      betMultiplier = betAmount[index + 1];
    }
  } else if (action === "decrease") {
    if (index > 0) {
      betMultiplier = betAmount[index - 1];
    } else {
      if (betMultiplier > 1) {
        betMultiplier = betAmount[0];
      }
    }
  }
  updateBetDisplay();// Update bet display after adjustment
}

// Function to update the bet display
function updateBetDisplay() {
  elements.bet.textContent = betMultiplier;
  elements.credit.textContent = creditAmount;
}

// Function to handle bet collection display
function betCollect() {
  if (currentWinBet === 0) {
    elements.betContainer.style.display = "block";
    elements.collect.style.display = "none";
  } else {
    elements.betContainer.style.display = "none";
    elements.collect.style.display = "block";
  }
}

// Function to update credit and win amount display
function updateCredit() {
  elements.credit.textContent = creditAmount;
  elements.winAmount.textContent = currentWinBet;
  elements.winPortrait.textContent = currentWinBet;
}

// Function to add card to history
function addCardInHistory(card) {
  const historyCards = document.querySelector(".history-cards");
  const clonedCard = card.cloneNode(true);
  historyCards.append(clonedCard);
  if (historyCards.children.length > 4) {
    historyCards.removeChild(historyCards.firstElementChild);
  }
}


// Function for payout
function payout() {
  increaseCounterAnimation(elements.winAmount, 1000, 0, currentWinBet);
  increaseCounterAnimation(elements.winPortrait, 1000, 0, currentWinBet);
  increaseCounterAnimation(
    elements.credit,
    1000,
    creditAmount + currentWinBet,
    creditAmount
  );
  creditAmount += currentWinBet;
  currentWinBet = 0;
  updateCredit();
  elements.betContainer.style.display = "block";
  elements.collect.style.display = "none";
}

// Function to display loss message
function showLossMessage() {
  elements.winContainer.style.color = "red";
  elements.winPortraitContainer.style.color = "red";
  animationZoom(elements.winContainer);
  animationZoom(elements.winPortraitContainer);
  elements.winContainer.textContent = "YOU LOSE";
  elements.winPortraitContainer.textContent = "YOU LOSE";
  setTimeout(showWinMessage, 2000);
}

// Function to display win message
function showWinMessage() {
  elements.winContainer.textContent = "Win";
  elements.winPortraitContainer.textContent = "Win";
  elements.winContainer.style.color = "gold";
  elements.winPortraitContainer.style.color = "gold";
}

// Function to initialize the game
function initGame() {
  elements.credit.textContent = creditAmount;
  animateShufflingCards();
  animationInterval = setInterval(animateShufflingCards, 80);
  resizeCanvas();
}

// Function to display selected card
function displaySelectedCard() {
  clearInterval(animationInterval);
  let selectedCardColor = Math.random() < 0.5 ? "red" : "black";
  let Card;
  if (selectedCardColor === "red") {
    Card = Math.random() < 0.5 ? card.red1 : card.red2;
  } else {
    Card = Math.random() < 0.5 ? card.black1 : card.black2;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(Card, 0, 0, canvas.width, canvas.height);
  addCardInHistory(Card);
  if (selectedCardColor == selectedColor) {
    currentWinBet = currentWinBet * 2;
    updateCredit();
    showWinMessage();
    animationZoom(elements.winAmount);
  } else {
    currentWinBet = 0;
    updateCredit();
    showLossMessage();
  }
  betCollect();
  setTimeout(enableButton, 2000);
}

// Function to start the game
function startGame() {
  if (isRunning || (creditAmount < betMultiplier && currentWinBet == 0)) {
    return;
  }
  isRunning = true;
  disableButton();
  clearInterval(animationInterval);
  if (currentWinBet == 0) {
    creditAmount -= betMultiplier;
    updateCredit();
    currentWinBet = betMultiplier;
  }

  displaySelectedCard();
  setTimeout(() => {
    animationInterval = setInterval(animateShufflingCards, 80);
    isRunning = false;
  }, 2000);
}

// event
window.addEventListener("load", initGame);
window.addEventListener("orientationchange", checkOrientation);
