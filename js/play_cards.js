const cards = document.querySelectorAll('.cards__item');
let hasCardFlipped = false;
let blockLocked = false;
let firstCard, secondCard;

const flipCard = e => {
 if (blockLocked) return;
const trgt= e.target.parentElement;

if (trgt === firstCard) return;
trgt.classList.add('flip');

if (!hasCardFlipped) {
    hasCardFlipped = true;
    firstCard = trgt;
}
else {
    hasCardFlipped = false;
    secondCard = trgt;
    checkForMatch();
}
};

const checkForMatch = () => {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        firstCard.removeEventListener('click',flipCard);
        secondCard.removeEventListener('click',flipCard);
    }
    else {
        blockLocked = true;
       setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
         reset();
       }, 1000)
      
    }
}

const reset = () => {
    hasCardFlipped=blockLocked=false;
    firstCard=secondCard=null;
    }

cards.forEach(card => {
    card.addEventListener('click', flipCard);
    const rndmInex = Math.floor(Math.random()*cards.length);
    card.style.order = rndmInex;
})