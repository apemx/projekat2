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

  function increaseCounterAnimation(targetElement, duration, finalValue, startValue = 0) {
    const start = performance.now();
    const delta = startValue < finalValue ? 1 : -1;
    const step = (timestamp) => {
      const progress = (timestamp - start) / duration;
      const currentValue = Math.floor(startValue + delta * Math.abs(finalValue - startValue) * progress);
      targetElement.textContent = currentValue;
      if ((delta === 1 && currentValue < finalValue) || (delta === -1 && currentValue > finalValue)) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }