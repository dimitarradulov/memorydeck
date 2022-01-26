'use script';

const cards = document.querySelector('.cards');
const cardsBackSide = document.querySelectorAll(
  '.cards__flip-card-inner--back'
);

const arrOfAnimalImgs = [
  '<img src="img/1.svg" class="animal" alt="Animal Image" data-animal="giraffe" />',
  '<img src="img/2.svg" class="animal" alt="Animal Image" data-animal="bull" />',
  '<img src="img/1.svg" class="animal" alt="Animal Image" data-animal="giraffe" />',
  '<img src="img/3.svg" class="animal" alt="Animal Image" data-animal="snake" />',
  '<img src="img/3.svg" class="animal" alt="Animal Image" data-animal="snake" />',
  '<img src="img/2.svg" class="animal" alt="Animal Image" data-animal="bull" />',
];

let click = 0;
let cardBackSideImg1 = '';

// Functions
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

shuffleArray(arrOfAnimalImgs);

const addImagesToCardsBackSide = () => {
  cardsBackSide.forEach((card, i) => {
    card.insertAdjacentHTML('afterbegin', arrOfAnimalImgs[i]);
  });
};

addImagesToCardsBackSide();

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
    click = 0;
  }

  const cardBackSideImg2 = cardInner.querySelector('.animal');

  if (cardBackSideImg1.dataset.animal !== cardBackSideImg2.dataset.animal) {
    console.log('dasd');
    const card1 = cardBackSideImg1.closest('.cards__flip-card-inner');
    const card2 = cardBackSideImg2.closest('.cards__flip-card-inner');
    setTimeout(() => {
      card1.classList.remove('cards-transform');
      card2.classList.remove('cards-transform');
    }, 1000);
  }
});
