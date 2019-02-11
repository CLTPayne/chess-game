#!/usr/bin/env node

// Write a program that creates a string that represents an 8×8 grid,
// using newline characters to separate lines.At each position of the grid
// there is either a space or a "#" character.The characters should form a
// chessboard.Passing this string to console.log should show something like this:

// When you have a program that generates this pattern, define a binding
// size = 8 and change the program so that it works for any size,
// outputting a grid of the given width and height.

// * Setup - make a new file and set the execution permissions.

const convertToNumber = size => parseInt(size, 10);

// 1. Create a row that is just an array of positions.
const generateEmptyRow = size => new Array(size);

const chessboard = size => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(generateEmptyRow(size));
  }
  return rows;
};

const isEven = number => number % 2 === 0;

const renderRow = (oddRow, evenRow, size) => {
  const row = [];
  for (let i = 0; i < size; i++) {
    if (isEven(i)) {
      row.push(evenRow);
    } else {
      row.push(oddRow);
    }
  }
  return row;
};

// 2. Render an empty board.
const renderEmptyBoard = size => {
  const board = chessboard(size);
  const emptyBoard = board.map((row, index) => {
    if (index % 2 === 0) {
      row.fill(renderRow("⬛️", "⬜️", size));
    } else {
      row.fill(renderRow("⬜️", "⬛️", size));
    }
    return row;
  });
  return emptyBoard;
  // return emptyBoard.join("\n")
};

// 3. some form of move() that takes a player and a position as parameters.

console.log(renderEmptyBoard(convertToNumber(process.argv[2])));

// Next steps:
// 2. How to make the board playable:
// Create a grid which could just be an array of positions
// Render an array to the standout output (with the idea that you could have a diff output)
// This is essentially splitting view from presentation layer.
