import { generateChessBoard, movePiece } from "./chessboard";
import { knightValidMoves } from "./knight";

describe("#knightValidMoves", () => {
	let currentBoard;

	beforeEach(() => {
		currentBoard = generateChessBoard();
	});

	afterEach(() => {
		currentBoard = [];
	});

	it("identifies valid one square moves for an g1 knight at start of a game", () => {
		const currentPosition = { row: 7, col: 6 };
		const correctValidMoves = [
			{ col: 5, color: "white", piece: null, row: 5 },
			{ col: 7, color: "white", piece: null, row: 5 }
		];
		expect(knightValidMoves(currentBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("does not return a position that is blocked by another piece of the same color", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[7, 6],
			[5, 5]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[6, 6],
			[3, 4]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[1, 7],
			[3, 6]
		);
		const currentPosition = { row: 5, col: 5 };
		const correctValidMoves = [
			{ col: 3, color: "black", piece: null, row: 4 },
			{
				col: 6,
				color: "black",
				piece: {
					color: "black",
					type: "pawn",
					hasMoved: true
				},
				row: 3
			},
			{ col: 7, color: "black", piece: null, row: 4 },
			{ col: 6, color: "black", piece: null, row: 7 }
		];
		expect(knightValidMoves(thirdMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});
});
