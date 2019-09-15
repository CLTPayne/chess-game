import { getPosition } from "./chessboard";

export const knightValidMoves = (currentBoard, currentPosition) => {
    let { row, col } = currentPosition;
    const playerColor = getPosition(currentBoard, row, col).piece.color;
    const validMoves = [];

    const allPotentialMoves = [
        currentBoard.find(element => element.row === row - 2 && element.col === col - 1),
        currentBoard.find(element => element.row === row - 1 && element.col === col - 2),
        currentBoard.find(element => element.row === row - 2 && element.col === col + 1),
        currentBoard.find(element => element.row === row - 1 && element.col === col + 2),
        currentBoard.find(element => element.row === row + 1 && element.col === col + 2),
        currentBoard.find(element => element.row === row + 2 && element.col === col + 1),
        currentBoard.find(element => element.row === row + 2 && element.col === col - 1),
        currentBoard.find(element => element.row === row + 1 && element.col === col - 2),
    ].filter(element => Boolean(element));

    allPotentialMoves.forEach(element => {
        if (element.piece === null) {
            validMoves.push(element);
        }
        if (element.piece !== null && element.piece.color !== playerColor) {
            validMoves.push(element);
        }
    });

    return validMoves;
}