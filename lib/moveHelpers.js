import { moves, getPosition } from "./chessboard.js";

// Applicable to other moves functions? Extract to a helper file?
export const potentialSquare = (
	currentBoard,
	{ row, col },
	rowChangeValue,
	colChangeValue
) =>
	currentBoard.find(
		element =>
			element.row === row + rowChangeValue &&
			element.col === col + colChangeValue
	);

export const notOccupiedByOwnPieceSquares = (
	allPotentialMoves,
	playerColor
) => {
	return allPotentialMoves.filter(element => {
		if (!(element.piece !== null && element.piece.color === playerColor)) {
			return element;
		}
	});
};

export const isMatchingSqaure = (firstElement, secondElement) =>
	firstElement.col === secondElement.col &&
	firstElement.row === secondElement.row;

export const getOppositionPositions = (board, playerColor) => {
	return board.filter(position => {
		return (
			position.piece &&
			position.piece.color !== undefined &&
			position.piece.color !== playerColor
		);
	});
};

export const getOpponentMoves = (board, playerColor) => {
	return getOppositionPositions(board, playerColor)
		.map(element => {
			// refactor into pawnValidCaptures function that is called by both pawn valid moves and king
			const rowChangeValue = element.piece.color === "white" ? -1 : 1;
			if (element.piece.type === "pawn") {
				return [
					potentialSquare(board, element, rowChangeValue, -1),
					potentialSquare(board, element, rowChangeValue, 1)
				].filter(element => element);
			} else if (
				element.piece.type !== "king" &&
				moves[element.piece.type]
			) {
				return moves[element.piece.type](board, element);
			}
		})
		.filter(element => Boolean(element))
		.reduce((acc, value) => acc.concat(value), []);
};

export const getPotentialHorizontalOrVerticalMoves = (
	currentBoard,
	currentPosition,
	maxMoves
) => {
	// 1. Get the piece color
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	// Use 10 as a default value to make sure 'infinite' moves are included
	const limitValue = maxMoves === 1 ? 1 : 10;

	// 2. Get all possible moves as four sub-arrays (maybe)
	// Refactor this:
	const allPotentialSquares = currentBoard
		.map(element => {
			if (element.row === row || element.col === col) {
				return element;
			}
		})
		.filter(element => Boolean(element));

	const squaresAbove = allPotentialSquares
		.filter(element => {
			if (element.row < row) {
				return element;
			}
		})
		.reverse();

	const squaresLeft = allPotentialSquares
		.filter(element => {
			if (element.row === row && element.col < col) {
				return element;
			}
		})
		.reverse();

	const squaresRight = allPotentialSquares.filter(element => {
		if (element.row === row && element.col > col) {
			return element;
		}
	});

	const squaresBelow = allPotentialSquares.filter(element => {
		if (element.row > row) {
			return element;
		}
	});

	// 3. Find break point of each of the sub-arrays and filter out anything after that point (take color into consideration)
	const validMoves = [];
	[squaresAbove, squaresBelow, squaresLeft, squaresRight].forEach(
		subArray => {
			subArray.slice(0, limitValue);
			for (const element of subArray) {
				if (element.piece === null) {
					validMoves.push(element);
				}
				if (
					element.piece !== null &&
					element.piece.color !== playerColor
				) {
					validMoves.push(element);
					// stop loop once you find more that one opponent piece in the path
					break;
				}
				if (
					element.piece !== null &&
					element.piece.color === playerColor
				) {
					// stop loop once you find one of your own pieces in the path
					break;
				}
			}
		}
	);

	// 4. Return flat array of moves
	return validMoves;
};
