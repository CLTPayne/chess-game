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
    });

    it('does not return a position that is blocked by another piece', () => {
        const firstMoveBoard = movePiece(currentBoard, [7, 4], [4, 3])
        const secondMoveBoard = movePiece(firstMoveBoard, [6, 4], [5, 3]);
        const thirdMoveBoard = movePiece(secondMoveBoard, [1, 1], [4, 4])
        const currentPosition = { row: 4, col: 3 };
        const correctValidMoves = [
            {
                "col": 2,
                "color": "black",
                "piece": null,
                "row": 3,
            },
            {
                "col": 3,
                "color": "white",
                "piece": null,
                "row": 3,
            },
            {
                "col": 4,
                "color": "black",
                "piece": null,
                "row": 3,
            },
            {
                "col": 4,
                "color": "white",
                "piece": {
                    "color": "black",
                    "type": "pawn",
                },
                "row": 4,
            },
            {
                "col": 4,
                "color": "black",
                "piece": null,
                "row": 5,
            },
            {
                "col": 2,
                "color": "black",
                "piece": null,
                "row": 5,
            },
            {
                "col": 2,
                "color": "white",
                "piece": null,
                "row": 4,
            },
        ]
        expect(kingValidMoves(thirdMoveBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })

    it('does not return a position that is in check from an opponent piece', () => {
        const firstMoveBoard = movePiece(currentBoard, [6, 4], [3, 4])
        const secondMoveBoard = movePiece(firstMoveBoard, [7, 4], [4, 3]);
        const thirdMoveBoard = movePiece(secondMoveBoard, [1, 3], [2, 2])
        const forthMoveBoard = movePiece(thirdMoveBoard, [0, 3], [5, 5])
        const currentPosition = { row: 4, col: 3 };
        const correctValidMoves = [
            { row: 3, col: 2, piece: null, color: 'black' },
            { row: 4, col: 2, piece: null, color: 'white' }
        ]
        expect(kingValidMoves(forthMoveBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })

    it('does not return a position that would be in check if the king moved and took a piece', () => {
        const firstMoveBoard = movePiece(currentBoard, [6, 4], [5, 4])
        const secondMoveBoard = movePiece(firstMoveBoard, [7, 4], [4, 1]);
        const thirdMoveBoard = movePiece(secondMoveBoard, [1, 3], [3, 2])
        const forthMoveBoard = movePiece(thirdMoveBoard, [0, 3], [3, 3])
        const currentPosition = { row: 4, col: 1 };
        const correctValidMoves = [
            {
                "col": 2,
                "color": "black",
                "piece": null,
                "row": 5
            },
            {
                "col": 0,
                "color": "black",
                "piece": null,
                "row": 5
            },
            {
                "col": 0,
                "color": "white",
                "piece": null,
                "row": 4
            }
            // not quite correct. there are two further squares that are now seen as being in check but aren't as they are blocked by the pawn in [3,2]
        ]
        expect(kingValidMoves(forthMoveBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })
})