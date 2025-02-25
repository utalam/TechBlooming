// Game setup
const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]; // 12 cards, 6 pairs
shuffle(cards);
const matched = new Set();
let flippedCards = [];

const board = document.getElementById('game-board');

// Create card elements
cards.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.value = value;

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.style.backgroundImage = `url('images/${value}.jpg')`;
    card.appendChild(front);

    card.addEventListener('click', handleCardClick);
    board.appendChild(card);
});

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Handle clicks
function handleCardClick(event) {
    const card = event.target;
    const index = parseInt(card.dataset.index);

    if (matched.has(index) || flippedCards.includes(index) || flippedCards.length >= 2) return;

    card.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    const [index1, index2] = flippedCards;
    const card1 = document.querySelector(`[data-index="${index1}"]`);
    const card2 = document.querySelector(`[data-index="${index2}"]`);

    if (cards[index1] === cards[index2]) {
        matched.add(index1);
        matched.add(index2);
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Check win condition
function checkWin() {
    if (matched.size === cards.length) {
        setTimeout(() => alert("You won! All pairs matched!"), 500);
    }
}