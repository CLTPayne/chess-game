import { getPosition, cloneBoard } from "./chessboard.js";
import {
	notOccupiedByOwnPieceSquares,
	potentialSquare,
	isMatchingSqaure,
	getOpponentMoves
} from "./moveHelpers.js";

export const kingValidMoves = (currentBoard, currentPosition) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	const allPotentialMoves = [
		potentialSquare(currentBoard, currentPosition, -1, -1),
		potentialSquare(currentBoard, currentPosition, -1, 0),
		potentialSquare(currentBoard, currentPosition, -1, 1),
		potentialSquare(currentBoard, currentPosition, 0, 1),
		potentialSquare(currentBoard, currentPosition, 1, 1),
		potentialSquare(currentBoard, currentPosition, 1, 0),
		potentialSquare(currentBoard, currentPosition, 1, -1),
		potentialSquare(currentBoard, currentPosition, 0, -1)
	].filter(element => Boolean(element));

	const validMoves = notOccupiedByOwnPieceSquares(
		allPotentialMoves,
		playerColor
	);

	const isValidMoveOccupiedSquare = (position, validMoves) => {
		return validMoves.some(
			move =>
				move.row === position.row &&
				move.col === position.col &&
				position.piece &&
				position.piece.type
		);
	};

	const opponentValidMoves = getOpponentMoves(currentBoard, playerColor);

	const movesInCheck = [];
	for (const element of validMoves) {
		for (const move of opponentValidMoves) {
			if (isMatchingSqaure(element, move)) {
				movesInCheck.push(element);
			}
		}

		if (isValidMoveOccupiedSquare(element, validMoves)) {
			// clone the board:
			const newBoard = cloneBoard(currentBoard);

			// remove the piece from that position on the board
			const validMovePosition = getPosition(
				newBoard,
				element.row,
				element.col
			);

			// delete the piece of the position as if taken by the king
			validMovePosition.piece = null;

			const opponentValidMovesIfPieceTaken = getOpponentMoves(
				newBoard,
				playerColor
			);

			if (
				opponentValidMovesIfPieceTaken.length >
				opponentValidMoves.length
			) {
				movesInCheck.push(element);
			}
		}
	}

	const isMoveInCheck = (position, movesInCheck) => {
		return movesInCheck.some(
			move => move.row === position.row && move.col === position.col
		);
	};

	const notInCheckValidMoves = validMoves.reduce((accumulator, item) => {
		if (!isMoveInCheck(item, movesInCheck)) {
			return accumulator.concat(item);
		}
		return accumulator;
	}, []);

	return notInCheckValidMoves;
};
