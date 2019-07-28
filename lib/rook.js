import { getPosition } from './chessboard.js'

// export const oldRookValidMoves = (currentBoard, currentPosition) => {
//     const { row, col } = currentPosition;
//     const playerColor = _getPosition(currentBoard, row, col).color;
//     const availableMoves = currentBoard.map(element => {
//         if (element.piece !== null && element.piece.color === playerColor) {
//             return null
//         }
//         if (element.row === row && element.piece === null) {
//             return { row: element.row, col: element.col }
//         }
//         if (element.col === col && element.piece === null) {
//             return { row: element.row, col: element.col }
//         }
//     })
//     return availableMoves.filter(element => !!element);
// }

export const rookValidMoves = (currentBoard, currentPosition) => {
    const { row, col } = currentPosition;
    const playerColor = getPosition(currentBoard, row, col).piece.color;
    const allPotentialSquares = currentBoard.map(element => {
        if (element.row === row || element.col === col) {
            return element
        }
    }).filter(element => Boolean(element))
    const squaresAbove = allPotentialSquares.filter(element => {
        if (element.row < row) {
            return element;
        }
    })
    const squaresLeft = allPotentialSquares.filter(element => {
        if (element.row === row && element.col < col) {
            return element
        }
    })
    const squaresRight = allPotentialSquares.filter(element => {
        if (element.row === row && element.col > col) {
            return element
        }
    })
    const squaresBelow = allPotentialSquares.filter(element => {
        if (element.row > row) {
            return element
        }
    })
    // removed the square the current piece is occupying 
    // order all arrays from current piece outwards 
    const restructuredAvailableSquares = [squaresAbove.reverse(), squaresBelow, squaresLeft.reverse(), squaresRight]
    const validMoves = [];
    restructuredAvailableSquares.forEach(subArray => {
        for (const element of subArray) {
            if (element.piece === null) {
                validMoves.push(element)
            }
            if (element.piece !== null && element.piece.color !== playerColor) {
                validMoves.push(element)
                // stop loop once you find more that one of the opponent pieces in the rook path
                break
            }
            if ((element.piece !== null) && (element.piece.color === playerColor)) {
                // stop loop once you find one of your own pieces ni the rook path
                break
            }
        }
    })
    return validMoves;
}