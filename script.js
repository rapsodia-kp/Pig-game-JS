'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //drugi sposob
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  //ta funkcja bedzie do btnroll else i do btn hold
  document.getElementById(`current--${activePlayer}`).textContent = 0; //zerujemy wynik popradniego gracza jak wylosowal 1  i drugi zaczyna
  //ZMIANA GRACZA/switch to next player+loose score
  activePlayer = activePlayer === 0 ? 1 : 0; //if aktplayer=0 switch to 1,  a jak nie czyli jak jest 1 to zmien na 0
  currentScore = 0; //to jest ogolny nie przypisany do konkretnego zawodnika
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll here not global , becauuse each time we generate new number

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.dispay dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //we check for rolled 1 if true switvh to nect player
    if (dice !== 1) {
      //jezeli nie jest 1 to ma dodax wynik zz dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //changed z current0El.textContent=current score/ do ktorego gracza wynik bedzie dopis
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player's score
    scores[activePlayer] += currentScore; //score[1]=score[1]+currentscore
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check score if it is 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      //finish game{
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //if not switch to next
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
