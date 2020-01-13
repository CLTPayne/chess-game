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

		// Check if the spaces between the potential Rook and the King are free
		// and if free if they are in check
		const verifiedCastleRooks = potentialRooksToCastleWith.map(rook => {
			let verifiedRook;
			let numberOfFreeSquares;
			if (rook.col === 0) {
				numberOfFreeSquares = [
					returnPieceIfEmpty(currentBoard, rook.row, rook.col + 1),
					returnPieceIfEmpty(currentBoard, rook.row, rook.col + 2),
					returnPieceIfEmpty(currentBoard, rook.row, rook.col + 3)
				]
					.filter(element => Boolean(element))
					.filter(moveNotInCheck);
				console.log({ numberOfFreeSquares });
				if (numberOfFreeSquares === 3) verifiedRook = rook;
			} else if (rook.col === 7) {
				numberOfFreeSquares = [
					returnPieceIfEmpty(currentBoard, rook.row, rook.col - 1),
					returnPieceIfEmpty(currentBoard, rook.row, rook.col - 2)
				]
					.filter(element => Boolean(element))
					.filter(moveNotInCheck);
				console.log({ numberOfFreeSquares });
				if (numberOfFreeSquares === 2) verifiedRook = rook;
			}
			return verifiedRook;
		});

		// ISSUES:
		// 1. very hard to set up a board to really test if a castle is valid
		// thought I had done so with "identifies a valid queenside castling move for black king", () => {
		// Based on the Averbakh game - https://en.wikipedia.org/wiki/Castling"
		// Now not so sure because adding in the moveNotInCheck filter breaks it
    // 2. Above finds the rooks but should I be finding the space the king can move into because of the valid castle with this rook
    /////// USE THE RENDER TO HTML VISUALLY CHECK THE TEST BOARD AGAINST THE WIKI VERSION OF A BOARD
    /////// HAVE A NEW RENDER FUNCTION THAT CAN WORK WITH A SPARSE BOARD
		// Does it need a new data structure to associate the rook with the move that the king goes to AND the move that the rook goes to
		// (the space the king jumps)
		// I think this new data structure makes sense but doesnt really fit in with the api we have for returning a list of potential moves
		// and highlighting them in the UI
		// 3. For the UI alone, this out function needs to return the slot two squares away that the king would move into alone.
		// E.g. L72 / L82 above
		console.log({ potentialRooksToCastleWith, verifiedCastleRooks });

		// // Check for empty squares to the left of the king
		// const potentialLeftSideCastleSquares = startPositionRooks
		// 	.map(rook =>
		// 		currentBoard.filter(
		// 			element =>
		// 				element.row === rook.row &&
		// 				element.col > rook.col &&
		// 				element.col < col
		// 		)
		// 	)
		// 	.filter(element => Boolean(element))
		// 	.reduce((acc, value) => acc.concat(value), []);

		// // Check for empty squares to the right of the king
		// const potentialRightSideCastleSquares = startPositionRooks
		// 	.map(rook =>
		// 		currentBoard.filter(
		// 			element =>
		// 				element.row === rook.row &&
		// 				element.col > col &&
		// 				element.col < rook.col
		// 		)
		// 	)
		// 	.filter(element => Boolean(element))
		// 	.reduce((acc, value) => acc.concat(value), []);

		// // Break if there are non empty squares between the king and it's rooks
		// // NOTE - maybe no point in this check - does it actually improve anything
		// if (
		// 	potentialLeftSideCastleSquares.some(
		// 		element => typeof element.piece === "object" && element.piece
		// 	) &&
		// 	potentialRightSideCastleSquares.some(
		// 		element => typeof element.piece === "object" && element.piece
		// 	)
		// ) {
		// 	return [];
		// }

		// const validCastleMoveLeft = []; // need to filter out undefineds
		// const validCastleMoveRight = [];

		// // Check that squares are empty and wouldn't be in check
		// if (
		// 	potentialLeftSideCastleSquares.every(
		// 		element => typeof element.piece === "object" && !element.piece
		// 	)
		// ) {
		// 	for (let i = 2; i >= 1; i--) {
		// 		validCastleMoveLeft.push(
		// 			moveNotInCheck(potentialLeftSideCastleSquares[i])
		// 		);
		// 	}
		// }

		// if (
		// 	potentialRightSideCastleSquares.every(
		// 		element => typeof element.piece === "object" && !element.piece
		// 	)
		// ) {
		// 	for (let i = 0; i < 2; i++) {
		// 		validCastleMoveRight.push(
		// 			moveNotInCheck(potentialRightSideCastleSquares[i])
		// 		);
		// 	}
		// }

		// const validCastleMoves = [];

		// [
		// 	validCastleMoveLeft.filter(element => Boolean(element)),
		// 	validCastleMoveRight.filter(element => Boolean(element))
		// ].forEach(array => {
		// 	if (array.length === 2) {
		// 		validCastleMoves.push(...array);
		// 	}
		// });

		// return validCastleMoves;
	};

	// Dedupe each castle moves against others
	return [
		...getPotentialDiagonalMoves(currentBoard, currentPosition, 1),
		...getPotentialHorizontalOrVerticalMoves(
			currentBoard,
			currentPosition,
			1
		),
		// This should just return the square two squares away from the king
		// need more info to actually complete the two piece move though!
		...getPotentialCastleMoves(currentBoard, currentPosition)
	].filter(moveNotInCheck);
};

const returnPieceIfEmpty = (board, row, col) => {
	const piece = board.find(
		element => element.row === row && element.col === col && !element.piece
	);
	// could check if moveIsInCheck here?
	console.log({ piece });
	return piece;
};
