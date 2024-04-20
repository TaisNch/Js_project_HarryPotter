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
    //check for match
checkForMatch()
}
};



const checkForMatch = () => {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        // firstCard.removeEventListener('click',flipCard);
        // secondCard.removeEventListener('click',flipCard);
    }
    else {
        unflipCards();
    //     blockLocked = true;
    //    setTimeout(() => {
    //     firstCard.classList.remove('flip');
    //     secondCard.classList.remove('flip');
    //    }, 1000)
    //    blockLocked = false;
       
    }
}

const disableCards = () => {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
}

const unflipCards = () => {
    blockLocked = true;
    setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');
    }, 1000)
    reset()
}

const reset = () => {
    hasCardFlipped=hasCardFlipped=false;
    firstCard=secondCard=null;
}
cards.forEach(card => {
    card.addEventListener('click', flipCard);
    const rndmInex = Math.floor(Math.random()*cards.length);
    card.style.order = rndmInex;
})
