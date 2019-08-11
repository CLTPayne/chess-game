import { bishopValidMoves } from "./bishop.js";
import { generateChessBoard, movePiece } from "./chessboard.js";

// The bishop has no restrictions in distance for each move, but is limited to diagonal movement.
// Bishops, like all other pieces except the knight, cannot jump over other pieces.
// A bishop captures by occupying the square on which an enemy piece sits.
// The bishops may be differentiated according to which wing they begin on, 
// i.e.the king's bishop and queen's bishop. As a consequence of its diagonal movement, 
// each bishop always remains on either the white or black squares, 
// and so it is also common to refer to them as light - squared or dark - squared bishops.

describe('#bishopValidMoves', () => {
    let currentBoard;

    beforeEach(() => {
        currentBoard = generateChessBoard();
    });

    afterEach(() => {
        currentBoard = [];
    });

    it('identifies valid diagonal moves for a bishop in starting postion c8', () => {
        const currentPosition = { row: 0, col: 2 };
        expect(bishopValidMoves(currentBoard, currentPosition)).toStrictEqual([]);
    })

    it('identifies valid diagonal moves for a bishop in mid game position', () => {
        const midGameBoard = movePiece(currentBoard, [0, 2], [4, 3]);
        const currentPosition = { row: 4, col: 3 };
        const correctValidMoves = [
            { row: 3, col: 2, piece: null, color: 'black' },
            { row: 2, col: 1, piece: null, color: 'black' },
            { row: 3, col: 4, piece: null, color: 'black' },
            { row: 2, col: 5, piece: null, color: 'black' },
            { row: 5, col: 4, piece: null, color: 'black' },
            {
                row: 6,
                col: 5,
                piece: { type: 'pawn', color: 'white' },
                color: 'black'
            },
            { row: 5, col: 2, piece: null, color: 'black' },
            {
                row: 6,
                col: 1,
                piece: { type: 'pawn', color: 'white' },
                color: 'black'
            }
        ];
        expect(bishopValidMoves(midGameBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })

    it('only moves to squares the same colour when the starting square is white', () => {

    })

    it('only moves to squares the same colour when the starting square is black', () => {

    })

    it("does not return a position occupied by the a piece belonging to the same player as a valid move", () => {
    })

    it('does not return a position that is blocked by an occupied square', () => { })
})
