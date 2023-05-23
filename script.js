// Constants
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY_CELL = '';
const WINNING_COMBINATIONS = [
  [[0, 0], [0, 1], [0, 2]],  // Row 1
  [[1, 0], [1, 1], [1, 2]],  // Row 2
  [[2, 0], [2, 1], [2, 2]],  // Row 3
  [[0, 0], [1, 0], [2, 0]],  // Column 1
  [[0, 1], [1, 1], [2, 1]],  // Column 2
  [[0, 2], [1, 2], [2, 2]],  // Column 3
  [[0, 0], [1, 1], [2, 2]],  // Diagonal 1
  [[0, 2], [1, 1], [2, 0]]   // Diagonal 2
];

// Game state
let board = [
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]
];
let currentPlayer = PLAYER_X;
let gameOver = false;
let gameMode = '';

// Function to select game mode
function selectMode(mode) {
  gameMode = mode;
  document.getElementById('mode-selection').style.display = 'none';
  document.getElementById('board').style.display = 'flex';
  document.getElementById('message').innerHTML = '';

  if (gameMode === 'single') {
    currentPlayer = PLAYER_X;
  }
  document.getElementsByTagName('button')[0].style.display = 'none'; // Hide Single Player button
  document.getElementsByTagName('button')[1].style.display = 'none'; // Hide Multiplayer button
  document.getElementsByTagName('button')[2].style.display = 'block'; // Show Reset button
}

// Function to make a move
function makeMove(row, col) {
  if (!gameOver && board[row][col] === EMPTY_CELL) {
    board[row][col] = currentPlayer;
    document.getElementById('message').innerHTML = '';

    // Update cell text
    const cell = document.getElementsByClassName('row')[row].getElementsByClassName('cell')[col];
    cell.innerHTML = currentPlayer;

    // Check for a winner
    if (checkWinner(currentPlayer)) {
      document.getElementById('message').innerHTML = `Player ${currentPlayer} wins!`;
      gameOver = true;
    } else if (checkDraw()) {
      document.getElementById('message').innerHTML = 'It\'s a draw!';
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

      if (gameMode === 'single' && currentPlayer === PLAYER_O) {
        makeComputerMove();
      }
    }
  }
}

// Function to make a move by the computer in single player mode
function makeComputerMove() {
  let availableCells = [];

  // Find available cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === EMPTY_CELL) {
        availableCells.push([row, col]);
      }
    }
  }

  // Choose a random available cell
  const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  makeMove(randomCell[0], randomCell[1]);
}

// Function to check for a winner
function checkWinner(player) {
  for (let combination of WINNING_COMBINATIONS) {
    let hasWon = true;
    for (let [row, col] of combination) {
      if (board[row][col] !== player) {
        hasWon = false;
        break;
      }
    }
    if (hasWon) {
      return true;
    }
  }
  return false;
}

// Function to check for a draw
function checkDraw() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === EMPTY_CELL) {
        return false;
      }
    }
  }
  return true;
}

// Function to reset the board
function resetBoard() {
  board = [
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]
  ];
  currentPlayer = PLAYER_X;
  gameOver = false;
  gameMode = '';

  // Clear cell text
  const cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.innerHTML = '';
  }

  document.getElementById('mode-selection').style.display = 'flex';
  document.getElementById('board').style.display = 'none';
  document.getElementById('message').innerHTML = '';
  document.getElementsByTagName('button')[0].style.display = 'block'; // Show Single Player button
  document.getElementsByTagName('button')[1].style.display = 'block'; // Show Multiplayer button
  document.getElementsByTagName('button')[2].style.display = 'none'; // Hide Reset button
}
