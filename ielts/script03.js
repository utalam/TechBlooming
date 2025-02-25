// Word data with meanings and examples
const wordData = {
    "beverage": {
        meaning: "A drink, typically other than water, such as tea, coffee, or juice.",
        example: "She prefers a hot beverage like tea in the morning to start her day."
    },
    "overweight": {
        meaning: "Having a body weight above what is considered normal or healthy.",
        example: "The doctor advised him to exercise more because he was overweight."
    },
    "necessary": {
        meaning: "Required or essential for a particular purpose or outcome.",
        example: "Eating vegetables is necessary for maintaining good health."
    },
    "healthy": {
        meaning: "In a state of good physical or mental well-being.",
        example: "A healthy lifestyle includes regular exercise and proper nutrition."
    },
    "vitamins": {
        meaning: "Organic compounds essential for normal growth and health, found in food.",
        example: "She takes a supplement to ensure she gets enough vitamins daily."
    },
    "balanced diet": {
        meaning: "A diet that includes a variety of foods in the right proportions to maintain health.",
        example: "A balanced diet helps prevent diseases and keeps energy levels stable."
    },
    "organic": {
        meaning: "Food produced without synthetic chemicals or genetically modified organisms.",
        example: "He prefers organic fruits because they are free from pesticides."
    },
    "vegetarian": {
        meaning: "A person or diet that excludes meat and sometimes other animal products.",
        example: "She became a vegetarian to support animal welfare and improve her health."
    },
    "malnourished": {
        meaning: "Suffering from poor nutrition due to insufficient or unbalanced food intake.",
        example: "The children in the region were malnourished due to a lack of fresh produce."
    },
    "nutrients": {
        meaning: "Substances in food that provide energy and support growth and repair.",
        example: "Fruits and vegetables are rich in essential nutrients like vitamins and minerals."
    },
    "snack": {
        meaning: "A small amount of food eaten between meals.",
        example: "He grabbed a healthy snack like an apple before his afternoon meeting."
    },
    "fat": {
        meaning: "A natural oily substance in food, some of which can be unhealthy in excess.",
        example: "Too much fat in your diet can lead to heart problems."
    },
    "harmful": {
        meaning: "Causing or capable of causing damage or injury.",
        example: "Excessive sugar intake can be harmful to your teeth and overall health."
    },
    "energy": {
        meaning: "The strength and vitality required for physical or mental activity, often from food.",
        example: "Eating breakfast gives me the energy I need to focus on my studies."
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