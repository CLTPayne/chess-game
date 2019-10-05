import { pawnValidMoves } from "./pawn";
import { generateChessBoard, movePiece } from "./chessboard";

// Unlike the other pieces, pawns cannot move backwards.
// Normally a pawn moves by advancing a single square, but the first time a pawn moves,
// it has the option of advancing two squares. Pawns may not use the initial two-square
// advance to jump over an occupied square, or to capture.
// Any piece immediately in front of a pawn, friend or foe, blocks its advance.

describe("#pawnValidMoves", () => {
	let currentBoard;

	beforeEach(() => {
		currentBoard = generateChessBoard();
	});

	afterEach(() => {
		currentBoard = [];
	});

	it("identifies valid pawn moves for starting postion e2", () => {
		const currentPosition = { row: 6, col: 4 };
		const correctValidMoves = [
			{ col: 4, color: "black", piece: null, row: 5 },
			{ col: 4, color: "white", piece: null, row: 4 }
		];
		expect(pawnValidMoves(currentBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("identifies valid pawan moves for a pawn in play mid game", () => {
		const firstMoveBoard = movePiece(currentBoard, [6, 4], [4, 4]);
		const currentPosition = { row: 4, col: 4 };
		const correctValidMoves = [
			{ col: 4, color: "black", piece: null, row: 3 }
		];
		expect(pawnValidMoves(firstMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});
});
