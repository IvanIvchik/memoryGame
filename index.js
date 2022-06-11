"use strict"

const cards = document.querySelectorAll('.card');
const counter = document.querySelector('.moves');
const startWindow = document.querySelector('.start-window');
const finishWindow = document.querySelector('.finish-window');
const background = document.querySelector('.background');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.new-game-btn');
const finalScore = document.querySelector('.final-score');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counterMoves = 0;
let rightMove = 0;
// let finalResultArray = [];
// let finalResult = 0;

counter.innerHTML = counterMoves;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkFromMatch();
}

function checkFromMatch() {
    increaseCounter();

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    ++rightMove;

    if (rightMove === 8) finishGame();

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
};


function increaseCounter() {
    counter.innerHTML = ++counterMoves;
}

function startGame() {
    startWindow.classList.add('hidden');
    background.classList.add('hidden');
    document.body.classList.remove('locked');
}

function finishGame() {
    finishWindow.classList.remove('hidden');
    background.classList.remove('hidden');
    document.body.classList.add('locked');

    finalScore.innerHTML = `Final score: ${counterMoves}`;
    
}

function restartGame() {
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();

    counter.innerHTML = counterMoves = 0;

    finishWindow.classList.add('hidden');
    background.classList.add('hidden');
    document.body.classList.remove('locked');

}

cards.forEach(card => card.addEventListener('click', flipCard));
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

// localStorage.setItem('result', finalResult);
// localStorage.length = 10;
// localStorage.setItem('result', finalResult);