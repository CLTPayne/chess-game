import { getPosition } from "./chessboard.js";

export const queenValidMoves = (currentBoard, currentPosition) => {

    // generic vars
    let { row, col } = currentPosition;
    const playerColor = getPosition(currentBoard, row, col).piece.color;
    const validMoves = [];

    // diagonal moves from bishop:
    const topLeftPotentialSquares = [];
    const topRightPotentialSquares = [];
    const bottomLeftPotentialSquares = [];
    const bottomRightPotentialSquares = [];
    for (let i = 1; i <= 7; i++) {
        const topLeft = currentBoard.find(element => element.row === row - i && element.col === col - i)
        topLeftPotentialSquares.push(topLeft)
        const topRight = currentBoard.find(element => element.row === row - i && element.col === col + i)
        topRightPotentialSquares.push(topRight)
        const bottomLeft = currentBoard.find(element => element.row === row + i && element.col === col - i)
        bottomLeftPotentialSquares.push(bottomLeft)
        const bottomRight = currentBoard.find(element => element.row === row + i && element.col === col + i)
        bottomRightPotentialSquares.push(bottomRight)
    }

    // vertical and horizontal moves from rook 
    const allPotentialSquares = currentBoard
        .map(element => {
            if (element.row === row || element.col === col) {
                return element;
            }
        })
        .filter(element => Boolean(element));
    const squaresAbove = allPotentialSquares.filter(element => {
        if (element.row < row) {
            return element;
        }
    });
    const squaresLeft = allPotentialSquares.filter(element => {
        if (element.row === row && element.col < col) {
            return element;
        }
    });
    const squaresRight = allPotentialSquares.filter(element => {
        if (element.row === row && element.col > col) {
            return element;
        }
    });
    const squaresBelow = allPotentialSquares.filter(element => {
        if (element.row > row) {
            return element;
        }
    });
    // removed the square the current piece is occupying
    // order all arrays from current piece outwards

    //  
    // OR Do this in one step for both diagonal and non diagonal so can maintain the clockwise logic?
    //
    const allPotentialDiagonals = [
        topLeftPotentialSquares,
        topRightPotentialSquares,
        bottomRightPotentialSquares,
        bottomLeftPotentialSquares
    ]

    const allPotentialNonDiagonals = [
        squaresAbove.reverse(),
        squaresBelow,
        squaresLeft.reverse(),
        squaresRight
    ];

    // generic formation of single array with all possible moves
    [...allPotentialNonDiagonals, ...allPotentialDiagonals].forEach(subArray => {
        const filtered = subArray.filter(element => Boolean(element));
        for (const element of filtered) {
            if (element.piece === null) {
                validMoves.push(element);
            }
            if (element.piece !== null && element.piece.color !== playerColor) {
                validMoves.push(element);
                // stop loop once you find more that one of the opponent pieces in the queen path
                // can a queen take a king? or all pieces?
                break;
            }
            if (element.piece !== null && element.piece.color === playerColor) {
                // stop loop once you find one of your own pieces ni the queen path
                break;
            }
        }
    });

    return validMoves;
}