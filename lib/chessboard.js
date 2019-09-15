import { rookValidMoves } from "./rook.js";
import { bishopValidMoves } from "./bishop.js";
import { queenValidMoves } from "./queen.js";
import { kingValidMoves } from "./king.js";

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

export const getPosition = (board, row, col) => {
  return board.find(position => {
    return position.row === row && position.col === col;
  });
};

export const getOppositionPositions = (board, playerColor) => {
  return board.filter(position => {
    return position.piece && position.piece.color !== undefined && position.piece.color !== playerColor
  })
}

const setPiece = (board, row, col, piece) => {
  const newBoard = cloneBoard(board);
  const position = getPosition(newBoard, row, col);
  position.piece = piece;
  return newBoard;
};

export const validateMove = (board, coordinates) => {
  const startPosition = coordinates.slice(0, 2);
  const endPosition = coordinates.slice(2, 4);
  // check that the endpositon is not a king

  if (coordinates.includes(NaN)) {
    return `Error: letters are not part of a valid move. Please use numbers!`;
  }

  if (coordinates.length > 4) {
    return `Error: ${coordinates} is not a valid move. You have too many numbers!`;
  }

  if (coordinates.length < 4) {
    return `Error: ${coordinates} is not a valid move. You have too few numbers!`;
  }

  if (
    coordinates.some(coordinate => {
      return coordinate > 7;
    })
  ) {
    return `Error: ${startPosition} -> ${endPosition} is not a valid move. You have fallen off the board!`;
  }

  const startPiece = getPosition(board, startPosition[0], startPosition[1])
    .piece;
  const endPiece = getPosition(board, endPosition[0], endPosition[1]).piece;
  if (!startPiece) {
    return `Error: ${startPosition} -> ${endPosition} is not a valid move. You have not selected a piece!`;
  }
  if (
    (startPiece.color === "black" &&
      (endPiece && endPiece.color === "black")) ||
    (startPiece.color === "white" && (endPiece && endPiece.color === "white"))
  ) {
    return `Error: ${startPosition} -> ${endPosition} is not a valid move. You don't want to try and capture one of your own pieces!`;
  } else return null;
};

export const movePiece = (board, startCoordinate, endCoordinate) => {
  const newBoard = cloneBoard(board);
  const startPosition = getPosition(
    newBoard,
    startCoordinate[0],
    startCoordinate[1]
  );
  const endPosition = getPosition(newBoard, endCoordinate[0], endCoordinate[1]);
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
  { piece: { type: "rook", color: "black" }, row: 0, col: 0 },
  { piece: { type: "knight", color: "black" }, row: 0, col: 1 },
  { piece: { type: "bishop", color: "black" }, row: 0, col: 2 },
  { piece: { type: "queen", color: "black" }, row: 0, col: 3 },
  { piece: { type: "king", color: "black" }, row: 0, col: 4 },
  { piece: { type: "bishop", color: "black" }, row: 0, col: 5 },
  { piece: { type: "knight", color: "black" }, row: 0, col: 6 },
  { piece: { type: "rook", color: "black" }, row: 0, col: 7 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 0 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 1 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 2 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 3 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 4 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 5 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 6 },
  { piece: { type: "pawn", color: "black" }, row: 1, col: 7 }
];

const whiteChessPieces = [
  { piece: { type: "pawn", color: "white" }, row: 6, col: 0 },
  { piece: { type: "pawn", color: "white" }, row: 6, col: 1 },
  { piece: { type: "pawn", color: "white" }, row: 6, col: 2 },
  { piece: { type: "pawn", color: "white" }, row: 6, col: 3 },
  { piece: { type: "pawn", color: "white" }, row: 6, col: 4 },
  { piece: { type: "pawn", color: "white" }, row: 6, col: 5 },
  { piece: { type: "pawn", color: "white" }, row: 6, col: 6 },
  { piece: { type: "pawn", color: "white" }, row: 6, col: 7 },
  { piece: { type: "rook", color: "white" }, row: 7, col: 0 },
  { piece: { type: "knight", color: "white" }, row: 7, col: 1 },
  { piece: { type: "bishop", color: "white" }, row: 7, col: 2 },
  { piece: { type: "queen", color: "white" }, row: 7, col: 3 },
  { piece: { type: "king", color: "white" }, row: 7, col: 4 },
  { piece: { type: "bishop", color: "white" }, row: 7, col: 5 },
  { piece: { type: "knight", color: "white" }, row: 7, col: 6 },
  { piece: { type: "rook", color: "white" }, row: 7, col: 7 }
];

// const moves = {
//   rook: rookValidMoves(currentBoard, currentCoordinates)
// };

export const moves = {
  rook: rookValidMoves,
  bishop: bishopValidMoves,
  queen: queenValidMoves,
  king: kingValidMoves
};

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
      tableCell.dataset.type = `${cell.piece && cell.piece.type}`;
      tableCell.dataset.pieceColor = `${cell.piece && cell.piece.color}`;
      tableCell.dataset.row = `${cell.row}`;
      tableCell.dataset.col = `${cell.col}`;
      tableCell.dataset.color = `${cell.color}`;
      if (cell.piece) {
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `/chessPieces/${cell.piece.color}-${cell.piece.type}.svg`
        );
        tableCell.appendChild(image);
      }
      tableRow.appendChild(tableCell);
    });
    table.appendChild(tableRow);
  });
  return table;
};

export const renderPotentialMovesToHtml = (board, validMoves) => {
  const table = document.createElement("table");
  const rows = splitBoardIntoRows(board).forEach(row => {
    const tableRow = document.createElement("tr");
    row.forEach(cell => {
      const tableCell = document.createElement("td");
      tableCell.className = cell.color;
      tableCell.dataset.type = `${cell.piece && cell.piece.type}`;
      tableCell.dataset.pieceColor = `${cell.piece && cell.piece.color}`;
      tableCell.dataset.row = `${cell.row}`;
      tableCell.dataset.col = `${cell.col}`;
      tableCell.dataset.color = `${cell.color}`;
      validMoves.forEach(move => {
        if (cell.col === move.col && cell.row === move.row) {
          tableCell.className += "-valid-move";
        }
      });
      if (cell.piece) {
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `/chessPieces/${cell.piece.color}-${cell.piece.type}.svg`
        );
        tableCell.appendChild(image);
      }
      tableRow.appendChild(tableCell);
    });
    table.appendChild(tableRow);
  });
  return table;
};