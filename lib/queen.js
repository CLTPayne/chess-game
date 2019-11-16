import {
	getPotentialDiagonalMoves,
	getPotentialHorizontalOrVerticalMoves
} from "./moveHelpers.js";

export const queenValidMoves = (currentBoard, currentPosition) => {
	return [
		...getPotentialHorizontalOrVerticalMoves(currentBoard, currentPosition),
		...getPotentialDiagonalMoves(currentBoard, currentPosition)
	];
};
