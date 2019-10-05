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

	it("does not return a position that is blocked by another piece of any color", () => {
		const firstMoveBoard = movePiece(currentBoard, [1, 3], [3, 3]);
		const secondMoveBoard = movePiece(firstMoveBoard, [6, 3], [4, 3]);
		const currentPosition = { row: 3, col: 3 };
		expect(pawnValidMoves(secondMoveBoard, currentPosition)).toStrictEqual(
			[]
		);
	});

	it("can use the initial two-square advance to move one square if second is blocked", () => {
		const firstMoveBoard = movePiece(currentBoard, [6, 4], [4, 4]);
		const secondMoveBoard = movePiece(firstMoveBoard, [1, 2], [3, 2]);
		const thirdMoveBoard = movePiece(secondMoveBoard, [4, 4], [3, 4]);
		const currentPosition = { row: 1, col: 4 };
		const correctValidMoves = [
			{ col: 4, color: "white", piece: null, row: 2 }
		];
		expect(pawnValidMoves(thirdMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("can not use the initial two-square advance to jump over an occupied square", () => {
		const firstMoveBoard = movePiece(currentBoard, [1, 2], [3, 2]);
		const secondMoveBoard = movePiece(firstMoveBoard, [6, 6], [6, 5]);
		const thirdMoveBoard = movePiece(secondMoveBoard, [3, 2], [5, 2]);
		const currentPosition = { row: 6, col: 2 };
		expect(pawnValidMoves(thirdMoveBoard, currentPosition)).toStrictEqual(
			[]
		);
	});
});
