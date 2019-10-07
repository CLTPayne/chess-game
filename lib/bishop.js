import { getPosition } from "./chessboard.js"

export const bishopValidMoves = (currentBoard, currentPosition) => {
	let { row, col } = currentPosition
	const playerColor = getPosition(currentBoard, row, col).piece.color
	const topLeftPotentialSquares = []
	const topRightPotentialSquares = []
	const bottomLeftPotentialSquares = []
	const bottomRightPotentialSquares = []
	for (let i = 1; i <= 7; i++) {
		const topLeft = currentBoard.find(element => element.row === row - i && element.col === col - i)
		topLeftPotentialSquares.push(topLeft)
		const topRight = currentBoard.find(element => element.row === row - i && element.col === col + i)
		topRightPotentialSquares.push(topRight)
		const bottomLeft = currentBoard.find(element => element.row === row + i && element.col === col - i)
		bottomLeftPotentialSquares.push(bottomLeft)
		const bottomRight = currentBoard.find(element => element.row === row + i && element.col === col + i)
		bottomRightPotentialSquares.push(bottomRight)
	}
	const allPotentialDiagonals = [
		topLeftPotentialSquares,
		topRightPotentialSquares,
		bottomRightPotentialSquares,
		bottomLeftPotentialSquares
	]
	const validMoves = []
	allPotentialDiagonals.forEach(subArray => {
		const filtered = subArray.filter(element => Boolean(element))
		for (const element of filtered) {
			if (element.piece === null) {
				validMoves.push(element)
			}
			if (element.piece !== null && element.piece.color !== playerColor) {
				validMoves.push(element)
				// stop loop once you find more that one of the opponent pieces in the rook path
				// can a rook take a king? or all pieces?
				break
			}
			if (element.piece !== null && element.piece.color === playerColor) {
				// stop loop once you find one of your own pieces ni the rook path
				break
			}
		}
	})
	return validMoves
}