import { generateChessBoard, movePiece } from "./chessboard";
import { kingValidMoves } from "./king";

// A king can move one square in any direction(horizontally, vertically, or diagonally)
// unless the square is already occupied by a friendly piece or the move would place the king in check.
// As a result, opposing kings may never occupy adjacent squares(see opposition),
// but the king can give discovered check by unmasking a bishop, rook, or queen.
// The king is also involved in the special move of castling.

describe("#kingValidMoves", () => {
	let currentBoard;

	beforeEach(() => {
		currentBoard = generateChessBoard();
	});

	afterEach(() => {
		currentBoard = [];
	});

	it("identifies valid one square moves for an e1 king at start of a game", () => {
		const currentPosition = { row: 7, col: 4 };
		expect(kingValidMoves(currentBoard, currentPosition)).toStrictEqual([]);
	});

	it("identifies all availble moves that are not obscured by other pieces", () => {
		const { newBoard: midGameBoard } = movePiece(
			currentBoard,
			[7, 4],
			[4, 4]
		);
		const currentPosition = { row: 4, col: 4 };
		const correctValidMoves = [
			{ row: 3, col: 3, piece: null, color: "white" },
			{ row: 3, col: 5, piece: null, color: "white" },
			{ row: 5, col: 5, piece: null, color: "white" },
			{ row: 5, col: 3, piece: null, color: "white" },
			{ row: 3, col: 4, piece: null, color: "black" },
			{ row: 5, col: 4, piece: null, color: "black" },
			{ row: 4, col: 3, piece: null, color: "black" },
			{ row: 4, col: 5, piece: null, color: "black" }
		];
		expect(kingValidMoves(midGameBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("does not return a position that is blocked by another piece", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[7, 4],
			[4, 3]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[6, 4],
			[5, 3]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[1, 1],
			[4, 4]
		);
		const currentPosition = { row: 4, col: 3 };
		const correctValidMoves = [
			{ row: 3, col: 2, piece: null, color: "black" },
			{ row: 3, col: 4, piece: null, color: "black" },
			{ row: 5, col: 4, piece: null, color: "black" },
			{ row: 5, col: 2, piece: null, color: "black" },
			{ row: 3, col: 3, piece: null, color: "white" },
			{ row: 4, col: 2, piece: null, color: "white" },
			{
				row: 4,
				col: 4,
				piece: {
					color: "black",
					type: "pawn",
					hasMoved: true
				},
				color: "white"
			}
		];
		expect(kingValidMoves(thirdMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("does not return a position that is in check from an opponent piece", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[3, 4]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[7, 4],
			[4, 3]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[1, 3],
			[2, 2]
		);
		const { newBoard: fourthMoveBoard } = movePiece(
			thirdMoveBoard,
			[0, 3],
			[5, 5]
		);
		const currentPosition = { row: 4, col: 3 };
		const correctValidMoves = [
			{ row: 3, col: 2, piece: null, color: "black" },
			{ row: 4, col: 2, piece: null, color: "white" }
		];
		expect(kingValidMoves(fourthMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("does not return a position that would be in check if the king moved and took a piece", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[5, 4]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[7, 4],
			[4, 1]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[1, 3],
			[3, 2]
		);
		const { newBoard: fourthMoveBoard } = movePiece(
			thirdMoveBoard,
			[0, 3],
			[3, 3]
		);
		const currentPosition = { row: 4, col: 1 };
		const correctValidMoves = [
			{ row: 3, col: 0, piece: null, color: "black" },
			{ row: 5, col: 2, piece: null, color: "black" },
			{ row: 5, col: 0, piece: null, color: "black" },
			{ row: 3, col: 1, piece: null, color: "white" },
			{ row: 4, col: 0, piece: null, color: "white" }
		];
		expect(kingValidMoves(fourthMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("does not return a position that would be in check from a pawn move, just a pawn capture", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[4, 4]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[7, 4],
			[6, 4]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[1, 5],
			[3, 5]
		);
		const { newBoard: fourthMoveBoard } = movePiece(
			thirdMoveBoard,
			[6, 4],
			[5, 5]
		);
		const currentPosition = { row: 5, col: 5 };
		const correctValidMoves = [
			{ row: 6, col: 4, piece: null, color: "white" },
			{ row: 4, col: 5, piece: null, color: "black" },
			{ row: 5, col: 4, piece: null, color: "black" },
			{ row: 5, col: 6, piece: null, color: "black" }
		];
		expect(kingValidMoves(fourthMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("identifies a valid queenside castling move for black king", () => {
		// Based on the Averbakh game - https://en.wikipedia.org/wiki/Castling
		const currentBoard = [
			{
				row: 0,
				col: 0,
				piece: { color: "black", hasMoved: false, type: "rook" },
				color: "white"
			},
			{ row: 0, col: 1, piece: null, color: "black" },
			{ row: 0, col: 2, piece: null, color: "white" },
			{ row: 0, col: 3, piece: null, color: "black" },
			{
				row: 0,
				col: 4,
				piece: { color: "black", hasMoved: false, type: "king" },
				color: "white"
			},
			{
				row: 0,
				col: 5,
				piece: { color: "black", hasMoved: true, type: "bishop" },
				color: "black"
			},
			{ row: 0, col: 6, piece: null, color: "white" },
			{
				row: 0,
				col: 7,
				piece: { color: "black", hasMoved: false, type: "rook" },
				color: "black"
			},
			{
				row: 1,
				col: 0,
				piece: { color: "black", hasMoved: false, type: "pawn" },
				color: "black"
			},
			{ row: 1, col: 1, piece: null, color: "white" },
			{ row: 1, col: 2, piece: null, color: "black" },
			{ row: 1, col: 3, piece: null, color: "white" },
			{ row: 1, col: 4, piece: null, color: "black" },
			{ row: 1, col: 5, piece: null, color: "white" },
			{
				row: 1,
				col: 6,
				piece: { color: "black", hasMoved: false, type: "pawn" },
				color: "black"
			},
			{
				row: 1,
				col: 7,
				piece: { color: "black", hasMoved: false, type: "pawn" },
				color: "white"
			},
			{ row: 2, col: 0, piece: null, color: "white" },
			{ row: 2, col: 1, piece: null, color: "black" },
			{
				row: 2,
				col: 2,
				piece: { color: "black", hasMoved: true, type: "pawn" },
				color: "white"
			},
			{ row: 2, col: 3, piece: null, color: "black" },
			{
				row: 2,
				col: 4,
				piece: { color: "black", hasMoved: true, type: "bishop" },
				color: "white"
			},
			{
				row: 2,
				col: 5,
				piece: { color: "black", hasMoved: true, type: "pawn" },
				color: "black"
			},
			{ row: 2, col: 6, piece: null, color: "white" },
			{ row: 2, col: 7, piece: null, color: "black" },
			{ row: 3, col: 0, piece: null, color: "black" },
			{ row: 3, col: 1, piece: null, color: "white" },
			{ row: 3, col: 2, piece: null, color: "black" },
			{ row: 3, col: 3, piece: null, color: "white" },
			{
				row: 3,
				col: 4,
				piece: { color: "black", hasMoved: true, type: "pawn" },
				color: "black"
			},
			{ row: 3, col: 5, piece: null, color: "white" },
			{ row: 3, col: 6, piece: null, color: "black" },
			{ row: 3, col: 7, piece: null, color: "white" },
			{ row: 4, col: 0, piece: null, color: "white" },
			{ row: 4, col: 1, piece: null, color: "black" },
			{
				row: 4,
				col: 2,
				piece: { color: "white", hasMoved: true, type: "pawn" },
				color: "white"
			},
			{ row: 4, col: 3, piece: null, color: "black" },
			{ row: 4, col: 4, piece: null, color: "white" },
			{ row: 4, col: 5, piece: null, color: "black" },
			{ row: 4, col: 6, piece: null, color: "white" },
			{ row: 4, col: 7, piece: null, color: "black" },
			{ row: 5, col: 0, piece: null, color: "black" },
			{ row: 5, col: 1, piece: null, color: "white" },
			{
				row: 5,
				col: 2,
				piece: { color: "white", hasMoved: true, type: "pawn" },
				color: "black"
			},
			{ row: 5, col: 3, piece: null, color: "white" },
			{ row: 5, col: 4, piece: null, color: "black" },
			{ row: 5, col: 5, piece: null, color: "white" },
			{ row: 5, col: 6, piece: null, color: "black" },
			{ row: 5, col: 7, piece: null, color: "white" },
			{
				row: 6,
				col: 0,
				piece: { color: "white", hasMoved: false, type: "pawn" },
				color: "white"
			},
			{ row: 6, col: 1, piece: null, color: "black" },
			{ row: 6, col: 2, piece: null, color: "white" },
			{
				row: 6,
				col: 3,
				piece: { color: "white", hasMoved: true, type: "knight" },
				color: "black"
			},
			{
				row: 6,
				col: 4,
				piece: { color: "white", hasMoved: false, type: "pawn" },
				color: "white"
			},
			{
				row: 6,
				col: 5,
				piece: { color: "white", hasMoved: false, type: "pawn" },
				color: "black"
			},
			{ row: 6, col: 6, piece: null, color: "white" },
			{
				row: 6,
				col: 7,
				piece: { color: "white", hasMoved: false, type: "pawn" },
				color: "black"
			},
			{ row: 7, col: 0, piece: null, color: "black" },
			{
				row: 7,
				col: 1,
				piece: { color: "white", hasMoved: true, type: "rook" },
				color: "white"
			},
			{
				row: 7,
				col: 2,
				piece: { color: "white", hasMoved: false, type: "bishop" },
				color: "black"
			},
			{ row: 7, col: 3, piece: null, color: "white" },
			{
				row: 7,
				col: 4,
				piece: { color: "white", hasMoved: false, type: "king" },
				color: "black"
			},
			{ row: 7, col: 5, piece: null, color: "white" },
			{ row: 7, col: 6, piece: null, color: "black" },
			{
				row: 7,
				col: 7,
				piece: { color: "white", hasMoved: false, type: "rook" },
				color: "white"
			}
		];
		const currentPosition = { row: 0, col: 4 };
		const correctValidMoves = [
			{ row: 1, col: 5, piece: null, color: "white" },
			{ row: 1, col: 3, piece: null, color: "white" },
			{ row: 1, col: 4, piece: null, color: "black" },
			{ row: 0, col: 3, piece: null, color: "black" },
			{ row: 0, col: 2, piece: null, color: "white" }
		];
		expect(kingValidMoves(currentBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});
});
