#!/usr/bin/env node

// Write a program that creates a string that represents an 8×8 grid,
// using newline characters to separate lines.At each position of the grid
// there is either a space or a "#" character.The characters should form a
// chessboard.Passing this string to console.log should show something like this:

// When you have a program that generates this pattern, define a binding
// size = 8 and change the program so that it works for any size,
// outputting a grid of the given width and height.

// 1. Extracted parseInt base 10 function:
const convertToNumber = size => parseInt(size, 10)

// 4. Extracted modulo check for odd / even number to be more declarative?
const isEven = number => number % 2 === 0

const generateRow = (oddRow, evenRow, size) => {
	const row = []
	for (let i = 0; i < size; i++) {
		if (isEven(i)) {
			row.push(evenRow)
		} else {
			row.push(oddRow)
		}
	}
	// 3. Moved .join() inside generate row.
	return row.join("")
}

const chessboard = size => {
	const rows = []
	for (let i = 0; i < size; i++) {
		if (isEven(i)) {
			rows.push(generateRow("⬛️", "⬜️", size))
		} else {
			rows.push(generateRow("⬜️", "⬛️", size))
		}
	}
	return rows.join("\n")
}

// 2. Moved parseInt functionality into function call
// Something has made the output slower? Is this just the machine? Or the extraction?
console.log(chessboard(convertToNumber(process.argv[2])))

// Next steps:
// 1. Less repetition between the functions, extract parseInt, could even do it in the function call.
// 2. How to make the board playable:
// Create a grid which could just be an array of positions
// Render an array to the standout output (with the idea that you could have a diff output)
// This is essentially splitting view from presentation layer.
