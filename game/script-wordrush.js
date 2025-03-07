const wordInput = document.getElementById('word-input');
const addBtn = document.getElementById('add-btn');
const wordList = document.getElementById('word-list');
const startStudyBtn = document.getElementById('start-study-btn');
const inputNewWordsBtn = document.getElementById('input-new-words-btn');
const restartBtn = document.getElementById('restart-btn');
const inputPhase = document.getElementById('input-phase');
const studyPhase = document.getElementById('study-phase');
const gamePhase = document.getElementById('game-phase');
const timerDisplay = document.getElementById('timer');
const studyBox = document.getElementById('study-box');
const playBtn = document.getElementById('play-btn');
const addTimeBtn = document.getElementById('add-time-btn');
const startBtn = document.getElementById('start-btn');
const answerBoxes = document.getElementById('answer-boxes');
const letterPool = document.getElementById('letter-pool');
const feedback = document.getElementById('feedback');
const clearBtn = document.getElementById('clear-btn');
const submitBtn = document.getElementById('submit-btn');
const answerBtn = document.getElementById('answer-btn');
const replayBtn = document.getElementById('replay-btn');

let studyWords = [];
let shuffledLetters = [];
let tileIdCounter = 0;
let timer;
let selectedBox = null;

addBtn.addEventListener('click', () => {
    const word = wordInput.value.trim().toLowerCase();
    if (word && studyWords.length < 8 && !studyWords.includes(word)) {
        studyWords.push(word);
        wordList.textContent = `Words: ${studyWords.join(', ')}`;
        wordInput.value = '';
        if (studyWords.length >= 2) startStudyBtn.style.display = 'block';
    } else if (studyWords.length >= 8) {
        feedback.textContent = 'Maximum 8 words reached!';
    }
});

startStudyBtn.addEventListener('click', () => {
    inputPhase.style.display = 'none';
    studyPhase.style.display = 'block';
    startStudyPhase();
});

function startStudyPhase() {
    studyBox.textContent = `Study these words: ${studyWords.join(', ')}`;
    let timeLeft = 60;
    timerDisplay.textContent = `Study Time: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Study Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            startBtn.style.display = 'block';
            playBtn.style.display = 'none';
            addTimeBtn.style.display = 'none';
        }
    }, 1000);
}

playBtn.addEventListener('click', () => {
    clearInterval(timer);
    studyPhase.style.display = 'none';
    gamePhase.style.display = 'block';
    setupGame();
});

addTimeBtn.addEventListener('click', () => {
    clearInterval(timer);
    let timeLeft = 120;
    timerDisplay.textContent = `Study Time: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Study Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            startBtn.style.display = 'block';
            playBtn.style.display = 'none';
            addTimeBtn.style.display = 'none';
        }
    }, 1000);
});

startBtn.addEventListener('click', () => {
    studyPhase.style.display = 'none';
    gamePhase.style.display = 'block';
    setupGame();
});

inputNewWordsBtn.addEventListener('click', () => {
    resetGame(false);
});

restartBtn.addEventListener('click', () => {
    resetGame(true);
});

function resetGame(fullReset) {
    studyWords = [];
    shuffledLetters = [];
    tileIdCounter = 0;
    selectedBox = null;
    inputPhase.style.display = 'block';
    studyPhase.style.display = 'none';
    gamePhase.style.display = 'none';
    wordList.textContent = '';
    feedback.textContent = '';
    startStudyBtn.style.display = 'none';
    inputNewWordsBtn.style.display = 'none';
    answerBoxes.innerHTML = '';
    letterPool.innerHTML = '';
    if (fullReset) {
        clearBtn.style.display = 'none';
        submitBtn.style.display = 'none';
        answerBtn.style.display = 'none';
        replayBtn.style.display = 'none';
        restartBtn.style.display = 'none';
    }
}

function setupGame() {
    shuffledLetters = shuffleArray(studyWords.join('').split('')).map((letter, index) => ({
        letter,
        id: `tile-${tileIdCounter++}`
    }));
    
    for (let i = 0; i < studyWords.length; i++) {
        const box = document.createElement('div');
        box.className = 'answer-box';
        box.id = `answer-box-${i}`;
        box.addEventListener('click', (e) => {
            e.preventDefault();
            selectBox(box);
        });
        answerBoxes.appendChild(box);
    }

    renderLetterPool();
    replayBtn.style.display = 'block';
    inputNewWordsBtn.style.display = 'block';
    restartBtn.style.display = 'block';
    submitBtn.style.display = 'block';
    answerBtn.style.display = 'block';
    clearBtn.style.display = 'block';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderLetterPool() {
    letterPool.innerHTML = '';
    shuffledLetters.forEach(({ letter, id }) => {
        const tile = createTile(letter, id);
        letterPool.appendChild(tile);
    });
}

function createTile(letter, id) {
    const tile = document.createElement('div');
    tile.className = 'letter-tile';
    tile.textContent = letter;
    tile.dataset.id = id;
    tile.addEventListener('click', (e) => {
        e.preventDefault();
        const fromPool = tile.parentElement.id === 'letter-pool';
        if (fromPool && selectedBox) {
            moveTileToBox(tile, selectedBox);
        } else if (!fromPool) {
            moveTileToPool(tile);
        }
    });
    return tile;
}

function selectBox(box) {
    if (selectedBox && selectedBox !== box) {
        selectedBox.classList.remove('selected');
    }
    if (selectedBox === box) {
        box.classList.remove('selected');
        selectedBox = null;
    } else {
        box.classList.add('selected');
        selectedBox = box;
    }
}

function moveTileToBox(tile, box) {
    const letter = tile.textContent;
    const id = tile.dataset.id;
    const newTile = createTile(letter, id);
    box.appendChild(newTile);
    const index = shuffledLetters.findIndex(item => item.id === id);
    if (index !== -1) {
        shuffledLetters.splice(index, 1);
        tile.parentElement.removeChild(tile);
        renderLetterPool();
    }
}

function moveTileToPool(tile) {
    const letter = tile.textContent;
    shuffledLetters.push({ letter, id: `tile-${tileIdCounter++}` });
    tile.parentElement.removeChild(tile);
    renderLetterPool();
}

submitBtn.addEventListener('click', () => {
    feedback.textContent = '';
    let allCorrect = true;
    const usedWords = new Set();

    for (let i = 0; i < studyWords.length; i++) {
        const box = document.getElementById(`answer-box-${i}`);
        const submittedLetters = Array.from(box.querySelectorAll('.letter-tile')).map(tile => tile.textContent.toLowerCase());
        const submittedWord = submittedLetters.join('');
        let isCorrect = false;

        for (let studyWord of studyWords) {
            if (!usedWords.has(studyWord) && submittedWord === studyWord) {
                isCorrect = true;
                usedWords.add(studyWord);
                break;
            }
        }

        box.classList.remove('correct', 'incorrect');
        if (isCorrect) {
            box.classList.add('correct');
        } else {
            box.classList.add('incorrect');
            allCorrect = false;
        }
    }

    feedback.textContent = allCorrect ? 'All words are correct!' : 'Some words are incorrect';
});

answerBtn.addEventListener('click', () => {
    answerBoxes.innerHTML = '';
    for (let i = 0; i < studyWords.length; i++) {
        const box = document.createElement('div');
        box.className = 'answer-box';
        box.id = `answer-box-${i}`;
        const word = studyWords[i].toLowerCase().split('');
        word.forEach(letter => {
            const tile = createTile(letter, `tile-${tileIdCounter++}`);
            tile.style.pointerEvents = 'none';
            box.appendChild(tile);
        });
        answerBoxes.appendChild(box);
    }
    feedback.textContent = 'Answers revealed!';
    clearBtn.style.display = 'block';
    submitBtn.style.display = 'none';
    answerBtn.style.display = 'none';
});

clearBtn.addEventListener('click', () => {
    shuffledLetters = shuffleArray(studyWords.join('').split('')).map((letter, index) => ({
        letter,
        id: `tile-${tileIdCounter++}`
    }));
    answerBoxes.innerHTML = '';
    feedback.textContent = '';
    selectedBox = null;
    setupGame();
});

replayBtn.addEventListener('click', () => {
    shuffledLetters = shuffleArray(studyWords.join('').split('')).map((letter, index) => ({
        letter,
        id: `tile-${tileIdCounter++}`
    }));
    answerBoxes.innerHTML = '';
    feedback.textContent = '';
    selectedBox = null;
    setupGame();
});