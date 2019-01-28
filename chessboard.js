#!/usr/bin/env node

// Write a program that creates a string that represents an 8×8 grid,
// using newline characters to separate lines.At each position of the grid
// there is either a space or a "#" character.The characters should form a
// chessboard.Passing this string to console.log should show something like this:

// When you have a program that generates this pattern, define a binding
// size = 8 and change the program so that it works for any size,
// outputting a grid of the given width and height.

const generateRow = (oddRow, evenRow, size) => {
  const row = [];
  for (let i = 0; i < parseInt(size, 10); i++) {
    if (i % 2 === 0) {
      row.push(evenRow);
    } else {
      row.push(oddRow);
    }
  }
  return row;
};

const chessboard = size => {
  const rows = [];
  for (let i = 0; i < parseInt(size, 10); i++) {
    if (i % 2 === 0) {
      rows.push(generateRow("⬛️", "⬜️", size).join(""));
    } else {
      rows.push(generateRow("⬜️", "⬛️", size).join(""));
    }
  }
  return rows.join("\n");
};

console.log(chessboard(process.argv[2]));

// Next steps:
// 1. Less repetition between the functions, extract parseInt, could even do it in the function call.
// 2. How to make the board playable:
// Create a grid which could just be an array of positions
// Render an array to the standout output (with the idea that you could have a diff output)
// This is essentially splitting view from presentation layer.
