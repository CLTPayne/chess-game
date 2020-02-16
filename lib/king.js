import { getPosition, cloneBoard } from "./chessboard.js";
import {
	getPotentialHorizontalOrVerticalMoves,
	getOpponentMoves,
	getPotentialDiagonalMoves
} from "./moveHelpers.js";

export const kingValidMoves = (currentBoard, currentPosition) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;
	return [
		...getPotentialDiagonalMoves(currentBoard, currentPosition, 1),
		...getPotentialHorizontalOrVerticalMoves(
			currentBoard,
			currentPosition,
			1
		),
		...getPotentialCastleMoves(currentBoard, currentPosition, playerColor)
	].filter(element =>
		moveNotInCheck(element, currentBoard, row, col, playerColor)
	);
};

// bind returns a new function
// [].filter(moveNotInCheck.bind(null, currentBoard));
// const boundMoveNotInCheck = moveNotInCheck.bind(null, currentBoard);

const moveNotInCheck = (element, currentBoard, row, col, playerColor) => {
	const attemptMoveBoard = movePiece(
		currentBoard,
		[row, col],
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

const returnPieceIfEmpty = (board, row, col) => {
	const piece = board.find(
		element => element.row === row && element.col === col && !element.piece
	);
	return piece;
};

const getPotentialCastleMoves = (currentBoard, { row, col }, playerColor) => {
	let validKingCastleMoves = [];

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

	const potentialRooksToCastleWith = currentBoard.filter(
		element =>
			element.piece !== null &&
			element.piece.type === "rook" &&
			element.piece.color === playerColor &&
			element.piece.hasMoved === false
	);

	// Break if both rooks have moved
	if (potentialRooksToCastleWith.length === 0) {
		return [];
	}

	// Check if all the spaces between the potential Rook and the King are free
	potentialRooksToCastleWith.forEach(rook => {
		let numberOfFreeSquares;
		if (rook.col === 0) {
			numberOfFreeSquares = [
				returnPieceIfEmpty(currentBoard, rook.row, rook.col + 1),
				returnPieceIfEmpty(currentBoard, rook.row, rook.col + 2),
				returnPieceIfEmpty(currentBoard, rook.row, rook.col + 3)
			].filter(element => Boolean(element));
			if (numberOfFreeSquares.length === 3)
				validKingCastleMoves.push(
					getPosition(currentBoard, rook.row, rook.col + 2)
				);
		} else if (rook.col === 7) {
			numberOfFreeSquares = [
				returnPieceIfEmpty(currentBoard, rook.row, rook.col - 1),
				returnPieceIfEmpty(currentBoard, rook.row, rook.col - 2)
			].filter(element => Boolean(element));
			if (numberOfFreeSquares.length === 2)
				validKingCastleMoves.push(
					getPosition(currentBoard, rook.row, rook.col - 1)
				);
		}
	});

	return validKingCastleMoves;
};

// Duplicate local function because to validate a move we were calling `movePiece`
// in order to just get the valid moves that were not in check
// This was meaning that on first click of a king piece it was straight away being assigned a
// endPosition.piece.hasMoved = true;
// Why was this square being used on the actual board though?!
// MUTATION BUGS
const movePiece = (board, startCoordinate, endCoordinate) => {
	const newBoard = cloneBoard(board);
	const startPosition = getPosition(
		newBoard,
		startCoordinate[0],
		startCoordinate[1]
	);
	const endPosition = getPosition(
		newBoard,
		endCoordinate[0],
		endCoordinate[1]
	);
	endPosition.piece = startPosition.piece;
	startPosition.piece = null;
	return newBoard;
};
