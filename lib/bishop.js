import { getPotentialDiagonalMoves } from "./moveHelpers.js";

export const bishopValidMoves = (currentBoard, currentPosition) => {
	return [...getPotentialDiagonalMoves(currentBoard, currentPosition)];
};
