import { rookValidMoves } from './rook';
import { generateChessBoard, movePiece } from './chessboard.js'

// The rook moves horizontally or vertically, through any number of unoccupied squares (see diagram). 
// As with captures by other pieces, the rook captures by occupying the square on which the enemy piece sits. 
// The rook also participates, with the king, in a special move called castling.

describe('#rookValidMoves', () => {

    const currentBoard = generateChessBoard();

    it('identifies valid vertical moves for an a8 rook at start of a game', () => {
        const currentPosition = { row: 0, col: 0 };
        expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([])
    })

    it('identifies valid vertical moves for an h8 black rook at start of a game', () => {
        const currentPosition = { row: 0, col: 7 };
        expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([])
    })

    it('identifies valid vertical moves for an a1 rook at start of a game', () => {
        const currentPosition = { row: 7, col: 0 };
        expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([])
    })

    it('identifies valid vertical moves for an h1 rook at start of a game', () => {
        const currentPosition = { row: 7, col: 7 };
        expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual([])
    })

    it('identifies valid horizontal and vertical moves for a rook in play', () => {
        const midGameBoard = movePiece(currentBoard, [0, 0], [3, 4])
        const currentPosition = { row: 4, col: 3 };
        const correctValidMoves = [
            { row: 3, col: 3, piece: null, color: 'white' },
            { row: 2, col: 3, piece: null, color: 'black' },
            { row: 5, col: 3, piece: null, color: 'white' },
            {
                row: 6,
                col: 3,
                piece: { type: 'pawn', color: 'white' },
                color: 'black'
            },
            { row: 4, col: 2, piece: null, color: 'white' },
            { row: 4, col: 1, piece: null, color: 'black' },
            { row: 4, col: 0, piece: null, color: 'white' },
            { row: 4, col: 4, piece: null, color: 'white' },
            { row: 4, col: 5, piece: null, color: 'black' },
            { row: 4, col: 6, piece: null, color: 'white' },
            { row: 4, col: 7, piece: null, color: 'black' }
        ]
        expect(rookValidMoves(midGameBoard, currentPosition)).toStrictEqual(correctValidMoves)
        expect(rookValidMoves(midGameBoard, currentPosition).length).toEqual(11)
    })

    // it('does not return a position occupied by the same team as a valid move', () => { })

    // it('does not return a position that is blocked by an occupied square', () => { })
})
