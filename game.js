
const card = document.querySelectorAll('.card');
document.querySelector('#start').addEventListener('click', startGame);

//imported code
let tim = document.getElementsByClassName('timer')[0]
document.querySelector('#pause').addEventListener('click', pause);
document.querySelector('#restart').addEventListener('click', restart);
const counterElement = document.querySelector('#moves');
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;
let started = false;
let counter = 0;

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  tim.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}

function pause() {
    if (t) {
        clearTimeout(t);
        locktable = true;
    }
}
//end

let flipped = false;
let locktable = false;
let first, second;

function flipCard(){
    if (locktable) return;
    if(this === first) return;

    this.classList.add('flip')

    if (!flipped){
        flipped = true;
        first = this;
        return;
    }
        second = this;
        
        checkmatch()
        counter++;
        counterElement.textContent = `Moves: ${counter}`;

}

function checkmatch(){
    let isMatch = first.dataset.framework===second.dataset.framework;
    isMatch ? disablecard() : unflip();
}

function disablecard(){
    first.removeEventListener('click', flipCard);
    second.removeEventListener('click', flipCard);
    resettable();
}

function unflip(){
    locktable = true;

    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        resettable();
        }, 1000);
}

function resettable(){
    [flipped, locktable] = [false, false];
    [first, second] = [null, null];
}

function shuffle(){
    card.forEach(card =>{
        let pos = Math.floor(Math.random()*30);
        card.style.order = pos;
    });
};

function startGame() {
    if (!started) {
        started = true
        shuffle();
        card.forEach(card=>card.addEventListener('click', flipCard));
    }
    timer();
    locktable = false;
}

function restart() {
    clearTimeout(t);
    tim.textContent = '00:00:00';
    card.forEach(card=> card.classList.remove('flip'));
    counterElement.textContent = 'Moves: 0';
    started = false;
    locktable = true;
    minutes = 0;
    seconds = 0;
    hours = 0;
    first = null;
    second = null;
    counter = 0;
}

