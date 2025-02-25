// Word data with meanings and examples
const wordData = {
    "stock": {
        meaning: "A slice of ownership of one or more companies or a collection of investor holdings or a portfolio in stock market",
        example: "The stock market is flourishing this month."
    },
    "consumption": {
        meaning: "The act of using or eating something.",
        example: "High consumption of sugar can harm your health."
    },
    "market": {
        meaning: "A place or system where goods are bought and sold.",
        example: "She sells her handmade jewelry at the local market."
    },
    "manufacturing": {
        meaning: "The process of making products using machines or labor.",
        example: "The city is known for manufacturing cars and electronics."
    },
    "barrier": {
        meaning: "Anything serving to obstruct passage or to maintain separation, such as a fence or gate.",
        example: "The most common barrier to trade is a tariff–a tax on imports."
    },
    "immigrate": {
        meaning: "To move to another country to live permanently.",
        example: "Her family decided to immigrate to Canada for better opportunities."
    },
    "affluence": {
        meaning: "The state of having a lot of money or wealth.",
        example: "The neighborhood’s affluence was clear from the luxury cars."
    },
    "inflation": {
        meaning: "A rise in prices that reduces money’s buying power.",
        example: "Inflation made groceries more expensive this year."
    },
    "prosperous": {
        meaning: "Successful and wealthy.",
        example: "The prosperous town attracted many new businesses."
    },
    "tariff": {
        meaning: "A tax on goods coming into or leaving a country.",
        example: "The government raised the tariff on imported steel."
    },
    "accounting": {  
        meaning: "The process of recording and managing financial records.",
        example: "She studied accounting to manage her company’s budget."
    },
    "outsource": { 
        meaning: "To hire another company to do work for you.",
        example: "They outsource customer service to save money."
    },
    "factory": {  
        meaning: "A building where goods are made by machines.",
        example: "The factory produces thousands of toys every day."
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