'use strict';
//elem selection
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const playerOneScore = document.getElementById('score--0');
const playerOneCurrentScore = document.getElementById('current--0');
const playerTwoScore = document.getElementById('score--1');
const playerTwoCurrentScore = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const namePlayerOne = document.getElementById('name--0');
const namePlayerTwo = document.getElementById('name--1');

initGame();

btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    //generate random namber
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //display namber on the dice
    dice.classList.remove('hidden');
    dice.src = `dice${diceNumber}.png`;

    //if number is 1, switch on the next player
    if (diceNumber !== 1) {
      currentScore += diceNumber;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying) {
    //add current score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    //if score of active player is 100 player is winner

    if (totalScore[activePlayer] >= 100) {
      dice.classList.add('hidden');
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);

function switchActivePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //switch player backColor
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
}

let totalScore, currentScore, activePlayer, isPlaying;

function initGame() {
  btnNew.addEventListener('click', () => {
    totalScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneCurrentScore.textContent = 0;
    playerTwoCurrentScore.textContent = 0;

    playerTwo.classList.remove('player--active');
    playerOne.classList.remove('player--active');
    playerOne.classList.remove('player--winner');
    playerTwo.classList.remove('player--winner');
    playerOne.classList.add('player--active');
    dice.classList.add('hidden');
  });
}
