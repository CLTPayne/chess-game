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
