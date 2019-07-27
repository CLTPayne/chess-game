import { rookValidMoves } from './rook';
import { generateChessBoard, movePiece } from './chessboard.js'

describe('#rookValidMoves', () => {
    const currentBoard = generateChessBoard();

    it('identifies valid vertical moves for a1 black rook', () => {
        const currentPosition = { row: 0, col: 0 };
        const correctValidMoves = [{ col: 0, row: 2 }, { col: 0, row: 3 }, { col: 0, row: 4 }, { col: 0, row: 5 }]
        expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })

    it('identifies valid vertical moves for h1 black rook', () => {
        const currentPosition = { row: 0, col: 7 };
        const correctValidMoves = [{ row: 2, col: 7 },
        { row: 3, col: 7 },
        { row: 4, col: 7 },
        { row: 5, col: 7 }]
        expect(rookValidMoves(currentBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })

    it('identifies valid horizontal and vertical moves for a rook in play', () => {
        const midGameBoard = movePiece(currentBoard, [0, 0], [3, 4])
        const currentPosition = { row: 4, col: 3 };
        const correctValidMoves = [{ row: 2, col: 3 },
        { row: 3, col: 3 },
        { row: 4, col: 0 },
        { row: 4, col: 1 },
        { row: 4, col: 2 },
        { row: 4, col: 4 },
        { row: 4, col: 5 },
        { row: 4, col: 6 },
        { row: 4, col: 7 },
        { row: 5, col: 3 }]
        expect(rookValidMoves(midGameBoard, currentPosition)).toStrictEqual(correctValidMoves)
    })

    it('does not return position it already occupies as a valid move', () => {
        const midGameBoard = movePiece(currentBoard, [0, 0], [3, 4])
        const currentPosition = { row: 4, col: 3 };
        expect(rookValidMoves(midGameBoard, currentPosition).length).toEqual(10)
    })
})

// The rook moves horizontally or vertically, through any number of unoccupied squares (see diagram). 
// As with captures by other pieces, the rook captures by occupying the square on which the enemy piece sits. 
// The rook also participates, with the king, in a special move called castling.

// const startPosition = { row: 6, col: 4 };
// const piece = { row: 4, col: 4 }

// for (const endPosition of board) {

//   // If the end row and end column are not equal to the start row/col, it's not valid
//   if (endPosition.row !== startPosition.row && endPosition.col !== startPosition.col) {
//     continue;
//   }

//   // If there's a piece between the start and end, then it's not valid

//   // If there's a piece in the destination that's the same color as the rook, it's not valid

// }
