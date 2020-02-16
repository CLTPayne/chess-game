import { pawnValidMoves } from "./pawn";
import { generateChessBoard, movePiece } from "./chessboard";

// Unlike the other pieces, pawns cannot move backwards.
// Normally a pawn moves by advancing a single square, but the first time a pawn moves,
// it has the option of advancing two squares. Pawns may not use the initial two-square
// advance to jump over an occupied square, or to capture.
// Any piece immediately in front of a pawn, friend or foe, blocks its advance.
// There is also an en passant capture.

describe("#pawnValidMoves", () => {
	let currentBoard;
	let lastMove;

	beforeEach(() => {
		currentBoard = generateChessBoard();
		lastMove = {
			from: { row: 6, col: 7, piece: null, color: "black" },
			to: {
				row: 4,
				col: 7,
				piece: { type: "pawn", color: "white", hasMoved: true },
				color: "black"
			}
		};
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
		expect(
			pawnValidMoves(currentBoard, currentPosition, lastMove)
		).toStrictEqual(correctValidMoves);
	});

	it("identifies valid pawan moves for a pawn in play mid game", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[4, 4]
		);
		const currentPosition = { row: 4, col: 4 };
		const correctValidMoves = [
			{ col: 4, color: "black", piece: null, row: 3 }
		];
		expect(
			pawnValidMoves(firstMoveBoard, currentPosition, lastMove)
		).toStrictEqual(correctValidMoves);
	});

	it("does not return a position that is blocked by another piece of any color", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[1, 3],
			[3, 3]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[6, 3],
			[4, 3]
		);
		const currentPosition = { row: 3, col: 3 };
		expect(
			pawnValidMoves(secondMoveBoard, currentPosition, lastMove)
		).toStrictEqual([]);
	});

	it("can use the initial two-square advance to move one square if second is blocked", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[4, 4]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[1, 2],
			[3, 2]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[4, 4],
			[3, 4]
		);
		const currentPosition = { row: 1, col: 4 };
		const correctValidMoves = [
			{ col: 4, color: "white", piece: null, row: 2 }
		];
		expect(
			pawnValidMoves(thirdMoveBoard, currentPosition, lastMove)
		).toStrictEqual(correctValidMoves);
	});

	it("can not use the initial two-square advance to jump over an occupied square", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[1, 2],
			[3, 2]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[6, 6],
			[6, 5]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[3, 2],
			[5, 2]
		);
		const currentPosition = { row: 6, col: 2 };
		expect(
			pawnValidMoves(thirdMoveBoard, currentPosition, lastMove)
		).toStrictEqual([]);
	});

	it("identifies diagonal capturing moves", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[5, 4]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[1, 2],
			[3, 2]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[6, 2],
			[5, 2]
		);
		const { newBoard: fourthMoveBoard } = movePiece(
			thirdMoveBoard,
			[0, 1],
			[2, 2]
		);
		const { newBoard: fifthMoveBoard } = movePiece(
			fourthMoveBoard,
			[2, 2],
			[4, 3]
		);
		const { newBoard: sixthMoveBoard } = movePiece(
			fifthMoveBoard,
			[1, 5],
			[4, 5]
		);
		const currentPosition = { row: 5, col: 4 };
		// can take the occupied diagonals as well as one square ahead
		const correctValidMoves = [
			{
				col: 3,
				color: "black",
				piece: {
					color: "black",
					type: "knight",
					hasMoved: true
				},
				row: 4
			},
			{
				col: 5,
				color: "black",
				piece: {
					color: "black",
					type: "pawn",
					hasMoved: true
				},
				row: 4
			},
			{
				col: 4,
				color: "white",
				piece: null,
				row: 4
			}
		];
		expect(
			pawnValidMoves(sixthMoveBoard, currentPosition, lastMove)
		).toStrictEqual(correctValidMoves);
	});

	it("identifies diagonal capturing moves, and not the blocked forward move", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[5, 4]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[1, 2],
			[3, 2]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[6, 2],
			[5, 2]
		);
		const { newBoard: fourthMoveBoard } = movePiece(
			thirdMoveBoard,
			[0, 1],
			[2, 2]
		);
		const { newBoard: fifthMoveBoard } = movePiece(
			fourthMoveBoard,
			[2, 2],
			[4, 3]
		);
		const { newBoard: sixthMoveBoard } = movePiece(
			fifthMoveBoard,
			[1, 5],
			[4, 5]
		);
		const { newBoard: seventhMoveBoard } = movePiece(
			sixthMoveBoard,
			[1, 4],
			[4, 4]
		);
		const currentPosition = { row: 5, col: 4 };
		// can take the occupied diagonals only
		const correctValidMoves = [
			{
				col: 3,
				color: "black",
				piece: {
					color: "black",
					type: "knight",
					hasMoved: true
				},
				row: 4
			},
			{
				col: 5,
				color: "black",
				piece: {
					color: "black",
					type: "pawn",
					hasMoved: true
				},
				row: 4
			}
		];
		expect(
			pawnValidMoves(seventhMoveBoard, currentPosition, lastMove)
		).toStrictEqual(correctValidMoves);
	});

	it("does not identify the same player color pieces as a capture", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 5],
			[4, 5]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[6, 6],
			[4, 6]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[7, 6],
			[3, 4]
		);
		const currentPosition = { row: 4, col: 5 };
		// can take the occupied diagonals only
		const correctValidMoves = [
			{
				col: 5,
				color: "white",
				piece: null,
				row: 3
			}
		];
		expect(
			pawnValidMoves(thirdMoveBoard, currentPosition, lastMove)
		).toStrictEqual(correctValidMoves);
	});
});
