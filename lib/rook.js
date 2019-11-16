import { getPotentialHorizontalOrVerticalMoves } from "./moveHelpers.js";

export const rookValidMoves = (currentBoard, currentPosition) => {
	return [
		...getPotentialHorizontalOrVerticalMoves(currentBoard, currentPosition)
	];
};
