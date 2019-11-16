import { moves, getPosition } from "./chessboard.js";

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

// Potentially not needed now removed from key valid move calculations
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

// remove the slice from here
// remove the filter
// don't need to pass in max moves
const validateMoves = (nestedArray, maxMoves, playerColor) => {
	const validMoves = [];
	nestedArray.forEach(subArray => {
		const filtered = subArray
			.filter(element => Boolean(element))
			.slice(0, maxMoves);
		for (const element of filtered) {
			if (element.piece === null) {
				validMoves.push(element);
			}
			if (element.piece !== null && element.piece.color !== playerColor) {
				validMoves.push(element);
				break;
			}
			if (element.piece !== null && element.piece.color === playerColor) {
				break;
			}
		}
	});
	return validMoves;
};

// Remove the 4 reduces as this  4 * 49 processes
// do as one loop like the below
export const getPotentialHorizontalOrVerticalMoves = (
	currentBoard,
	currentPosition,
	maxMoves
) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	const squaresAbove = currentBoard
		.reduce((accumulator, element) => {
			if (element.row < row && element.col === col) {
				return accumulator.concat(element);
			}
			return accumulator;
		}, [])
		.reverse();

	const squaresLeft = currentBoard
		.reduce((accumulator, element) => {
			if (element.row === row && element.col < col) {
				return accumulator.concat(element);
			}
			return accumulator;
		}, [])
		.reverse();

	const squaresRight = currentBoard.reduce((accumulator, element) => {
		if (element.row === row && element.col > col) {
			return accumulator.concat(element);
		}
		return accumulator;
	}, []);

	const squaresBelow = currentBoard.reduce((accumulator, element) => {
		if (element.row > row && element.col === col) {
			return accumulator.concat(element);
		}
		return accumulator;
	}, []);

	return validateMoves(
		[squaresAbove, squaresBelow, squaresLeft, squaresRight],
		maxMoves,
		playerColor
	);
};

export const getPotentialDiagonalMoves = (
	currentBoard,
	currentPosition,
	maxMoves = 7
) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	const topLeftPotentialSquares = [];
	const topRightPotentialSquares = [];
	const bottomLeftPotentialSquares = [];
	const bottomRightPotentialSquares = [];

	for (let i = 1; i <= maxMoves; i++) {
		topLeftPotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, -i, -i)
		);
		topRightPotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, -i, i)
		);
		bottomLeftPotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, i, -i)
		);
		bottomRightPotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, i, i)
		);
	}

	return validateMoves(
		[
			topLeftPotentialSquares,
			topRightPotentialSquares,
			bottomRightPotentialSquares,
			bottomLeftPotentialSquares
		],
		maxMoves,
		playerColor
	);
};
