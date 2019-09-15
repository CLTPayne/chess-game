import { generateChessBoard, movePiece } from "./chessboard";
import { knightValidMoves } from "./knight";

describe('#knightValidMoves', () => {
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
            { "col": 5, "color": "white", "piece": null, "row": 5 },
            { "col": 7, "color": "white", "piece": null, "row": 5 }
        ]
        expect(knightValidMoves(currentBoard, currentPosition)).toStrictEqual(correctValidMoves);
    });
})