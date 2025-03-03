const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const wordDisplay = document.getElementById("wordDisplay");

// Responsive canvas size
canvas.width = Math.min(800, window.innerWidth * 0.9);
canvas.height = Math.min(600, window.innerHeight * 0.7);

// Player (plane) properties
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    speed: 8, // Increased for better responsiveness
    dx: 0
};

// Bullet properties
const bullets = [];
const bulletSpeed = 7;

// Word list and rows
const wordList = ["tree", "apple", "orange", "grass"];
const rows = [];
let currentWordIndex = 0;
let currentWord = wordList[currentWordIndex];
let spelledWord = "";

// Initialize rows with letters from words
function createRows() {
    wordList.forEach((word, rowIndex) => {
        const row = [];
        word.split("").forEach((letter, colIndex) => {
            row.push({
                x: colIndex * (canvas.width / 12) + 20,
                y: rowIndex * (canvas.height / 10) + 20,
                width: canvas.width / 15,
                height: canvas.height / 15,
                letter,
                alive: true
            });
        });
        rows.push({ blocks: row, direction: 1, speed: 1 });
    });
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw bullets
function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Draw letter blocks
function drawBlocks() {
    ctx.font = `${canvas.width / 25}px Arial`;
    rows.forEach(row => {
        row.blocks.forEach(block => {
            if (block.alive) {
                ctx.fillStyle = "green";
                ctx.fillRect(block.x, block.y, block.width, block.height);
                ctx.fillStyle = "white";
                ctx.fillText(block.letter, block.x + block.width / 3, block.y + block.height / 1.5);
            }
        });
    });
}

// Move player
function movePlayer() {
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    // Dampen movement for smoother stop
    player.dx *= 0.9;
}

// Move bullets
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

// Move rows
function moveRows() {
    rows.forEach(row => {
        let edge = false;
        row.blocks.forEach(block => {
            if (block.alive) {
                block.x += row.speed * row.direction;
                if (block.x + block.width > canvas.width || block.x < 0) {
                    edge = true;
                }
            }
        });
        if (edge) {
            row.direction *= -1;
            row.blocks.forEach(block => (block.y += canvas.height / 60));
        }
    });
}

// Check collisions and spelling
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        const currentRow = rows[currentWordIndex];
        currentRow.blocks.forEach((block, blockIndex) => {
            if (block.alive &&
                bullet.x < block.x + block.width &&
                bullet.x + bullet.width > block.x &&
                bullet.y < block.y + block.height &&
                bullet.y + bullet.height > block.y) {
                const nextLetter = currentWord[spelledWord.length];
                if (block.letter === nextLetter) {
                    block.alive = false;
                    spelledWord += block.letter;
                    bullets.splice(bulletIndex, 1);
                    if (spelledWord === currentWord) {
                        currentRow.blocks.forEach(block => (block.alive = false));
                        currentWordIndex++;
                        if (currentWordIndex < wordList.length) {
                            currentWord = wordList[currentWordIndex];
                            spelledWord = "";
                        } else {
                            alert("You Win! Refresh to play again.");
                            currentWordIndex = 0;
                            currentWord = wordList[currentWordIndex];
                            spelledWord = "";
                            rows.forEach(row => row.blocks.forEach(block => (block.alive = true)));
                        }
                    }
                }
            }
        });
    });
}

// Update game state
function update() {
    movePlayer();
    moveBullets();
    moveRows();
    checkCollisions();
    wordDisplay.textContent = `${spelledWord || ''}${currentWord.slice(spelledWord.length)}`;
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawBlocks();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Touch controls
let touchStartX = null;
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 10
    });
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (touchStartX !== null) {
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - touchStartX;
        player.dx = deltaX * 0.5; // Adjusted sensitivity for smoother control
        touchStartX = touchX;
    }
});

canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    touchStartX = null;
});

// Keyboard fallback for desktop
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.dx = -player.speed;
    if (e.key === "ArrowRight") player.dx = player.speed;
    if (e.key === " ") {
        bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y,
            width: 4,
            height: 10
        });
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") player.dx = 0;
});

// Start game
createRows();
wordDisplay.textContent = currentWord;
gameLoop();