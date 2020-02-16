import { bishopValidMoves } from "./bishop.js";
import { generateChessBoard, movePiece } from "./chessboard.js";

// The bishop has no restrictions in distance for each move, but is limited to diagonal movement.
// Bishops, like all other pieces except the knight, cannot jump over other pieces.
// A bishop captures by occupying the square on which an enemy piece sits.
// The bishops may be differentiated according to which wing they begin on,
// i.e.the king's bishop and queen's bishop. As a consequence of its diagonal movement,
// each bishop always remains on either the white or black squares,
// and so it is also common to refer to them as light - squared or dark - squared bishops.

describe("#bishopValidMoves", () => {
	let currentBoard;

	beforeEach(() => {
		currentBoard = generateChessBoard();
	});

	afterEach(() => {
		currentBoard = [];
	});

	it("identifies valid diagonal moves for a bishop in starting postion c8", () => {
		const currentPosition = { row: 0, col: 2 };
		expect(bishopValidMoves(currentBoard, currentPosition)).toStrictEqual(
			[]
		);
	});

	it("identifies valid diagonal moves for a bishop in mid game position", () => {
		const { newBoard: midGameBoard } = movePiece(
			currentBoard,
			[0, 2],
			[4, 3]
		);
		const currentPosition = { row: 4, col: 3 };
		const correctValidMoves = [
			{ row: 3, col: 2, piece: null, color: "black" },
			{ row: 2, col: 1, piece: null, color: "black" },
			{ row: 3, col: 4, piece: null, color: "black" },
			{ row: 2, col: 5, piece: null, color: "black" },
			{ row: 5, col: 4, piece: null, color: "black" },
			{
				row: 6,
				col: 5,
				piece: { type: "pawn", color: "white", hasMoved: false },
				color: "black"
			},
			{ row: 5, col: 2, piece: null, color: "black" },
			{
				row: 6,
				col: 1,
				piece: { type: "pawn", color: "white", hasMoved: false },
				color: "black"
			}
		];
		expect(bishopValidMoves(midGameBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
	});

	it("only moves to squares the same colour when the starting square is white", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 4],
			[2, 4]
		);
		const { newBoard: secondMoveBoard } = movePiece(
			firstMoveBoard,
			[6, 6],
			[2, 6]
		);
		const { newBoard: thirdMoveBoard } = movePiece(
			secondMoveBoard,
			[7, 5],
			[3, 1]
		);
		const currentPosition = { row: 3, col: 1 };
		const correctValidMoves = [
			{ row: 2, col: 0, piece: null, color: "white" },
			{ row: 2, col: 2, piece: null, color: "white" },
			{
				row: 1,
				col: 3,
				piece: { type: "pawn", color: "black", hasMoved: false },
				color: "white"
			},
			{ row: 4, col: 2, piece: null, color: "white" },
			{ row: 5, col: 3, piece: null, color: "white" },
			{ row: 6, col: 4, piece: null, color: "white" },
			{ row: 7, col: 5, piece: null, color: "white" },
			{ row: 4, col: 0, piece: null, color: "white" }
		];
		expect(bishopValidMoves(thirdMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
		const validMoveSquareColor = bishopValidMoves(
			thirdMoveBoard,
			currentPosition
		).filter(move => {
			return move.color === "white";
		});
		expect(validMoveSquareColor.length).toEqual(correctValidMoves.length);
	});

	it("only moves to squares the same colour when the starting square is black", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 1],
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
		const currentPosition = { row: 5, col: 4 };
		const correctValidMoves = [
			{ row: 4, col: 3, piece: null, color: "black" },
			{ row: 3, col: 2, piece: null, color: "black" },
			{ row: 4, col: 5, piece: null, color: "black" },
			{ row: 3, col: 6, piece: null, color: "black" },
			{ row: 2, col: 7, piece: null, color: "black" },
			{ row: 6, col: 3, piece: null, color: "black" },
			{ row: 7, col: 2, piece: null, color: "black" }
		];
		expect(bishopValidMoves(thirdMoveBoard, currentPosition)).toStrictEqual(
			correctValidMoves
		);
		const validMoveSquareColor = bishopValidMoves(
			thirdMoveBoard,
			currentPosition
		).filter(move => {
			return move.color === "black";
		});
		expect(validMoveSquareColor.length).toEqual(correctValidMoves.length);
	});

	it("does not return a position occupied by the a piece belonging to the same player as a valid move", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 1],
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
		const currentPosition = { row: 5, col: 4 };
		const whitePawnInPath = {
			row: 2,
			col: 1,
			piece: { type: "pawn", color: "white", hasMoved: true },
			color: "black"
		};
		expect(bishopValidMoves(thirdMoveBoard, currentPosition)).not.toContain(
			whitePawnInPath
		);
	});

	it("does not return a position that is blocked by an occupied square", () => {
		const { newBoard: firstMoveBoard } = movePiece(
			currentBoard,
			[6, 1],
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
		const currentPosition = { row: 5, col: 4 };
		const blockedSquare = { row: 3, col: 6, piece: null, color: "black" };
		expect(
			bishopValidMoves(fourthMoveBoard, currentPosition)
		).not.toContain(blockedSquare);
	});
});
