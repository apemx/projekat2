let isRed=false;
function animationZoom(element){
    element.classList.add('zoom-animation');
    setTimeout(() => {
        element.classList.remove('zoom-animation');
      element.classList.add('reset-animation');
      setTimeout(() => {
        element.classList.remove('reset-animation');
      }, 1000);
    }, 1000);
}   


  function animateShufflingCards() {
    if (!isRed) {
    ctx.drawImage(card.redback, 0, 0, canvas.width, canvas.height);
    isRed=!isRed;
    } else {
    ctx.drawImage(card.blackback, 0, 0, canvas.width, canvas.height);
    isRed=!isRed;
    }
  }
  
  function decreaseCounterAnimation(targetElement, duration, initialValue) {
    const step = Math.floor(duration / initialValue);
    let currentValue = initialValue;
    const timer = setInterval(() => {
      if (currentValue <= 0) {
        clearInterval(timer);
        return;
      }
      currentValue--;
      targetElement.textContent = currentValue;
    }, step);
  }
  
  function increaseCounterAnimation(targetElement,duration,finalValue, startValue=0) {
    const step = Math.floor(duration / Math.abs(finalValue - startValue));
    let currentValue = startValue;
    const timer = setInterval(() => {
      const delta = startValue < finalValue ? 1 : -1;
      currentValue += delta;
      targetElement.textContent = currentValue;
      if ((delta === 1 && currentValue >= finalValue) || (delta === -1 && currentValue <= finalValue)) {
        clearInterval(timer);
      }
    }, step);
  }