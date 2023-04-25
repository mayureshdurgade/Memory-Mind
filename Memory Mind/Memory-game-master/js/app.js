const appCards = document.querySelector('.app__cards');
const difficultyBtn = document.querySelectorAll('.page-wrapper__btn');
const pageWrapper = document.querySelector('.page-wrapper');
const startAgainBtn = document.querySelector('.app__start-again');
const newArray = [];

createArrayWithLength = (array, amountOfElements) => {
  for (let i = 0; i < amountOfElements; i++) {
    array.push(i);
  }
  return array;
}

shuffle = (array) => {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
  }
  return array;
}

createElements = (array) => {
  array.forEach(element => {
    html = (`
      <button class="app__card" data-id="${element}">${element}</button>
    `);
    appCards.innerHTML += html;
  });
}

checkDuplicate = (array) => {
  array.forEach(element => {
    element.addEventListener('click', e => {
      element.classList.add('clicked');
      newArray.push(e.currentTarget);
      newArray[0].disabled = true;
      if (newArray.length > 1) {
        if (newArray[0].dataset.id === e.currentTarget.dataset.id && newArray[1].dataset.id === e.currentTarget.dataset.id) {
          newArray[0].classList.add('hidden');
          newArray[1].classList.add('hidden');
          newArray.length = 0;
        }
        else {
          setTimeout(() => {
            newArray[0].classList.remove('clicked');
            newArray[1].classList.remove('clicked');
            newArray[0].disabled = false;
            newArray.length = 0;
          }, 300);    
        }
      }  
    })
  });
}

difficultyBtn.forEach(element => {
  element.addEventListener('click', e => {
    const amountOfBlocks = +e.currentTarget.getAttribute('data-id');
    const arrayOne = [];
    const arrayTwo = [];
    createArrayWithLength(arrayOne, amountOfBlocks);
    createArrayWithLength(arrayTwo, amountOfBlocks);
    const arrayFinal = arrayOne.concat(arrayTwo);
    shuffle(arrayFinal);
    createElements(arrayFinal);
    const appCard = appCards.querySelectorAll('.app__card');
    checkDuplicate(appCard);
    pageWrapper.classList.add('page-wrapper--hidden');
  });
});

startAgainBtn.addEventListener('click', () => {
  appCards.innerHTML = '';
  pageWrapper.classList.remove('page-wrapper--hidden');
  pageWrapper.style.transition = 5;
});
