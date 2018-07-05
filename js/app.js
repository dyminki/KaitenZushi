document.addEventListener("DOMContentLoaded", function() {

  const thePlace = document.querySelectorAll('.plate');
  const scoreBoard = document.querySelector('.score');
  const theSushi = document.querySelectorAll('.sushi');
  const button = document.getElementsByClassName('btn')[0];
 
  let lastPlace;
  let lastSushi;
  let lastSushiType = 0;
  let timeUp = false;
  let score = 0;
  
  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomPlate() {
    let idx = Math.floor(Math.random() * thePlace.length);
    while (idx === lastPlace)  {
      idx = Math.floor(Math.random() * thePlace.length);
      console.log('>', idx, lastPlace)
    } 
    lastPlace = idx;

    return thePlace[idx];
  }

  function randomSushi(theSushi) {
    //klasa obrazka
    let idx = Math.floor(Math.random() * theSushi.length);
    while (idx === lastSushiType)  {
      idx = Math.floor(Math.random() * theSushi.length);
      console.log('>', idx, lastSushiType)
    } 
    if (idx == lastSushiType) {
      console.warn('>>>>>>', idx, lastSushiType)
    }
    lastSushiType = idx;

    const sushi = theSushi[lastPlace];
    console.log(lastPlace)
    const sushiType = 'sushi'+ idx;
    sushi.classList.add(sushiType);
   
    return sushi;
  }

  function peep() {
    const time = randomTime(800, 1500);
    const plate = randomPlate();
    
    plate.classList.add('up');
    randomSushi(theSushi);
    setTimeout(() => {
      plate.classList.remove('up');
      if (!timeUp) peep();
    }, time);
  }

  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 20000)
  }

  function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  
  theSushi.forEach(sushi=> sushi.addEventListener('click', bonk));
  button.addEventListener("click", startGame);

});
