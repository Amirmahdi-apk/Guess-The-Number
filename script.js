let randomNumber = Math.floor(Math.random() * 200) + 1;
let attempts = 0;
let guessHistory = [];
let hintRange = 10;
let timerDuration = 15;
let timerId;
let incorrect = new Audio('src/incorrect.mp3');
let correct = new Audio('src/correct.mp3');
// --------------------------------------------------------------
const guessInput = document.getElementById("guessInput");
const checkButton = document.getElementById("checkButton");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
const guide = document.getElementById("Guide-Button");
// --------------------------------------------------------------

checkButton.addEventListener("click", () => {
    let userGuess = Number(guessInput.value);

    // Checking if the number is correct
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 200) {
        message.textContent = "Please enter a valid number between 1 and 200!";
        message.style.color = "red";
        return;
    }

    attempts++;

    // save the guess history
    guessHistory.push(userGuess);

    // Check user guess
    if (userGuess === randomNumber) {
        correct.play();
        message.textContent = `Congratulations! You guessed it right 🎉 + Attempts: ${attempts}`;
        message.style.color = "green";
        checkButton.disabled = true;
        restartButton.style.display = "inline";
        stopTimer();
    } else if (userGuess < randomNumber) {
        message.textContent = "Try a higher number!";
        message.style.color = "blue";
    } else {
        message.textContent = "Try a lower number!";
        message.style.color = "blue";
    }
    // History of user guesses
    const historyDisplay = document.getElementById("history");
    historyDisplay.textContent = `Your guesses: ${guessHistory.join(",")}`;
    // -----------------------------------------------------------------------
    // Give hint after 3 wrong guesses
    if (attempts === 3) {
        giveHint(guessHistory);
    }

    guessInput.value = "";
    guessInput.focus();
});

// Function to give a hint based on guess history
function giveHint(guessHistory) {
    let hint = randomNumber + Math.floor(Math.random() * (hintRange * 2 + 1)) - hintRange;
    if (guessHistory.length === 0) {
        message.textContent = "Make some guesses first!";
        message.style.color = "red";
        return;
    }

    // Find the min and max of the guesses
    let minGuess = Math.min(...guessHistory);
    let maxGuess = Math.max(...guessHistory);

    // Provide the hint to the user
    message.textContent = `you are close to number. Hint: ${hint}`;
    message.style.color = "brown";
}
// timer function
function startTimer() {
    timerId = setInterval(() => {
        if (timerDuration > 0) {
            timerDuration--;
            timerDisplay.textContent = `Time left: ${timerDuration}s`;
        } else {
            message.textContent = "Time's up! Game over.";
            message.style.color = "red";
            checkButton.disabled = true;
            restartButton.style.display = "inline";
            message.textContent = `my number is : ${randomNumber}`;
            incorrect.play();
            stopTimer(); // Stop timer when time is up
        }
    }, 950);
}
function stopTimer() {
    clearInterval(timerId);
}
// Restart button
restartButton.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * 200) + 1;
    attempts = 0;
    guessHistory = []; // Reset guess history
    message.textContent = "";
    guessInput.value = "";
    checkButton.disabled = false;
    restartButton.style.display = "none";
    // reset the timer
    timerDuration = 15;
    timerDisplay.textContent = `Time left: ${timerDuration}s`;
    startTimer();
});

// prevention inspect element ( ctrl+shift+c , ctrl+shift+i , f12 & rightClick )
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 123) {
        event.preventDefault();
    }
    if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        event.preventDefault();
    }
    if (event.ctrlKey && event.shiftKey && event.keyCode == 67) {
        event.preventDefault();
    }
});

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});
