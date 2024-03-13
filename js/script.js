
const bet = document.querySelector(".bet-amount");
const bet_container = document.querySelector(".bet-container");
const collect = document.querySelector(".collect-container");
const credit = document.querySelector(".credit-value");
const winAmount = document.querySelector(".winAmount");
const winAmountContainer = document.querySelector(".win-container")
const winPortrait =document.querySelector('.win-portrait')

let creditAmount = 1000;
let betAmount = [1, 2, 5, 10, 20, 50, 100];
let betMultiplier = 1;
let currentWinBet = 0;



const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
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

function adjustBet(action) {
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
  updateBetDisplay();
}

function updateBetDisplay() {
  bet.textContent = betMultiplier;
  credit.textContent = creditAmount;
}


function betCollect() {
  if (currentWinBet == 0) {
    bet_container.style.display = "block";
    collect.style.display = "none";
  } else {
    bet_container.style.display = "none";
    collect.style.display = "block";
  }
}
function updateCredit() {
    credit.textContent = creditAmount;
    winAmount.textContent = currentWinBet;
    winPortrait.textContent=currentWinBet;
  
}

function addCardInHistory(card) {
  const historyCards = document.querySelector(".history-cards");
  const clonedCard = card.cloneNode(true);
  historyCards.append(clonedCard);
  if (historyCards.children.length > 4) {
    historyCards.removeChild(historyCards.firstElementChild); }
}



function payout() {
  increaseCounterAnimation(winAmount,1000,0,currentWinBet);
  increaseCounterAnimation(credit,1000,creditAmount+currentWinBet,creditAmount);
  creditAmount+= currentWinBet;
  currentWinBet = 0;
  updateCredit();
  bet_container.style.display = "block";
  collect.style.display = "none";
}



let isRunning = false;
let selectedColor;
let animationInterval;



function initGame() {
  credit.textContent = creditAmount;
  animateShufflingCards();
  animationInterval = setInterval(animateShufflingCards, 80);
  resizeCanvas();
}


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
   
    animationZoom(winAmount);
  } else {
    currentWinBet = 0;
    updateCredit();
    showLossMessage();
  }
  betCollect();
  setTimeout(() => {
    enableButton();
  }, 2000);
}
   


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
        animationInterval = setInterval(animateShufflingCards,80);
        isRunning = false;
      }, 2000);
    }

    function showLossMessage() {
      const winPortraitContainer=document.getElementById('label-portrait-win');
      const winContainer=document.getElementById('label-win');
      winContainer.style.color='red';
      winPortraitContainer.style.color='red';
      animationZoom(winContainer);
      animationZoom(winPortraitContainer);
      winContainer.innerHTML = 'YOU LOSE';
      winPortraitContainer.innerHTML = 'YOU LOSE';
      setTimeout(function() {
        winPortraitContainer.innerHTML = "Win";
        winContainer.innerHTML="Win";
        winContainer.style.color='gold';
        winPortraitContainer.style.color='gold';
      }, 2000); 
     
  }
  

window.addEventListener("load", initGame());
window.addEventListener("orientationchange", checkOrientation);
