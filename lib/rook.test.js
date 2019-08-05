import { rookValidMoves } from "./rook";
import { generateChessBoard, movePiece } from "./chessboard.js";

// The rook moves horizontally or vertically, through any number of unoccupied squares (see diagram).
// As with captures by other pieces, the rook captures by occupying the square on which the enemy piece sits.
// The rook also participates, with the king, in a special move called castling.

describe("#rookValidMoves", () => {
  let currentBoard;

  beforeEach(() => {
    currentBoard = generateChessBoard();
  });

  afterEach(() => {
    currentBoard = [];
  });

  it("identifies valid vertical moves for an a8 rook at start of a game", () => {
    const currentPosition = { row: 0, col: 0 };
    expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([]);
  });

  it("identifies valid vertical moves for an h8 black rook at start of a game", () => {
    const currentPosition = { row: 0, col: 7 };
    expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([]);
  });

  it("identifies valid vertical moves for an a1 rook at start of a game", () => {
    const currentPosition = { row: 7, col: 0 };
    expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([]);
  });

  it("identifies valid vertical moves for an h1 rook at start of a game", () => {
    const currentPosition = { row: 7, col: 7 };
    expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([]);
  });

  it("identifies horizontal & vertical moves for a rook", () => {
    const midGameBoard = movePiece(currentBoard, [0, 0], [3, 4]);
    const currentPosition = { row: 3, col: 4 };
    const correctValidMoves = [
      { row: 2, col: 4, piece: null, color: "white" },
      { row: 4, col: 4, piece: null, color: "white" },
      { row: 5, col: 4, piece: null, color: "black" },
      {
        row: 6,
        col: 4,
        piece: { type: "pawn", color: "white" },
        color: "white"
      },
      { row: 3, col: 3, piece: null, color: "white" },
      { row: 3, col: 2, piece: null, color: "black" },
      { row: 3, col: 1, piece: null, color: "white" },
      { row: 3, col: 0, piece: null, color: "black" },
      { row: 3, col: 5, piece: null, color: "white" },
      { row: 3, col: 6, piece: null, color: "black" },
      { row: 3, col: 7, piece: null, color: "white" }
    ];
    const result = rookValidMoves(midGameBoard, currentPosition)
    expect(result).toStrictEqual(
      correctValidMoves
    );
    expect(result.length).toEqual(11);
  });

  it("does not return a position occupied by the a piece belonging to the same player as a valid move", () => {
    const firstMoveBoard = movePiece(currentBoard, [1, 0], [3, 4]);
    const secondMoveBoard = movePiece(firstMoveBoard, [0, 0], [2, 4]);
    const thirdMoveBoard = movePiece(secondMoveBoard, [1, 4], [5, 6]);
    const forthMoveBoard = movePiece(thirdMoveBoard, [6, 5], [4, 7]);
    const currentPosition = { row: 2, col: 4 };
    const correctValidMoves = [
      { row: 1, col: 4, piece: null, color: "black" },
      { row: 2, col: 3, piece: null, color: "black" },
      { row: 2, col: 2, piece: null, color: "white" },
      { row: 2, col: 1, piece: null, color: "black" },
      { row: 2, col: 0, piece: null, color: "white" },
      { row: 2, col: 5, piece: null, color: "black" },
      { row: 2, col: 6, piece: null, color: "white" },
      { row: 2, col: 7, piece: null, color: "black" }
    ];
    const blackPawnInPlay = {
      row: 1,
      col: 4,
      piece: { type: "pawn", color: "black" },
      color: "black"
    };
    expect(rookValidMoves(forthMoveBoard, currentPosition)).toStrictEqual(
      correctValidMoves
    );
    expect(rookValidMoves(forthMoveBoard, currentPosition)).not.toContain(
      blackPawnInPlay
    );
  });

  // it('does not return a position that is blocked by an occupied square', () => { })
});
