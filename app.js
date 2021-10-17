const start = document.querySelector('.start');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

// Generate random amount of time
function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}

// Pick a random hole for the mole to popup
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    // Skip the same hole
    if (hole === lastHole) {
        console.log("Nah, the same hole");
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Make the mole popping up in the random hole and random time
function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

function startGame() {
scoreBoard.textContent = 0;
timeUp = false;
score = 0;
peep();
setTimeout(() => timeUp = true, 10000);
}

start.addEventListener('click', startGame);

function bonk(e) {
    // console.log(e);
    if (!e.isTrusted) return; // Disable click from a javascript code
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));