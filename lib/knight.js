import { getPosition } from "./chessboard.js";
import { potentialSquare } from "./moveHelpers.js";

export const knightValidMoves = (currentBoard, currentPosition) => {
	let { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;
	const validMoves = [];

	const allPotentialMoves = [
		potentialSquare(currentBoard, currentPosition, -2, -1),
		potentialSquare(currentBoard, currentPosition, -1, -2),
		potentialSquare(currentBoard, currentPosition, -2, 1),
		potentialSquare(currentBoard, currentPosition, -1, 2),
		potentialSquare(currentBoard, currentPosition, 1, 2),
		potentialSquare(currentBoard, currentPosition, 2, 1),
		potentialSquare(currentBoard, currentPosition, 2, -1),
		potentialSquare(currentBoard, currentPosition, 1, -2)
	].filter(element => Boolean(element));

	allPotentialMoves.forEach(element => {
		if (element.piece === null) {
			validMoves.push(element);
		}
		if (element.piece !== null && element.piece.color !== playerColor) {
			validMoves.push(element);
		}
	});

	return validMoves;
};
