let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let guessHistory = [];

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
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100!";
        message.style.color = "red";
        return;
    }

    attempts++;

    // save the guess history
    guessHistory.push(userGuess);

    // Check user guess
    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed it right 🎉 + Attempts: ${attempts}`;
        message.style.color = "green";
        checkButton.disabled = true;
        restartButton.style.display = "inline";
    } else if (userGuess < randomNumber) {
        message.textContent = "Try a higher number!";
        message.style.color = "blue";
    } else {
        message.textContent = "Try a lower number!";
        message.style.color = "blue";
    }

    // Give hint after 3 wrong guesses
    if (attempts === 3) {
        giveHint(guessHistory);
    }

    guessInput.value = "";
    guessInput.focus();
});

// Function to give a hint based on guess history
function giveHint(guessHistory) {
    if (guessHistory.length === 0) {
        message.textContent = "Make some guesses first!";
        message.style.color = "red";
        return;
    }

    // Find the min and max of the guesses
    let minGuess = Math.min(...guessHistory);
    let maxGuess = Math.max(...guessHistory);

    // Provide the hint to the user
    message.textContent = `Hint: The number is between ${minGuess} and ${maxGuess}.`;
    message.style.color = "brown";
}

// Guide button to provide hint
guide.addEventListener("click", () => {
    giveHint(guessHistory);
});

// Restart button
restartButton.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessHistory = []; // Reset guess history
    message.textContent = "";
    guessInput.value = "";
    checkButton.disabled = false;
    restartButton.style.display = "none";
});
