#!/usr/bin/env node
/* eslint-disable */

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
		if (!position.piece) {
			result += position.color;
		} else {
			result += position.piece;
		}
		currentRow = position.row;
		return result;
	}, "");
	return fullBoard;
};

const _getPosition = (board, row, col) => {
	return board.find(position => {
		return position.row === row && position.col === col;
	});
};

const setPiece = (board, row, col, piece) => {
	const newBoard = cloneBoard(board);
	const position = _getPosition(newBoard, row, col);
	position.piece = piece;
	return newBoard;
};

const cloneBoard = board => {
	return board.map(position => Object.assign({}, position));
};

// console.log(
//   renderBoard(generateBoard("⬛️", "⬜️", convertToNumber(process.argv[2])))
// );

let currentBoard = generateBoard(
	"⬛️",
	"⬜️",
	convertToNumber(process.argv[2])
);

// currentBoard = setPiece(currentBoard, 7, 7, "😀");

// console.log(renderBoard(currentBoard));

const isChessBoard = board => {
	return board.length === 64 ? true : false;
};

const blackChessPieces = [
	{ piece: "♜", row: 0, col: 0 },
	{ piece: "♞", row: 0, col: 1 },
	{ piece: "♝", row: 0, col: 2 },
	{ piece: "♛", row: 0, col: 3 },
	{ piece: "♚", row: 0, col: 4 },
	{ piece: "♝", row: 0, col: 5 },
	{ piece: "♞", row: 0, col: 6 },
	{ piece: "♜", row: 0, col: 7 },
	{ piece: "♟", row: 1, col: 0 },
	{ piece: "♟", row: 1, col: 1 },
	{ piece: "♟", row: 1, col: 2 },
	{ piece: "♟", row: 1, col: 3 },
	{ piece: "♟", row: 1, col: 4 },
	{ piece: "♟", row: 1, col: 5 },
	{ piece: "♟", row: 1, col: 6 },
	{ piece: "♟", row: 1, col: 7 }
];

const whiteChessPieces = [
	{ piece: "♙", row: 6, col: 0 },
	{ piece: "♙", row: 6, col: 1 },
	{ piece: "♙", row: 6, col: 2 },
	{ piece: "♙", row: 6, col: 3 },
	{ piece: "♙", row: 6, col: 4 },
	{ piece: "♙", row: 6, col: 5 },
	{ piece: "♙", row: 6, col: 6 },
	{ piece: "♙", row: 6, col: 7 },
	{ piece: "♖", row: 7, col: 0 },
	{ piece: "♘", row: 7, col: 1 },
	{ piece: "♗", row: 7, col: 2 },
	{ piece: "♕", row: 7, col: 3 },
	{ piece: "♔", row: 7, col: 4 },
	{ piece: "♗", row: 7, col: 5 },
	{ piece: "♘", row: 7, col: 6 },
	{ piece: "♖", row: 7, col: 7 }
];

const setupChessBoard = (board, blackChessPieces, whiteChessPieces) => {
	if (!isChessBoard(currentBoard)) {
		throw new Error("This is not a chess board");
	}
	let newBoard = cloneBoard(board);
	blackChessPieces.map(piece => {
		newBoard = setPiece(newBoard, piece.row, piece.col, piece.piece);
	});
	whiteChessPieces.map(piece => {
		newBoard = setPiece(newBoard, piece.row, piece.col, piece.piece);
	});
	return newBoard;
};

console.log(
	renderBoard(
		setupChessBoard(currentBoard, blackChessPieces, whiteChessPieces)
	)
);

// Next Steps:
// Make the render function useable in browser.
// Persistent state for knowing the past state of the board, and the player1.

// Make it in to a library that can be imported function by function
// Render = renderEmojiString
// Render to html
// use tr, th
// use CSS to set the back ground colour for each piece of the board
// interim interactive version in pure js
// react version for presentation and interaction

// OOP version -
