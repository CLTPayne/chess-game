import { generateChessBoard, movePiece } from "./chessboard";
import { kingValidMoves } from "./king";

// A king can move one square in any direction(horizontally, vertically, or diagonally)
// unless the square is already occupied by a friendly piece or the move would place the king in check.
// As a result, opposing kings may never occupy adjacent squares(see opposition), 
// but the king can give discovered check by unmasking a bishop, rook, or queen.
// The king is also involved in the special move of castling.

describe('#kingValidMoves', () => {
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

    it('identifies all availble moves that are not obscured by other pieces', () => {
        const midGameBoard = movePiece(currentBoard, [7, 4], [4, 4]);
        const currentPosition = { row: 4, col: 4 };
        const correctValidMoves = [
            { "col": 3, "color": "white", "piece": null, "row": 3 },
            { "col": 4, "color": "black", "piece": null, "row": 3 },
            { "col": 5, "color": "white", "piece": null, "row": 3 },
            { "col": 5, "color": "black", "piece": null, "row": 4 },
            { "col": 5, "color": "white", "piece": null, "row": 5 },
            { "col": 4, "color": "black", "piece": null, "row": 5 },
            { "col": 3, "color": "white", "piece": null, "row": 5 },
            { "col": 3, "color": "black", "piece": null, "row": 4 }
        ]
        expect(kingValidMoves(midGameBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })
})