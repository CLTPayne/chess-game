import { getPosition } from "./chessboard";

export const pawnValidMoves = (currentBoard, currentPosition) => {
	const validMoves = [];
	// Idea for 1 vs 2 squares move:
	// a) optional parameter needs to be passed in if it's not the first pawn move.
	// b) only ever start postion if never moved (as can't go backwards)
	// Can only be on start row if never moved as can't move to side. Only forwards.

	let { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;
	const pawnStartRow = playerColor === "black" ? 1 : 6;

	if (currentPosition.row === pawnStartRow) {
		// can move 2 squares
	} else {
		// can move 1 square
	}

	// Valid moves to include extra array for pieces that will be taken?
	// Add extra highlight to the UI to demonstrate this for pawns?
	return validMoves;
};
