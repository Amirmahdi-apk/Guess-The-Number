// create random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const checkButton = document.getElementById("checkButton");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
const body = document.getElementsByTagName("body");


checkButton.addEventListener("click", () => {
    let userGuess = Number(guessInput.value);

    // Checking if the number is correct
    if (isNaN(userGuess) || userGuess < 1 ||  userGuess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100!";
        message.style.color = "red";
        return;
    }

    attempts++;

    // check user guess
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

    guessInput.value = "";
    guessInput.focus();
});

// restart button
restartButton.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    message.textContent = "";
    guessInput.value = "";
    checkButton.disabled = false;
    restartButton.style.display = "none";
});
