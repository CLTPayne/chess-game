import { getPosition } from "./chessboard";

export const pawnValidMoves = (currentBoard, currentPosition) => {
	let validMoves;
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	// Can only be on start row if never moved as can't move to side. Only forwards.
	const pawnStartRow = playerColor === "black" ? 1 : 6;

	const deduct = (row, number) => row - number;
	const add = (row, number) => row + number;
	const operator = playerColor === "white" ? deduct : add;

	if (row === pawnStartRow) {
		// Move two squares
		validMoves = [
			currentBoard.find(
				element =>
					element.row === operator(row, 1) && element.col === col
			),
			currentBoard.find(
				element =>
					element.row === operator(row, 2) && element.col === col
			)
		];
	} else {
		// Move one square
		validMoves = [
			currentBoard.find(
				element =>
					element.row === operator(row, 1) && element.col === col
			)
		];
	}

	// Valid moves to include extra array for pieces that will be taken?
	// Add extra highlight to the UI to demonstrate this for pawns?
	return validMoves;
};
