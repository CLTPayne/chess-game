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

export const isMatchingSquare = (firstElement, secondElement) =>
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

const validateMoves = (nestedArray, playerColor) => {
	const validMoves = [];
	nestedArray.forEach(subArray => {
		for (const element of subArray) {
			if (element === undefined) {
				continue;
			}
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

export const getPotentialHorizontalOrVerticalMoves = (
	currentBoard,
	currentPosition,
	maxMoves = 7
) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	const abovePotentialSquares = [];
	const leftPotentialSquares = [];
	const rightPotentialSquares = [];
	const belowPotentialSquares = [];

	for (let i = 1; i <= maxMoves; i++) {
		abovePotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, -i, 0)
		);
		belowPotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, i, 0)
		);
		leftPotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, 0, -i)
		);
		rightPotentialSquares.push(
			potentialSquare(currentBoard, currentPosition, 0, i)
		);
	}

	return validateMoves(
		[
			abovePotentialSquares,
			belowPotentialSquares,
			leftPotentialSquares,
			rightPotentialSquares
		],
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
		playerColor
	);
};
