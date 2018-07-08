document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.container');
  const thePlace = document.querySelectorAll('.place');
  const scoreBoard = document.querySelector('.score');
  const theSushi = document.querySelectorAll('.sushi');
  const button = document.querySelector('.btn');
  const over = document.querySelector('.over');

  let lastPlaceID = null; 
  let lastSushiTypeID = null; 
  let timeUp = false; 
  let score = 0;
  let timeChange = null; 
  let timeBetweenUpDown = null; 
  let positionOfPlate = 57;
  let indexx = 1;

  over.style.display = "none";
  
  function randomTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
  }
  
  function randomPlaceID() {
      let idx = Math.floor(Math.random() * thePlace.length);
      while (idx === lastPlaceID) {
          idx = Math.floor(Math.random() * thePlace.length);
      }
      return idx;
  }
  
  function randomSushiTypeID() {
      let idx = Math.floor(Math.random() * theSushi.length);
      while (idx === lastSushiTypeID) {
          idx = Math.floor(Math.random() * theSushi.length);
      }
      return idx;
  }
  
  function endUp(element) {
      element.querySelector('.sushi').canClick = true;
      clearTimeout(timeBetweenUpDown);
      timeBetweenUpDown = setTimeout(() => {
          element.classList.add('down');
      }, 200); 
  }
 
  function endDown(element) {
      element.querySelector('.sushi').canClick = false;
      element.classList.remove('down');
      element.classList.remove('up');
      element.removeEventListener('animationend', endDown);
      const time = randomTime(800, 1000); 
      clearTimeout(timeChange);
      timeChange = setTimeout(() => {
          peep();
      }, time);
  }

  function peep() {
      if (!timeUp) {
          const placeID = randomPlaceID();
          const sushiTypeID = randomSushiTypeID();

          if (lastPlaceID !== null && lastSushiTypeID !== null) {
              thePlace[lastPlaceID].querySelector('.sushi').classList.remove('sushi' + lastSushiTypeID);
          }

          thePlace[placeID].querySelector('.sushi').classList.add('sushi' + sushiTypeID)
          lastSushiTypeID = sushiTypeID;
          lastPlaceID = placeID;
          thePlace[placeID].classList.add('up');

      } else {
          document.querySelector('#tape').classList.remove('anim');
          over.style.display = "block";
          button.disabled = false;
      }
  }

  function addingNewPlate(classN){
      const newPlate = document.createElement('div');
      newPlate.classList.add('plate');
      newPlate.classList.add(classN);
      newPlate.style.top = positionOfPlate + 'em';
      newPlate.style.zIndex = indexx;
      container.appendChild(newPlate);
      positionOfPlate = positionOfPlate - 0.6;
      indexx++;
  }

  function bonk(e) {
      if (!e.isTrusted) return;
      if (this.canClick) {
          clearTimeout(timeBetweenUpDown);
          this.parentNode.classList.add('down');
          if (e.target.classList.contains('sushi0')){
          addingNewPlate('orange-plate');
          score += 2;
          }
          if (e.target.classList.contains('sushi1')){
          addingNewPlate('blue-plate');
          score += 3;
          }
          if (e.target.classList.contains('sushi2')){
          addingNewPlate('black-plate');
          score += 10;
          }
          if (e.target.classList.contains('sushi3')){
          addingNewPlate('green-plate');
          score += 3;
          }
          if (e.target.classList.contains('sushi4')){
          addingNewPlate('yellow-plate');
          score += 2;
          }
          if (e.target.classList.contains('sushi5')){
          addingNewPlate('pink-plate');
          score += 8;
          }
          scoreBoard.textContent = score;
          this.canClick = false;
      }
  }

  function startGame() {
      scoreBoard.textContent = 0;
      timeUp = false;
      score = 0;
      positionOfPlate = 57;
      over.style.display = "none";
      while (container.firstChild) {
          container.removeChild(container.firstChild);
      }
      document.querySelector('#tape').classList.add('anim');
      setTimeout(() => peep(), 1000);
      setTimeout(() => timeUp = true, 30000);
      button.disabled = true;
  }

  thePlace.forEach(place => {
      place.addEventListener('animationend', function(e) {
          if (e.animationName === "up") {
              endUp(this);
          }
          if (e.animationName === "down") {
              endDown(this);
          }
      })
  });

  theSushi.forEach(sushi => {
      sushi.addEventListener('click', bonk);
      sushi.canClick = false; 
  });
  button.addEventListener("click", startGame);
});
