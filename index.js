const prompt = require('prompt');
const colors = require('colors');

let matrix;
let board;

const startGame = function() {
  prompt.get('Play Tic-Tac-Toe? y/n', function(err, results) {
    if (results['Play Tic-Tac-Toe? y/n'] === 'y') {
      initializeGame();
      return;
    } else if (results['Play Tic-Tac-Toe? y/n'] === 'n') {
      prompt.stop();
      return;
    } else {
      startGame();
      return;
    }
  })
}

const initializeGame = function() {
  matrix = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
  board = `  |   |   |   |
   --  --  --
  |   |   |   |
   --  --  --
  |   |   |   | `;
  player1Move();
  return;
}



const checkBoard = function (playerNum) {
  for (let row of matrix) {
    if (matrix.filter(x => x === playerNum).length === 3) {
      return true;
    }
  }
  if (matrix[0][0] === playerNum && matrix[1][1] === playerNum && matrix[2][2] === playerNum) return true;
  if (matrix[0][2] === playerNum && matrix[1][1] === playerNum && matrix[2][0] === playerNum) return true;
  if (matrix[0][0] === playerNum && matrix[1][0] === playerNum && matrix[2][0] === playerNum) return true;
  if (matrix[0][1] === playerNum && matrix[1][1] === playerNum && matrix[2][1] === playerNum) return true;
  if (matrix[0][2] === playerNum && matrix[1][2] === playerNum && matrix[2][2] === playerNum) return true;
  return false;
}

const player1Move = function() {
  for (let row of matrix) {
    console.log(row)
  }
  console.log('Player 1 enter:');
  prompt.get(['rowIndex', 'columnIndex'], function(err, results) {
    if (Number(results.columnIndex) > 2 || results.rowIndex > 2) {
      console.log('Invalid Position');
      player1Move();
      return;
    }
    if (!matrix[results.rowIndex][results.columnIndex]) {
      console.log('YES');
      matrix[results.rowIndex][results.columnIndex] = 1;
      if (checkBoard(1)) {
        for (let row of matrix) {
          console.log(row)
        }
        console.log('Player1 Wins!');
        playAgain();
      } else {
        player2Move();
      }
    } else {
      console.log('This Position has Already Been Filled!');
      player1Move();
      return;
    }
  })
}

const playAgain = function() {
  prompt.get('Play Again? y/n', function(err, results) {
    results = results['Play Again? y/n'];
    if (results === 'y') {
      initializeGame();
    } else if ( results === 'n') {
      prompt.stop();
    } else {
      playAgain();
    }
  })
}

const player2Move = function() {
  for (let row of matrix) {
    console.log(row)
  }
  // console.log(matrix)
  console.log('Player 2 enter:');
  prompt.get(['rowIndex', 'columnIndex'], function(err, results) {
    if (Number(results.columnIndex) > 2 || results.rowIndex > 2) {
      console.log('Invalid Position');
      player2Move();
      return;
    }
    if (!matrix[results.rowIndex][results.columnIndex]) {
      console.log('YES');
      matrix[results.rowIndex][results.columnIndex] = 2;
      if (checkBoard(2)) {
        for (let row of matrix) {
          console.log(row)
        }        console.log('Player2 Wins!');
        playAgain();
      } else {
        player1Move();
      }
    } else {
      console.log('This Position has Already Been Filled!');
      player2Move();
      return;
    }
  })
}

prompt.start();

startGame();
