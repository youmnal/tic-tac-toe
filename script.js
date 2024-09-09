let board;
let currentPlayer;
let gameMode; // 0: two players, 1: player vs computer

const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const twoPlayersButton = document.getElementById('two-players');
const computerButton = document.getElementById('computer');

twoPlayersButton.addEventListener('click', () => {
    gameMode = 0;
    startGame();
});

computerButton.addEventListener('click', () => {
    gameMode = 1;
    startGame();
});

function startGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameBoard.classList.remove('hidden');
    message.classList.add('hidden');
    restartButton.classList.add('hidden');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!board[index]) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            message.textContent = `${currentPlayer} wins!`;
            message.classList.remove('hidden');
            restartButton.classList.remove('hidden');
            cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        } else if (board.every(cell => cell)) {
            message.textContent = 'It\'s a draw!';
            message.classList.remove('hidden');
            restartButton.classList.remove('hidden');
            cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 1 && currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function computerMove() {
    const availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} wins!`;
        message.classList.remove('hidden');
        restartButton.classList.remove('hidden');
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else if (board.every(cell => cell)) {
        message.textContent = 'It\'s a draw!';
        message.classList.remove('hidden');
        restartButton.classList.remove('hidden');
    } else {
        currentPlayer = 'X';
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

restartButton.addEventListener('click', startGame);
