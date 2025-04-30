let min = 1;
let max = 200;
let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
let attempts = 0;
let guessHistory = [];
let hintRange = 10;
let timerDuration = 15;
let timerId;

let UserMinGenerate = document.getElementById("minimumGenerate");
let UserMaxGenerate = document.getElementById("maximumGenerate");
let incorrect = new Audio('src/incorrect.mp3');
let correct = new Audio('src/correct.mp3');

// ---------------------------------------
// DOM elements
const guessInput = document.getElementById("guessInput");
const checkButton = document.getElementById("checkButton");
const message = document.getElementById("message");
const guide = document.getElementById("Guide-Button");
const targetChoose = document.getElementById("TargetChoose");
const historyDisplay = document.getElementById("history");
const timerDisplay = document.getElementById("timerDisplay");
// ---------------------------------------

// ---------------------------------------
// Set custom range and generate random number
targetChoose.addEventListener("click", () => {
    let userMin = Number(UserMinGenerate.value);
    let userMax = Number(UserMaxGenerate.value);

    if (isNaN(userMin) || isNaN(userMax) || userMin >= userMax) {
        message.textContent = "Please enter a valid minimum and maximum range!";
        message.style.color = "red";
        return;
    }

    min = userMin;
    max = userMax;
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    attempts = 0;
    guessHistory = [];
    message.textContent = `new range set: ${min} to ${max}. Start guessing!`;
    message.style.color = "green";
    guessInput.value = "";
    historyDisplay.textContent = "";
    checkButton.disabled = false;
    timerDuration = 15;
    timerDisplay.textContent = `Time left: ${timerDuration}s`;
    stopTimer();
    startTimer();
});
// ---------------------------------------

// ---------------------------------------
// Guess checking logic
checkButton.addEventListener("click", () => {
    let userGuess = Number(guessInput.value);

    if (isNaN(userGuess) || userGuess < min || userGuess > max) {
        message.textContent = `Enter a number between ${min} and ${max}!`;
        message.style.color = "red";
        return;
    }

    attempts++;
    guessHistory.push(userGuess);

    if (userGuess === randomNumber) {
        correct.play();
        message.textContent = `🎉 You guessed it right in ${attempts} attempts!`;
        message.style.color = "green";
        checkButton.disabled = true;
        stopTimer();
    } else if (userGuess < randomNumber) {
        message.textContent = "Try a higher number!";
        message.style.color = "blue";
    } else {
        message.textContent = "Try a lower number!";
        message.style.color = "blue";
    }

    historyDisplay.textContent = `Your guesses: ${guessHistory.join(", ")}`;

    if (attempts === 3) {
        giveHint();
    }

    guessInput.value = "";
    guessInput.focus();
});
// ---------------------------------------

// ---------------------------------------
// Give Hint For You
function giveHint() {
    let hint = randomNumber + Math.floor(Math.random() * (hintRange * 2 + 1)) - hintRange;
    message.textContent = `Hint: You are near ${hint}`;
    message.style.color = "brown";
}

// Timer Function
function startTimer() {
    timerId = setInterval(() => {
        if (timerDuration > 0) {
            timerDuration--;
            timerDisplay.textContent = `Time left: ${timerDuration}s`;
        } else {
            message.textContent = `My number was : ${randomNumber}`;
            message.style.color = "red";
            checkButton.disabled = true;

            incorrect.play();
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

// Prevent inspect element(Ctrl + Shift + i , Ctrl + Shift + v , F12 , RightClick)
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 123 || 
        (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 67))) {
        event.preventDefault();
    }
});
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});
