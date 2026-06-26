const SIZE = 8;

const boardEl = document.getElementById("board");
const piecesEl = document.getElementById("pieces");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("gameOver");

let board = [];
let score = 0;
let selectedPiece = null;

const blocks = [
    [[1]],
    [[1,1]],
    [[1],[1]],
    [[1,1,1]],
    [[1],[1],[1]],
    [[1,1],[1,1]],
    [[1,0],[1,1]],
    [[0,1],[1,1]],
    [[1,1,1],[0,1,0]]
];

// BOARD
function createBoard() {
    boardEl.innerHTML = "";
    board = [];

    for (let y = 0; y < SIZE; y++) {
        board[y] = [];

        for (let x = 0; x < SIZE; x++) {
            board[y][x] = 0;

            const cell = document.createElement("div");
            cell.className = "cell";

            cell.dataset.x = x;
            cell.dataset.y = y;

            cell.onclick = () => placePiece(x, y);

            boardEl.appendChild(cell);
        }
    }
}

function drawBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        const x = cell.dataset.x;
        const y = cell.dataset.y;

        cell.classList.toggle("filled", board[y][x] === 1);
    });
}

// PIECES
function createPieces() {
    piecesEl.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const shape = blocks[Math.floor(Math.random() * blocks.length)];

        const piece = document.createElement("div");
        piece.className = "piece";

        piece.style.gridTemplateColumns = `repeat(${shape[0].length}, 18px)`;

        shape.forEach(row => {
            row.forEach(v => {
                const d = document.createElement("div");
                d.className = "piece-cell";
                if (!v) d.style.opacity = "0";
                piece.appendChild(d);
            });
        });

        piece.onclick = () => selectedPiece = shape;

        piecesEl.appendChild(piece);
    }
}

// CHECK
function canPlace(shape, x, y) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
                if (
                    y + r >= SIZE ||
                    x + c >= SIZE ||
                    board[y + r][x + c]
                ) return false;
            }
        }
    }
    return true;
}

// PLACE
function placePiece(x, y) {
    if (!selectedPiece) return;
    if (!canPlace(selectedPiece, x, y)) return;

    for (let r = 0; r < selectedPiece.length; r++) {
        for (let c = 0; c < selectedPiece[r].length; c++) {
            if (selectedPiece[r][c]) {
                board[y + r][x + c] = 1;
            }
        }
    }

    selectedPiece = null;

    clearLines();
    drawBoard();
    createPieces();
    checkGameOver();
}

// CLEAR
function clearLines() {
    let cleared = 0;

    for (let y = 0; y < SIZE; y++) {
        if (board[y].every(v => v === 1)) {
            board[y].fill(0);
            cleared++;
        }
    }

    for (let x = 0; x < SIZE; x++) {
        let full = true;

        for (let y = 0; y < SIZE; y++) {
            if (!board[y][x]) full = false;
        }

        if (full) {
            for (let y = 0; y < SIZE; y++) board[y][x] = 0;
            cleared++;
        }
    }

    score += cleared * 100;
    scoreEl.innerText = "Score: " + score;
}

// GAME OVER
function checkGameOver() {
    for (let b of blocks) {
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                if (canPlace(b, x, y)) return;
            }
        }
    }

    gameOverEl.classList.remove("hidden");
}

// START
createBoard();
createPieces();
drawBoard();
