#!/usr/bin/env node

const convertToNumber = size => parseInt(size, 10);

const generateBoard = (oddRow, evenRow, size) => {
  const board = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const position = { row, col, piece: null };
      if (col % 2 === row % 2) {
        position.color = evenRow;
      } else {
        position.color = oddRow;
      }
      board.push(position);
    }
  }
  return board;
};

const renderBoard = board => {
  let currentRow = 0;
  const fullBoard = board.reduce((result, position) => {
    if (position.row !== currentRow) {
      result += "\n";
    }
    result += position.color;
    currentRow = position.row;
    return result;
  }, "");
  return fullBoard;
};

const getPosition = (board, row, col) => {
  return board.find(position => {
    return position.row === row && position.col === col;
  });
};

// console.log(
//   renderBoard(generateBoard("⬛️", "⬜️", convertToNumber(process.argv[2])))
// );

const currentBoard = generateBoard(
  "⬛️",
  "⬜️",
  convertToNumber(process.argv[2])
);

const currentPosition = getPosition(currentBoard, 7, 7);

currentPosition.color = "😀";
//
// console.log(renderBoard(currentBoard));

console.log(currentBoard)

// Next Steps:
// Function setupChessBoard - takes a board, checks the size of the board (8) is correct for chess
// Fills each position value with the start piece ( king queen emoji )
// The render function can be dumb but then render what ever emoji is in the piece value
// Make the render function useable in browser.
// Persistent state for knowing the past state of the board, and the player1.

const isChessBoard = (board) => {
  return board.length === 64 ? true : false;
}

console.log(isChessBoard(currentBoard));

const blackChessPieces = [
  "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
  "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"
]

const whiteChessPieces = [
  "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
  "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"
]

const setupChessBoard = (board) => {
  if (isChessBoard(currentBoard)) {

  }
}
