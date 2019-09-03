import { getPosition } from "./chessboard";

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

    const allPotentialDiagonals = [
        topLeft,
        topMiddle,
        topRight,
        rightMiddle,
        bottomRight,
        bottomMiddle,
        bottomLeft,
        leftMiddle
    ].filter(element => Boolean(element));

    for (const element of allPotentialDiagonals) {
        if (element.piece === null) {
            validMoves.push(element);
        }
        if (element.piece !== null && element.piece.color !== playerColor) {
            validMoves.push(element);
            // stop loop once you find more that one of the opponent pieces in the king path
            // can a king take a king? or all pieces?
            break;
        }
        if (element.piece !== null && element.piece.color === playerColor) {
            // stop loop once you find one of your own pieces ni the king path
            break;
        }
    }

    return validMoves;
}