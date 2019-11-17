import { getPosition, movePiece } from "./chessboard.js";
import {
	getPotentialHorizontalOrVerticalMoves,
	getOpponentMoves,
	getPotentialDiagonalMoves
} from "./moveHelpers.js";

// 1. Get all possible king moves
//  - a) empty
//  - b) empty
//  - c) opponent piece
//  - d) opponent piece
//  output: [null, null, pawn, rook]
// 2. For each of the possible king moves:
//  - clone the board
//  - we execute the move
//  - we check whether the move is in check
//    - if yes: remove the move from the possible moves
//     - if no: leave it in

export const kingValidMoves = (currentBoard, currentPosition) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	const validMoves = [
		...getPotentialDiagonalMoves(currentBoard, currentPosition, 1),
		...getPotentialHorizontalOrVerticalMoves(
			currentBoard,
			currentPosition,
			1
		)
	];

	return validMoves.filter(element => {
		// execute the move
		const attemptMoveBoard = movePiece(
			currentBoard,
			[currentPosition.row, currentPosition.col],
			[element.row, element.col]
		);

		const opponentValidMovesIfPieceTaken = getOpponentMoves(
			attemptMoveBoard,
			playerColor
		);

		// check if the valid move is a opponent valid on the next go
		// should the king take that position now
		if (
			!opponentValidMovesIfPieceTaken.find(
				move => move.row === element.row && move.col === element.col
			)
		) {
			return element;
		}
	});
};
