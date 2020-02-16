import { queenValidMoves } from "./queen";
import { generateChessBoard, movePiece } from "./chessboard";

// The queen can be moved any number of unoccupied squares in a straight line vertically,
// horizontally, or diagonally, thus combining the moves of the rook and bishop.

describe("queenValidMoves", () => {
	let currentBoard;

	beforeEach(() => {
		currentBoard = generateChessBoard();
	});

	afterEach(() => {
		currentBoard = [];
	});

	it("identifies valid diagonal moves for a queen starting in starting postion d8", () => {
		const currentPosition = { row: 7, col: 3 };
		expect(queenValidMoves(currentBoard, currentPosition)).toStrictEqual(
			[]
		);
	});

	it("identifies valid diagonal, horizontal and vertical moves for a queen in mid game position", () => {
		const { newBoard: midGameBoard } = movePiece(
			currentBoard,
			[7, 3],
			[4, 3]
		);
		const currentPosition = { row: 4, col: 3 };
		const correctValidMoves = [
			{ row: 3, col: 3, piece: null, color: "white" },
			{ row: 2, col: 3, piece: null, color: "black" },
			{
				row: 1,
				col: 3,
				piece: { color: "black", type: "pawn", hasMoved: false },
				color: "white"
			},
			{ row: 5, col: 3, piece: null, color: "white" },
			{ row: 4, col: 2, piece: null, color: "white" },
			{ row: 4, col: 1, piece: null, color: "black" },
			{ row: 4, col: 0, piece: null, color: "white" },
			{ row: 4, col: 4, piece: null, color: "white" },
			{ row: 4, col: 5, piece: null, color: "black" },
			{ row: 4, col: 6, piece: null, color: "white" },
			{ row: 4, col: 7, piece: null, color: "black" },
			{ row: 3, col: 2, piece: null, color: "black" },
			{ row: 2, col: 1, piece: null, color: "black" },
			{
				row: 1,
				col: 0,
				piece: { color: "black", type: "pawn", hasMoved: false },
				color: "black"
			},
			{ row: 3, col: 4, piece: null, color: "black" },
			{ row: 2, col: 5, piece: null, color: "black" },
			{
				row: 1,
				col: 6,
				piece: { color: "black", type: "pawn", hasMoved: false },
				color: "black"
			},
			{ row: 5, col: 4, piece: null, color: "black" },
			{ row: 5, col: 2, piece: null, color: "black" }
		];
		expect(queenValidMoves(midGameBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("does not return a position that is blocked by an occupied square", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[0, 3],
			[2, 1]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[6, 3],
			[2, 3]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[7, 2],
			[5, 4]
		);
		const { newBoard: fourthMoveBoard } = movePiece(
			thirdMoveBoard,
			[1, 7],
			[4, 5]
		);
		const currentPosition = { row: 2, col: 1 };
		const blockedSquare = { row: 2, col: 4, piece: null, color: "white" };
		expect(queenValidMoves(fourthMoveBoard, currentPosition)).not.toEqual(
			expect.arrayContaining([expect.objectContaining(blockedSquare)])
		);
	});
});
