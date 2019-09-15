import { getPosition, getOppositionPositions, moves } from "./chessboard.js";

export const kingValidMoves = (currentBoard, currentPosition) => {
    let { row, col } = currentPosition;
    const playerColor = getPosition(currentBoard, row, col).piece.color;
    const validMoves = [];

    const topLeft = currentBoard.find(element => element.row === row - 1 && element.col === col - 1)
    const topMiddle = currentBoard.find(element => element.row === row - 1 && element.col === col)
    const topRight = currentBoard.find(element => element.row === row - 1 && element.col === col + 1)
    const rightMiddle = currentBoard.find(element => element.row === row && element.col === col + 1)
    const bottomRight = currentBoard.find(element => element.row === row + 1 && element.col === col + 1)
    const bottomMiddle = currentBoard.find(element => element.row === row + 1 && element.col === col)
    const bottomLeft = currentBoard.find(element => element.row === row + 1 && element.col === col - 1)
    const leftMiddle = currentBoard.find(element => element.row === row && element.col === col - 1)

    const allPotentialMoves = [
        topLeft,
        topMiddle,
        topRight,
        rightMiddle,
        bottomRight,
        bottomMiddle,
        bottomLeft,
        leftMiddle
    ].filter(element => Boolean(element));

    for (const element of allPotentialMoves) {
        if (element.piece === null) {
            validMoves.push(element);
        }
        if (element.piece !== null && element.piece.color !== playerColor) {
            validMoves.push(element);
        }
    }

    // opponent valid moves prior to the king taking a piece
    // don't pass in the true current board. 
    // pass in a current board with any of the squares around the king having their piece set to null. 

    const isValidMoveOccupiedSquare = (position, validMoves) => {
        return validMoves.some(move => move.row === position.row && move.col === position.col && position.piece && position.piece.type)
    }

    // perhaps need a new functions to check for valid moves? 
    // are the current moves.functions extendable for this purpose
    const checkBoard = currentBoard.reduce((accumulator, currentValue) => {
        if (isValidMoveOccupiedSquare(currentValue, validMoves)) {
            const newValue = {
                row: currentValue.row,
                col: currentValue.col,
                piece: null,
                color: currentValue.color
            }
            return accumulator.concat(newValue)
        } else {
            return accumulator.concat(currentValue)
        }
    }, [])

    const opponentValidMoves = getOppositionPositions(checkBoard, playerColor)
        .map(element => element.piece.type !== 'king' && moves[element.piece.type] && moves[element.piece.type](checkBoard, element))
        .filter(element => element)
        .reduce((acc, value) => acc.concat(value), [])

    const movesInCheck = []
    for (const element of validMoves) {
        for (const move of opponentValidMoves) {
            if (element.col === move.col && element.row === move.row) {
                movesInCheck.push(element)
            }
        }
    }

    // specifically check if an occupied valid square is in the array of opponentValidMoves if piece taken. 
    // calcualte the opponentValidMoves AND opponentValidMoves if a piece is taken by king
    // then add it to the moves in check 
    // compare the length of the two arrays
    // if one is longer than the other then need to do the additional computation to compare and remove further square as being in check but not other wise

    const isMoveInCheck = (position, movesInCheck) => {
        return movesInCheck.some(move => move.row === position.row && move.col === position.col)
    }

    const notInCheckValidMoves = validMoves.reduce((accumulator, item) => {
        if (!isMoveInCheck(item, movesInCheck)) {
            return accumulator.concat(item)
        }
        return accumulator
    }, [])

    return notInCheckValidMoves

}