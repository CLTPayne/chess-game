const convertToNumber = size => parseInt(size, 10);

const generateBoard = (oddRow, evenRow, size) => {
  const board = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const position = { row, col, piece: null };
      if (col % 2 === row % 2) {
        position.color = evenRow;
      } else {
        position.color = oddRow;
      }
      board.push(position);
    }
  }
  return board;
};

export const renderBoardToEmoji = board => {
  let currentRow = 0;
  const fullBoard = board.reduce((result, position) => {
    if (position.row !== currentRow) {
      result += "\n";
    }
    if (!position.piece) {
      result += position.color;
    } else {
      result += position.piece;
    }
    currentRow = position.row;
    return result;
  }, "");
  return fullBoard;
};

export const _getPosition = (board, row, col) => {
  return board.find(position => {
    return position.row === row && position.col === col;
  });
};

const setPiece = (board, row, col, piece) => {
  const newBoard = cloneBoard(board);
  const position = _getPosition(newBoard, row, col);
  position.piece = piece;
  return newBoard;
};

export const validateMove = (board, coordinates) => {
  const startPosition = coordinates.slice(0, 2);
  const endPosition = coordinates.slice(2, 4);

  if (coordinates.includes(NaN)) {
    return (`Error: letters are not part of a valid move. Please use numbers!`);
  }

  if (coordinates.length !== 4) {
    return (`Error: ${coordinates} is not a valid move. You have too many numbers!`);
  }

  if (
      coordinates.some(coordinate => {
        return coordinate > 7;
      })
    ) {
      return (`Error: ${startPosition} -> ${endPosition} is not a valid move. You have fallen off the board!`);
  }

  const startPiece = _getPosition(board, startPosition[0], startPosition[1]).piece
  const endPiece = _getPosition(board, endPosition[0], endPosition[1]).piece
  if (!startPiece) {
    return (`Error: ${startPosition} -> ${endPosition} is not a valid move. You have not selected a piece!`);
  }

  if (startPiece.includes('black') && endPiece.includes('black') 
    || startPiece.includes('white') && endPiece.includes('white')) {
    return (`Error: ${startPosition} -> ${endPosition} is not a valid move. You don't want to try and capture one of your own pieces!`)
  }

  else return null
}

export const movePiece = (board, startCoordinate, endCoordinate) => {
  const newBoard = cloneBoard(board);
  const startPosition = _getPosition(
    newBoard,
    startCoordinate[1],
    startCoordinate[0]
  );
  const endPosition = _getPosition(
    newBoard,
    endCoordinate[1],
    endCoordinate[0]
  );
  endPosition.piece = startPosition.piece;
  startPosition.piece = null;
  return newBoard;
};

const cloneBoard = board => {
  return board.map(position => Object.assign({}, position));
};

const isChessBoard = board => {
  return board.length === 64 ? true : false;
};

const blackChessPieces = [
  { piece: "black-rook", row: 0, col: 0 },
  { piece: "black-knight", row: 0, col: 1 },
  { piece: "black-bishop", row: 0, col: 2 },
  { piece: "black-queen", row: 0, col: 3 },
  { piece: "black-king", row: 0, col: 4 },
  { piece: "black-bishop", row: 0, col: 5 },
  { piece: "black-knight", row: 0, col: 6 },
  { piece: "black-rook", row: 0, col: 7 },
  { piece: "black-pawn", row: 1, col: 0 },
  { piece: "black-pawn", row: 1, col: 1 },
  { piece: "black-pawn", row: 1, col: 2 },
  { piece: "black-pawn", row: 1, col: 3 },
  { piece: "black-pawn", row: 1, col: 4 },
  { piece: "black-pawn", row: 1, col: 5 },
  { piece: "black-pawn", row: 1, col: 6 },
  { piece: "black-pawn", row: 1, col: 7 }
];

const whiteChessPieces = [
  { piece: "white-pawn", row: 6, col: 0 },
  { piece: "white-pawn", row: 6, col: 1 },
  { piece: "white-pawn", row: 6, col: 2 },
  { piece: "white-pawn", row: 6, col: 3 },
  { piece: "white-pawn", row: 6, col: 4 },
  { piece: "white-pawn", row: 6, col: 5 },
  { piece: "white-pawn", row: 6, col: 6 },
  { piece: "white-pawn", row: 6, col: 7 },
  { piece: "white-rook", row: 7, col: 0 },
  { piece: "white-knight", row: 7, col: 1 },
  { piece: "white-bishop", row: 7, col: 2 },
  { piece: "white-queen", row: 7, col: 3 },
  { piece: "white-king", row: 7, col: 4 },
  { piece: "white-bishop", row: 7, col: 5 },
  { piece: "white-knight", row: 7, col: 6 },
  { piece: "white-rook", row: 7, col: 7 }
];

const setupChessBoard = (board, blackChessPieces, whiteChessPieces) => {
  if (!isChessBoard(board)) {
    throw new Error("This is not a chess board");
  }
  let newBoard = cloneBoard(board);
  blackChessPieces.map(piece => {
    newBoard = setPiece(newBoard, piece.row, piece.col, piece.piece);
  });
  whiteChessPieces.map(piece => {
    newBoard = setPiece(newBoard, piece.row, piece.col, piece.piece);
  });
  return newBoard;
};

export const generateChessBoard = () => {
  const currentBoard = generateBoard("black", "white", 8);
  return setupChessBoard(currentBoard, blackChessPieces, whiteChessPieces);
};

const splitBoardIntoRows = board => {
  return board.reduce((result, position) => {
    if (!result[position.row]) {
      result[position.row] = [];
    }
    result[position.row].push(position);
    return result;
  }, []);
};

export const renderToHtml = board => {
  const table = document.createElement("table");
  const rows = splitBoardIntoRows(board).forEach(row => {
    const tableRow = document.createElement("tr");
    row.forEach(cell => {
      const tableCell = document.createElement("td");
      tableCell.className = cell.color;
      if (cell.piece) {
        const image = document.createElement("img");
        image.setAttribute("src", `/chessPieces/${cell.piece}.svg`);
        tableCell.appendChild(image);
      }
      tableRow.appendChild(tableCell);
    });
    table.appendChild(tableRow);
  });
  return table;
};

// Next Steps:
// DONE - Create basic logic for valid move. (not full legal chess moves per pieces, just moving a piece (instead of empty square))

// DONE - Refactor error to a validate move function in the js module
// valid moves per piece
// Chess move notation - coordinates instead of just row / col numbers. This abstracts away the rows and cols / zero indexing
// UI - transfer the move from the console to a text input and submit (form elements), under the presumption that it's a pass and play game
// Interim interactive version in pure js
// React version for presentation and interaction
// Know which player is which

// OOP version -
