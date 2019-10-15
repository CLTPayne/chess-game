import {
	getPosition,
	getOppositionPositions,
	moves,
	cloneBoard
} from "./chessboard.js";

// eslint-disable-next-line
export const kingValidMoves = (currentBoard, currentPosition) => {
	let { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;
	const validMoves = [];

	// pass in current position and destructure
	// export to a helpers and use across all rules
	// get rid of the implicit return for readability
	const getRelativePosition = (rowDifference, colDifference) => element =>
		element.row === row + rowDifference &&
		element.col === col + colDifference;

	// how can currentBoard.find be abstracted away
	// getRelativePosition(currentBoard, currentPosition, rowDifference, colDifference) {}
	const allPotentialMoves = [
		currentBoard.find(getRelativePosition(-1, -1)),
		currentBoard.find(getRelativePosition(-1, 0)),
		currentBoard.find(getRelativePosition(-1, +1)),
		currentBoard.find(getRelativePosition(0, +1)),
		currentBoard.find(getRelativePosition(+1, +1)),
		currentBoard.find(getRelativePosition(+1, 0)),
		currentBoard.find(getRelativePosition(+1, -1)),
		currentBoard.find(getRelativePosition(0, -1))
	].filter(element => Boolean(element));

	for (const element of allPotentialMoves) {
		if (element.piece === null) {
			validMoves.push(element);
		}
		if (element.piece !== null && element.piece.color !== playerColor) {
			validMoves.push(element);
		}
	}

	const isValidMoveOccupiedSquare = (position, validMoves) => {
		return validMoves.some(
			move =>
				move.row === position.row &&
				move.col === position.col &&
				position.piece &&
				position.piece.type
		);
	};

	const deduct = (row, number) => row - number;
	const add = (row, number) => row + number;

	const opponentValidMoves = getOppositionPositions(currentBoard, playerColor)
		.map(element => {
			const operator = element.piece.color === "white" ? deduct : add;
			if (element.piece.type === "pawn") {
				return [
					currentBoard.find(
						pawnElement =>
							pawnElement.row === operator(element.row, 1) &&
							pawnElement.col === element.col - 1
					),
					currentBoard.find(
						pawnElement =>
							pawnElement.row === operator(element.row, 1) &&
							pawnElement.col === element.col + 1
					)
				].filter(element => element);
			} else if (
				element.piece.type !== "king" &&
				moves[element.piece.type]
			) {
				return moves[element.piece.type](currentBoard, element);
			}

			// modifiy this to a if / else if / else
			// if not king...
			// if pawn... and apply the valid capture logic
			// not very dry as it's a repitition of code
			// refactor into pawnValidCaptures function that is called by both
			element.piece.type !== "king" &&
				moves[element.piece.type] &&
				moves[element.piece.type](currentBoard, element);
		})
		.filter(element => element)
		.reduce((acc, value) => acc.concat(value), []);

	const movesInCheck = [];
	for (const element of validMoves) {
		for (const move of opponentValidMoves) {
			if (element.col === move.col && element.row === move.row) {
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

			const opponentValidMovesIfPieceTaken = getOppositionPositions(
				newBoard,
				playerColor
			)
				.map(
					element =>
						element.piece.type !== "king" &&
						moves[element.piece.type] &&
						moves[element.piece.type](newBoard, element)
				)
				.filter(element => element)
				.reduce((acc, value) => acc.concat(value), []);

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
