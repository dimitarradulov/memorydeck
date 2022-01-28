'use script';

const cards = document.querySelector('.cards');
const cardsBackSide = document.querySelectorAll(
  '.cards__flip-card-inner--back'
);
const bestScoreEl = document.querySelector('.best-score__number');
const movesEl = document.querySelector('.moves__number');
const modal = document.querySelector('#modal');
const modalClose = document.querySelector('#close-modal');
const modalContentText = document.querySelector('.modal__content p');

const arrOfAnimalImgs = [
  '<img src="img/1.svg" class="animal" alt="Animal Image" data-animal="giraffe" />',
  '<img src="img/2.svg" class="animal" alt="Animal Image" data-animal="bull" />',
  '<img src="img/1.svg" class="animal" alt="Animal Image" data-animal="giraffe" />',
  '<img src="img/3.svg" class="animal" alt="Animal Image" data-animal="snake" />',
  '<img src="img/3.svg" class="animal" alt="Animal Image" data-animal="snake" />',
  '<img src="img/2.svg" class="animal" alt="Animal Image" data-animal="bull" />',
];

let click = 0;
let cardBackSideImg1;
let movesNum = 0;

// Functions
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const addImagesToCardsBackSide = () => {
  cardsBackSide.forEach((card, i) => {
    card.insertAdjacentHTML('afterbegin', arrOfAnimalImgs[i]);
  });
};

const setInitialBestScore = () => {
  if (localStorage.getItem('bestScore')) {
    bestScoreEl.textContent = localStorage.getItem('bestScore');
  } else {
    localStorage.setItem('initialBestScore', 0);
    bestScoreEl.textContent = localStorage.getItem('initialBestScore');
  }
};

const setBestScore = () => {
  const bestScore = localStorage.getItem('bestScore');

  if (bestScore > movesNum) return localStorage.setItem('bestScore', movesNum);

  return localStorage.setItem('bestScore', movesNum);
};

const init = () => {
  shuffleArray(arrOfAnimalImgs);
  addImagesToCardsBackSide();
  setInitialBestScore();
};

init();

const isCardsNotVisible = (cards) => {
  let hidden = true;

  cards.forEach((card) => {
    if (!card.classList.contains('v-hidden')) hidden = false;
  });

  return hidden;
};

const refreshPage = () => {
  window.location.reload();
};

const showModal = () => {
  modalContentText.textContent = `You have beaten the game with ${movesNum} moves!`;
  modal.classList.remove('d-none');
};

const hideModal = () => {
  modal.classList.add('d-none');
};

const restartGameAndSetBestScore = () => {
  hideModal();
  setBestScore();
  refreshPage();
};

// Events
cards.addEventListener('click', (e) => {
  const clicked = e.target.closest('.cards__flip-card-inner--front');

  if (!clicked) return;

  const cardInner = clicked.closest('.cards__flip-card-inner');

  cardInner.classList.add('cards-transform');

  click++;

  if (click != 2) {
    cardBackSideImg1 = cardInner.querySelector('.animal');
    return;
  } else if (click == 2) {
    movesNum++;
    click = 0;
  }

  movesEl.textContent = movesNum;

  const cardBackSideImg2 = cardInner.querySelector('.animal');

  if (cardBackSideImg1.dataset.animal !== cardBackSideImg2.dataset.animal) {
    const card1 = cardBackSideImg1.closest('.cards__flip-card-inner');
    const card2 = cardBackSideImg2.closest('.cards__flip-card-inner');

    setTimeout(() => {
      card1.classList.remove('cards-transform');
      card2.classList.remove('cards-transform');
    }, 1000);
  } else {
    const card1 = cardBackSideImg1.closest('.cards__flip-card');
    const card2 = cardBackSideImg2.closest('.cards__flip-card');

    setTimeout(() => {
      card1.classList.add('v-hidden');
      card2.classList.add('v-hidden');
      isCardsNotVisible(document.querySelectorAll('.cards__flip-card')) &&
        showModal();
    }, 1200);
  }
});

modalClose.addEventListener('click', restartGameAndSetBestScore);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    restartGameAndSetBestScore();
  }
});
