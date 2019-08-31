import { queenValidMoves } from "./queen";
import { generateChessBoard } from "./chessboard";

// The queen can be moved any number of unoccupied squares in a straight line vertically,
// horizontally, or diagonally, thus combining the moves of the rook and bishop.

describe('queenValidMoves', () => {
    let currentBoard;

    beforeEach(() => {
        currentBoard = generateChessBoard()
    })

    afterEach(() => {
        currentBoard = []
    })

    it('identifies valid diagonal moves for a queen starting in starting postion d8', () => {
        const currentPosition = { row: 7, col: 3 };
        expect(queenValidMoves(currentBoard, currentPosition)).toStrictEqual([]);
    })
})