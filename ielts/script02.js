// Word data with meanings and examples
const wordData = {
    "dollar": {
        meaning: "A unit of money",
        example: "She exchanged her euros for US dollars before traveling to New York."
    },
    "currency": {
        meaning: "A system of money used in a particular country or region.",
        example: "The local currency in Japan is the yen."
    },
    "exchange rate": {
        meaning: "The value of one currency compared to another for the purpose of conversion.",
        example: "The exchange rate between the pound and the euro fluctuated this week."
    },
    "interest": {
        meaning: "Money paid regularly at a particular rate for the use of borrowed money or for saving money.",
        example: "The bank offers a high interest rate on savings accounts."
    },
    "pension": {
        meaning: "A regular payment made to someone, typically after retirement, from a fund they or their employer contributed to.",
        example: "He relies on his pension to cover living expenses after retiring."
    },
    "fee": {
        meaning: "A payment made for professional services or as a charge for something.",
        example: "The lawyer charged a management fee for handling the case."
    },
    "cash": {
        meaning: "Money in the form of coins or notes, as opposed to checks or cards.",
        example: "She prefers paying with cash instead of using her credit card."
    },
    "invest": {
        meaning: "To put money into something with the expectation of gaining profit or benefit.",
        example: "They decided to invest in real estate to grow their wealth."
    },
    "loan": {
        meaning: "A sum of money borrowed, usually from a bank, that is repaid with interest.",
        example: "He took out a loan to buy his first car."
    },
    "bankrupt": {
        meaning: "Unable to pay debts, often leading to legal declaration of financial failure.",
        example: "The company went bankrupt after years of poor management."
    },
    "asset": {
        meaning: "Something valuable owned by a person or company that can be used or sold.",
        example: "Her house is her most valuable asset."
    },
    "credit": {
        meaning: "The ability to borrow money or obtain goods with the promise to pay later.",
        example: "He used his credit to purchase a new laptop."
    }
};

let currentWord = "";
let scrambled = "";
let score = 0; // Score persists until reset

// DOM elements
const scrambledLetters = document.getElementById("scrambled-letters");
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-guess");
const newWordButton = document.getElementById("new-word");
const showAnswerButton = document.getElementById("show-answer");
const resetScoreButton = document.getElementById("reset-score");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

// Shuffle function
function shuffle(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Start a new game
function newGame() {
    const words = Object.keys(wordData);
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambled = shuffle(currentWord);
    scrambledLetters.textContent = scrambled;
    guessInput.value = "";
    feedback.textContent = "";
    guessInput.focus();
}

// Check guess
function checkGuess() {
    const guess = guessInput.value.toLowerCase().trim();
    if (guess === currentWord) {
        score += 10; // Add 10 points for correct guess
        const { meaning, example } = wordData[currentWord];
        feedback.innerHTML = `Correct! Well done! (+10 points)<br><strong>Meaning:</strong> ${meaning}<br><strong>Example:</strong> ${example}`;
        feedback.style.color = "#28a745";
        updateScore();
    } else if (guess.length === 0) {
        feedback.textContent = "Please enter a guess.";
        feedback.style.color = "#dc3545";
    } else {
        feedback.textContent = `Wrong! Try again. (Hint: It’s a ${currentWord.length}-letter word)`;
        feedback.style.color = "#dc3545";
    }
}

// Show answer
function showAnswer() {
    score -= 5; // Deduct 5 points for showing answer
    if (score < 0) score = 0; // Prevent negative score
    const { meaning, example } = wordData[currentWord];
    feedback.innerHTML = `The word was: <strong>${currentWord}</strong> (-5 points)<br><strong>Meaning:</strong> ${meaning}<br><strong>Example:</strong> ${example}`;
    feedback.style.color = "#ff9900";
    updateScore();
}

// Reset score
function resetScore() {
    score = 0;
    updateScore();
    feedback.textContent = "Score reset to 0!";
    feedback.style.color = "#6666ff";
}

// Handle chapter button clicks to open in new tab
document.querySelectorAll('.chapter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const page = button.getAttribute('data-page');
        if (page) {
            window.open(page, '_blank'); // Open the page in a new tab
        }
    });
});

// Event listeners
submitButton.addEventListener("click", checkGuess);
newWordButton.addEventListener("click", newGame);
showAnswerButton.addEventListener("click", showAnswer);
resetScoreButton.addEventListener("click", resetScore);
guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkGuess();
});

// Start the game
newGame();