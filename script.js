const SIZE = 8;

const boardEl = document.getElementById("board");
const piecesEl = document.getElementById("pieces");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("gameOver");

let board = [];
let score = 0;
let selectedPiece = null;
const blocks = [
    // 1 kotak
    [[1]],

    // 2 horizontal
    [[1,1]],

    // 2 vertical
    [[1],[1]],

    // 3 horizontal
    [[1,1,1]],

    // 3 vertical
    [[1],[1],[1]],

    // L kecil
    [[1,0],
     [1,1]],

    // L terbalik
    [[0,1],
     [1,1]],

    // T shape
    [[1,1,1],
     [0,1,0]],

    // persegi 2x2
    [[1,1],
     [1,1]],

    // garis 4
    [[1,1,1,1]],

    // L panjang
    [[1,0,0],
     [1,1,1]],

    // zigzag
    [[1,1,0],
     [0,1,1]]
];

// =====================
// INIT BOARD
// =====================
function createBoard() {
    boardEl.innerHTML = "";
    board = [];

    for (let y = 0; y < SIZE; y++) {
        board[y] = [];
        for (let x = 0; x < SIZE; x++) {
            board[y][x] = 0;

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;

            cell.addEventListener("click", () => placePiece(x, y));

            boardEl.appendChild(cell);
        }
    }
}

// =====================
// DRAW BOARD
// =====================
function drawBoard() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        const x = cell.dataset.x;
        const y = cell.dataset.y;

        if (board[y][x] === 1) {
            cell.classList.add("filled");
        } else {
            cell.classList.remove("filled");
        }
    });
}

// =====================
// CREATE PIECES
// =====================
function createPieces() {
    piecesEl.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const shape = blocks[Math.floor(Math.random() * blocks.length)];

        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.draggable = true;

        piece.innerText = "Block";

        piece.addEventListener("dragstart", () => {
            selectedPiece = shape;
        });

        piecesEl.appendChild(piece);
    }
}

// =====================
// CHECK VALID POSITION
// =====================
function canPlace(shape, x, y) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
                if (
                    y + r >= SIZE ||
                    x + c >= SIZE ||
                    board[y + r][x + c] === 1
                ) {
                    return false;
                }
            }
        }
    }
    return true;
}

// =====================
// PLACE PIECE
// =====================
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
    checkGameOver();
}

// =====================
// CLEAR ROWS & COLS
// =====================
function clearLines() {
    let cleared = 0;

    // ROWS
    for (let y = 0; y < SIZE; y++) {
        if (board[y].every(cell => cell === 1)) {
            board[y].fill(0);
            cleared++;
        }
    }

    // COLS
    for (let x = 0; x < SIZE; x++) {
        let full = true;

        for (let y = 0; y < SIZE; y++) {
            if (board[y][x] === 0) {
                full = false;
                break;
            }
        }

        if (full) {
            for (let y = 0; y < SIZE; y++) {
                board[y][x] = 0;
            }
            cleared++;
        }
    }

    score += cleared * 100;
    scoreEl.innerText = "Score: " + score;
}

// =====================
// GAME OVER CHECK
// =====================
function checkGameOver() {
    for (let i = 0; i < blocks.length; i++) {
        const shape = blocks[i];

        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                if (canPlace(shape, x, y)) {
                    return;
                }
            }
        }
    }

    gameOverEl.classList.remove("hidden");
}

// =====================
// START GAME
// =====================
createBoard();
createPieces();
drawBoard();
