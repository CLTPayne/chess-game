import { queenValidMoves } from "./queen";
import { generateChessBoard, movePiece } from "./chessboard";

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

    it('identifies valid diagonal moves for a queen in mid game position', () => {
        const midGameBoard = movePiece(currentBoard, [7, 3], [4, 3]);
        const currentPosition = { row: 4, col: 3 };
        const correctValidMoves = [
            { "col": 2, "color": "black", "piece": null, "row": 3 },
            { "col": 1, "color": "black", "piece": null, "row": 2 },
            {
                "col": 0, "color": "black",
                "piece": { "color": "black", "type": "pawn" },
                "row": 1
            },
            { "col": 4, "color": "black", "piece": null, "row": 3 },
            { "col": 5, "color": "black", "piece": null, "row": 2 },
            {
                "col": 6, "color": "black",
                "piece": { "color": "black", "type": "pawn" },
                "row": 1
            },
            { "col": 4, "color": "black", "piece": null, "row": 5 },
            { "col": 2, "color": "black", "piece": null, "row": 5 }
        ];
        expect(queenValidMoves(midGameBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })
})