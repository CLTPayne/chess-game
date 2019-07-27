export const rookValidMoves = (currentBoard, currentPosition) => {
    const { row, col } = currentPosition;
    const availableMoves = currentBoard.map(element => {
        if (element.piece !== null) {
            return null
        }
        if (element.row === row && element.piece === null) {
            return { row: element.row, col: element.col }
        }
        if (element.col === col && element.piece === null) {
            return { row: element.row, col: element.col }
        }
    })
    return availableMoves.filter(element => !!element);
}