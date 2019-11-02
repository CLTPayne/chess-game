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

	const validMoves = [];
	[squaresAbove, squaresBelow, squaresLeft, squaresRight].forEach(
		subArray => {
			subArray.slice(0, maxMoves);
			for (const element of subArray) {
				if (element.piece === null) {
					validMoves.push(element);
				}
				if (
					element.piece !== null &&
					element.piece.color !== playerColor
				) {
					validMoves.push(element);
					break;
				}
				if (
					element.piece !== null &&
					element.piece.color === playerColor
				) {
					break;
				}
			}
		}
	);

	return validMoves;
};

export const getPotentialDiagonalMoves = (
	currentBoard,
	currentPosition,
	maxMoves
) => {
	const { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;

	const topLeftPotentialSquares = [];
	const topRightPotentialSquares = [];
	const bottomLeftPotentialSquares = [];
	const bottomRightPotentialSquares = [];

	for (let i = 1; i <= 7; i++) {
		topLeftPotentialSquares.push(
			currentBoard.find(
				element => element.row === row - i && element.col === col - i
			)
		);
		topRightPotentialSquares.push(
			currentBoard.find(
				element => element.row === row - i && element.col === col + i
			)
		);
		bottomLeftPotentialSquares.push(
			currentBoard.find(
				element => element.row === row + i && element.col === col - i
			)
		);
		bottomRightPotentialSquares.push(
			currentBoard.find(
				element => element.row === row + i && element.col === col + i
			)
		);
	}

	const validMoves = [];
	[
		topLeftPotentialSquares,
		topRightPotentialSquares,
		bottomRightPotentialSquares,
		bottomLeftPotentialSquares
	].forEach(subArray => {
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
