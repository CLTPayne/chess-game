import { getPosition, movePiece } from "./chessboard.js";
import {
	getPotentialHorizontalOrVerticalMoves,
	getOpponentMoves,
	getPotentialDiagonalMoves
} from "./moveHelpers.js";

export const kingValidMoves = (currentBoard, currentPosition) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

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

	const getPotentialCastleMoves = (currentBoard, { row, col }) => {
		// Break if the king has moved
		if (getPosition(currentBoard, row, col).piece.hasMoved) {
			return [];
		}

		// Break if the king is in check
		if (
			getOpponentMoves(currentBoard, playerColor).find(
				move => move.row === row && move.col === col
			)
		) {
			return [];
		}

		const startPositionRooks = currentBoard.filter(
			element =>
				element.piece !== null &&
				element.piece.type === "rook" &&
				element.piece.color === playerColor &&
				element.piece.hasMoved === false
		);

		// Break if both rooks have moved
		if (startPositionRooks.length === 0) {
			return [];
		}

		// Check for empty squares to the left of the king
		const potentialLeftSideCastleSquares = startPositionRooks
			.map(rook =>
				currentBoard.filter(
					element =>
						element.row === rook.row &&
						element.col > rook.col &&
						element.col < col
				)
			)
			.filter(element => Boolean(element))
			.reduce((acc, value) => acc.concat(value), []);

		// Check for empty squares to the right of the king
		const potentialRightSideCastleSquares = startPositionRooks
			.map(rook =>
				currentBoard.filter(
					element =>
						element.row === rook.row &&
						element.col > col &&
						element.col < rook.col
				)
			)
			.filter(element => Boolean(element))
			.reduce((acc, value) => acc.concat(value), []);

		// Break if there are non empty squares between the king and it's rooks
		// NOTE - maybe no point in this check - does it actually improve anything
		if (
			potentialLeftSideCastleSquares.some(
				element => typeof element.piece === "object" && element.piece
			) &&
			potentialRightSideCastleSquares.some(
				element => typeof element.piece === "object" && element.piece
			)
		) {
			return [];
		}

		const validCastleMoveLeft = []; // need to filter out undefineds
		const validCastleMoveRight = [];

		// Check that squares are empty and wouldn't be in check
		if (
			potentialLeftSideCastleSquares.every(
				element => typeof element.piece === "object" && !element.piece
			)
		) {
			for (let i = 2; i >= 1; i--) {
				validCastleMoveLeft.push(
					moveNotInCheck(potentialLeftSideCastleSquares[i])
				);
			}
		}

		if (
			potentialRightSideCastleSquares.every(
				element => typeof element.piece === "object" && !element.piece
			)
		) {
			for (let i = 0; i < 2; i++) {
				validCastleMoveRight.push(
					moveNotInCheck(potentialRightSideCastleSquares[i])
				);
			}
		}

		const validCastleMoves = [];

		[
			validCastleMoveLeft.filter(element => Boolean(element)),
			validCastleMoveRight.filter(element => Boolean(element))
		].forEach(array => {
			if (array.length === 2) {
				validCastleMoves.push(...array);
			}
		});

		return validCastleMoves;
	};

	// Dedupe each castle moves against others
	return [
		...getPotentialDiagonalMoves(currentBoard, currentPosition, 1),
		...getPotentialHorizontalOrVerticalMoves(
			currentBoard,
			currentPosition,
			1
		),
		...getPotentialCastleMoves(currentBoard, currentPosition)
	].filter(moveNotInCheck);
};
