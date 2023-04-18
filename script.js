'use strict';

//const playerScore1 = document.querySelector('#score--0');
//const playerScore2 = document.querySelector('#score--1');

// Select element
const playerScore1 = document.getElementById('score--0');
const playerScore2 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentScore, activePlayer, playing;

const init = function () {
    const scores = [0, 0];
    playerScore1.textContent = 0;
    playerScore2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;

    dice.classList.add('hidden');

    playerScore1.classList.remove('player--winner');
    playerScore2.classList.remove('player--winner');
    playerScore1.classList.add('player--active');
    playerScore2.classList.remove('player--active');

    currentScore = 0;
    activePlayer = 0;
    playing = true;
}
init();
// dice logic

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
    if (playing) {
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        dice.classList.remove('hidden');
        dice.src = `dice-${diceNumber}.png`;

        if (diceNumber !== 1) {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        }

        switchPlayer();
    }
})

btnNew.addEventListener('click', () => {
    init()
})