import { getPosition, movePiece } from "./chessboard.js";
import {
	getPotentialHorizontalOrVerticalMoves,
	getOpponentMoves,
	getPotentialDiagonalMoves
} from "./moveHelpers.js";

export const kingValidMoves = (currentBoard, currentPosition) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	const validCastling = (currentBoard, row, col) => {
		// Break if the king has moved
		if (getPosition(currentBoard, row, col).piece.hasMoved) {
			return;
		}

		const startPositionRooks = currentBoard.filter(
			element =>
				element.piece.type === "rook" &&
				element.piece.color === playerColor &&
				element.piece.hasMoved === false
		);

		console.log({ startPositionRooks });

		// Break if both rooks have moved
		if (startPositionRooks.length === 0) {
			return;
		}
	};

	const moveNotInCheck = element => {
		const attemptMoveBoard = movePiece(
			currentBoard,
			[currentPosition.row, currentPosition.col],
			[element.row, element.col]
		);

		const opponentValidMovesIfPieceTaken = getOpponentMoves(
			attemptMoveBoard,
			playerColor
		);

		// check if the valid move is an opponent valid move on the next go
		// if the king takes that position now
		if (
			!opponentValidMovesIfPieceTaken.find(
				move => move.row === element.row && move.col === element.col
			)
		) {
			return element;
		}
	};

	return [
		...getPotentialDiagonalMoves(currentBoard, currentPosition, 1),
		...getPotentialHorizontalOrVerticalMoves(
			currentBoard,
			currentPosition,
			1
		)
	].filter(moveNotInCheck);
};
