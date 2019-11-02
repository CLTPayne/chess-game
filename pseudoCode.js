// function getPotentialHorizontalOrVerticalMoves(
// 	currentBoard,
// 	currentPosition,
// 	maxMoves
// ) {
// 	// 1. Get the piece color
// 	// 2. Get all possible moves as four sub-arrays (maybe)
// 	// 3. Find break point of each of the sub-arrays and filter out anything after that point (take color into consideration)
// 	// 4. Return flat array of moves
// }

// // ROOK
// const potentialMoves = [
// 	...getPotentialHorizontalOrVerticalMoves(
// 		currentBoard,
// 		currentPosition,
// 		Infinity
// 	)
// ];
// Nothing else

// BISHOP
// const potentialMoves = [
//   ...getPotentialDiagonalMoves(currentBoard, currentPosition, Infinity)
// ];
// Nothing else

// QUEEN
// const potentialMoves = [
//   ...getPotentialHorizontalOrVerticalMoves(
//     currentBoard,
//     currentPosition,
//     Infinity
//   ),
//   ...getPotentialDiagonalMoves(currentBoard, currentPosition, Infinity)
// ];
// Nothing else

// KING
// const potentialMoves = [
//   ...getPotentialHorizontalOrVerticalMoves(currentBoard, currentPosition, 1),
//   ...getPotentialDiagonalMoves(currentBoard, currentPosition, 1)
// ];
// Some extra stuff for check

// KNIGHT
// Completely custom for now, but possibly refactor to be a bit more like the above

// PAWN
// Completely custom for now, but possibly refactor to be a bit more like the above
