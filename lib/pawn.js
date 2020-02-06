import { getPosition } from "./chessboard.js";

export const pawnValidMoves = (currentBoard, currentPosition, lastMove) => {
	return [
		...getValidPawnMoves(currentBoard, currentPosition),
		getValidEnPassantMoves(currentBoard, currentPosition, lastMove)
	].filter(element => element);
};

const getValidPawnMoves = (currentBoard, currentPosition) => {
	let allPotentialMoves;
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	// Can only be on start row if never moved as can't move to side. Only forwards.
	const pawnStartRow = playerColor === "black" ? 1 : 6;

	const deduct = (row, number) => row - number;
	const add = (row, number) => row + number;
	const operator = playerColor === "white" ? deduct : add;

	if (row === pawnStartRow) {
		// Move two squares
		allPotentialMoves = [
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
		allPotentialMoves = [
			currentBoard.find(
				element =>
					element.row === operator(row, 1) && element.col === col
			)
		];
	}

	const allPotentialCaptures = [
		currentBoard.find(
			element =>
				element.row === operator(row, 1) &&
				element.col === col - 1 &&
				element.piece !== null
		),
		currentBoard.find(
			element =>
				element.row === operator(row, 1) &&
				element.col === col + 1 &&
				element.piece !== null
		)
	].filter(element => element && element.piece.color !== playerColor);

	const validMoves = [...allPotentialCaptures];

	for (const element of allPotentialMoves) {
		if (element.piece === null) {
			validMoves.push(element);
		} else {
			// don't include the second square if the first is occupied
			break;
		}
	}

	return validMoves.filter(element => element);
};

const getValidEnPassantMoves = (currentBoard, currentPosition, lastMove) => {
	const { row, col } = currentPosition;
	const { from, to } = lastMove;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	if (!from) {
		return;
	}
	if (to.piece.type !== "pawn") {
		return;
	}

	const deduct = (row, number) => row - number;
	const add = (row, number) => row + number;
	const operator = playerColor === "white" ? deduct : add;

	// Check that last pawn moved two square
	if (from.row === operator(to.row, 2) && to.col === col + 1) {
		return currentBoard.find(
			element =>
				element.row === operator(row, 1) && element.col === col + 1
		);
		// Check that pawn moved in a immediately neighbouring column
	} else if (from.row === operator(to.row, 2) && to.col === col - 1) {
		return currentBoard.find(
			element =>
				element.row === operator(row, 1) && element.col === col - 1
		);
	}
};
