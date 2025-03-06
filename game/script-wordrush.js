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
let timer;

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
    studyWords = [];
    shuffledLetters = [];
    inputPhase.style.display = 'block';
    studyPhase.style.display = 'none';
    gamePhase.style.display = 'none';
    wordList.textContent = '';
    feedback.textContent = '';
    startStudyBtn.style.display = 'none';
    inputNewWordsBtn.style.display = 'none';
    answerBoxes.innerHTML = '';
    letterPool.innerHTML = '';
});

restartBtn.addEventListener('click', () => {
    studyWords = [];
    shuffledLetters = [];
    inputPhase.style.display = 'block';
    studyPhase.style.display = 'none';
    gamePhase.style.display = 'none';
    wordList.textContent = '';
    feedback.textContent = '';
    startStudyBtn.style.display = 'none';
    inputNewWordsBtn.style.display = 'none';
    answerBoxes.innerHTML = '';
    letterPool.innerHTML = '';
    clearBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    answerBtn.style.display = 'none';
    replayBtn.style.display = 'none';
    restartBtn.style.display = 'none';
});

function setupGame() {
    shuffledLetters = shuffleArray(studyWords.join('').split(''));
    
    for (let i = 0; i < studyWords.length; i++) {
        const box = document.createElement('div');
        box.className = 'answer-box';
        box.id = `answer-box-${i}`;
        box.addEventListener('dragover', (e) => e.preventDefault());
        box.addEventListener('drop', (e) => dropLetter(e, false));
        answerBoxes.appendChild(box);
    }

    letterPool.addEventListener('dragover', (e) => e.preventDefault());
    letterPool.addEventListener('drop', (e) => dropLetter(e, true));
    renderLetterPool();
    replayBtn.style.display = 'block';
    inputNewWordsBtn.style.display = 'block';
    restartBtn.style.display = 'block';
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
    shuffledLetters.forEach((letter, index) => {
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        tile.draggable = true;
        tile.dataset.index = index;
        addDragEvents(tile);
        letterPool.appendChild(tile);
    });
}

function addDragEvents(tile) {
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('touchstart', touchStart, { passive: false });
    tile.addEventListener('touchmove', touchMove, { passive: false });
    tile.addEventListener('touchend', touchEnd, { passive: false });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.setData('index', e.target.dataset.index);
    e.dataTransfer.setData('fromPool', e.target.parentElement.id === 'letter-pool');
}

let draggedTile = null;
function touchStart(e) {
    e.preventDefault();
    draggedTile = e.target;
    draggedTile.style.opacity = '0.5';
}

function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    draggedTile.style.position = 'absolute';
    draggedTile.style.left = `${touch.pageX - 25}px`;
    draggedTile.style.top = `${touch.pageY - 25}px`;
}

function touchEnd(e) {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const dropZone = document.elementFromPoint(touch.pageX, touch.pageY);
    if (dropZone && (dropZone.className.includes('answer-box') || dropZone.id === 'letter-pool')) {
        dropLetter({
            target: dropZone,
            dataTransfer: {
                getData: (key) => key === 'text/plain' ? draggedTile.textContent : key === 'fromPool' ? (draggedTile.parentElement.id === 'letter-pool') : draggedTile.dataset.index
            }
        }, dropZone.id === 'letter-pool');
    }
    draggedTile.style.opacity = '1';
    draggedTile.style.position = 'static';
    draggedTile = null;
}

function dropLetter(e, toPool) {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    const index = e.dataTransfer.getData('index');
    const fromPool = e.dataTransfer.getData('fromPool') === 'true';
    
    if (toPool) {
        if (!fromPool) {
            // Dragging from box to pool
            shuffledLetters.push(letter);
            const draggedTile = e.target.parentElement.querySelector(`.letter-tile[data-index="${index}"]`) || e.target;
            if (draggedTile && draggedTile.parentElement) {
                draggedTile.parentElement.removeChild(draggedTile);
            }
            renderLetterPool();
        }
    } else {
        // Dragging to answer box
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        tile.draggable = true;
        tile.dataset.index = index;
        addDragEvents(tile);
        e.target.appendChild(tile);
        if (fromPool) {
            shuffledLetters.splice(index, 1);
            renderLetterPool();
        } else {
            const draggedTile = e.target.parentElement.querySelector(`.letter-tile[data-index="${index}"]`) || e.target;
            if (draggedTile && draggedTile.parentElement) {
                draggedTile.parentElement.removeChild(draggedTile);
            }
        }
    }
}

function countLetters(word) {
    const frequency = {};
    for (let char of word) {
        frequency[char] = (frequency[char] || 0) + 1;
    }
    return frequency;
}

submitBtn.addEventListener('click', () => {
    feedback.textContent = '';
    let allCorrect = true;
    const usedWords = new Set();
    const answerWords = [];

    for (let i = 0; i < studyWords.length; i++) {
        const box = document.getElementById(`answer-box-${i}`);
        const submittedLetters = Array.from(box.querySelectorAll('.letter-tile')).map(tile => tile.textContent.toLowerCase());
        const submittedWord = submittedLetters.join('');
        answerWords.push({ word: submittedWord, boxIndex: i });
    }

    for (let { word, boxIndex } of answerWords) {
        const box = document.getElementById(`answer-box-${boxIndex}`);
        let isCorrect = false;

        for (let studyWord of studyWords) {
            if (!usedWords.has(studyWord) && word === studyWord) {
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
        console.log(`Box ${boxIndex}: Submitted [${word}], Correct: ${isCorrect}, Used Words: ${[...usedWords]}`);
    }

    feedback.textContent = allCorrect ? 'All words are correct!' : 'Some words are incorrect.';
});

answerBtn.addEventListener('click', () => {
    answerBoxes.innerHTML = '';
    for (let i = 0; i < studyWords.length; i++) {
        const box = document.createElement('div');
        box.className = 'answer-box';
        box.id = `answer-box-${i}`;
        const word = studyWords[i].toLowerCase().split('');
        word.forEach(letter => {
            const tile = document.createElement('div');
            tile.className = 'letter-tile';
            tile.textContent = letter;
            box.appendChild(tile);
        });
        box.style.pointerEvents = 'none';
        answerBoxes.appendChild(box);
    }
    feedback.textContent = 'Answers revealed!';
    clearBtn.style.display = 'block';
    submitBtn.style.display = 'none';
    answerBtn.style.display = 'none';
    replayBtn.style.display = 'block';
    inputNewWordsBtn.style.display = 'block';
    restartBtn.style.display = 'block';
});

clearBtn.addEventListener('click', () => {
    shuffledLetters = shuffleArray(studyWords.join('').split(''));
    answerBoxes.innerHTML = '';
    feedback.textContent = '';
    setupGame();
    submitBtn.style.display = 'block';
    answerBtn.style.display = 'block';
    clearBtn.style.display = 'block';
});

replayBtn.addEventListener('click', () => {
    shuffledLetters = shuffleArray(studyWords.join('').split(''));
    answerBoxes.innerHTML = '';
    feedback.textContent = '';
    setupGame();
    submitBtn.style.display = 'block';
    answerBtn.style.display = 'block';
    clearBtn.style.display = 'block';
    inputNewWordsBtn.style.display = 'block';
    restartBtn.style.display = 'block';
});

inputNewWordsBtn.addEventListener('click', () => {
    studyWords = [];
    shuffledLetters = [];
    inputPhase.style.display = 'block';
    studyPhase.style.display = 'none';
    gamePhase.style.display = 'none';
    wordList.textContent = '';
    feedback.textContent = '';
    startStudyBtn.style.display = 'none';
    inputNewWordsBtn.style.display = 'none';
    answerBoxes.innerHTML = '';
    letterPool.innerHTML = '';
});

restartBtn.addEventListener('click', () => {
    studyWords = [];
    shuffledLetters = [];
    inputPhase.style.display = 'block';
    studyPhase.style.display = 'none';
    gamePhase.style.display = 'none';
    wordList.textContent = '';
    feedback.textContent = '';
    startStudyBtn.style.display = 'none';
    inputNewWordsBtn.style.display = 'none';
    answerBoxes.innerHTML = '';
    letterPool.innerHTML = '';
    clearBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    answerBtn.style.display = 'none';
    replayBtn.style.display = 'none';
    restartBtn.style.display = 'none';
});