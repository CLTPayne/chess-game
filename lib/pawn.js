import { getPosition } from "./chessboard.js"

export const pawnValidMoves = (currentBoard, currentPosition) => {
	let allPotentialMoves
	const { row, col } = currentPosition
	const playerColor = getPosition(currentBoard, row, col).piece.color

	// Can only be on start row if never moved as can't move to side. Only forwards.
	const pawnStartRow = playerColor === "black" ? 1 : 6

	const deduct = (row, number) => row - number
	const add = (row, number) => row + number
	const operator = playerColor === "white" ? deduct : add

	if (row === pawnStartRow) {
		// Move two squares
		allPotentialMoves = [
			currentBoard.find(
				element =>
					element.row === operator(row, 1) && element.col === col
			),
			currentBoard.find(
				element =>
					element.row === operator(row, 2) && element.col === col
			)
		]
	} else {
		// Move one square
		allPotentialMoves = [
			currentBoard.find(
				element =>
					element.row === operator(row, 1) && element.col === col
			)
		]
	}

	const allPotentialCaptures = [
		currentBoard.find(
			element =>
				element.row === operator(row, 1) &&
				element.col === col - 1 &&
				element.piece !== null
		),
		currentBoard.find(
			element =>
				element.row === operator(row, 1) &&
				element.col === col + 1 &&
				element.piece !== null
		)
	]

	const validMoves = [...allPotentialCaptures]

	for (const element of allPotentialMoves) {
		if (element.piece === null) {
			validMoves.push(element)
		} else {
			// don't include the second square if the first is occupied
			break
		}
	}

	return validMoves.filter(element => element)
}
