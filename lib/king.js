import {
	getPosition,
	getOppositionPositions,
	moves,
	cloneBoard
} from "./chessboard.js";
export const kingValidMoves = (currentBoard, currentPosition) => {
	let { row, col } = currentPosition;
	const playerColor = getPosition(currentBoard, row, col).piece.color;
	const validMoves = [];

	const topLeft = currentBoard.find(
		element => element.row === row - 1 && element.col === col - 1
	);
	const topMiddle = currentBoard.find(
		element => element.row === row - 1 && element.col === col
	);
	const topRight = currentBoard.find(
		element => element.row === row - 1 && element.col === col + 1
	);
	const rightMiddle = currentBoard.find(
		element => element.row === row && element.col === col + 1
	);
	const bottomRight = currentBoard.find(
		element => element.row === row + 1 && element.col === col + 1
	);
	const bottomMiddle = currentBoard.find(
		element => element.row === row + 1 && element.col === col
	);
	const bottomLeft = currentBoard.find(
		element => element.row === row + 1 && element.col === col - 1
	);
	const leftMiddle = currentBoard.find(
		element => element.row === row && element.col === col - 1
	);

	const allPotentialMoves = [
		topLeft,
		topMiddle,
		topRight,
		rightMiddle,
		bottomRight,
		bottomMiddle,
		bottomLeft,
		leftMiddle
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
			// refactor into pawnValidCaptures function that is called by both pawn valid moves and king
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
