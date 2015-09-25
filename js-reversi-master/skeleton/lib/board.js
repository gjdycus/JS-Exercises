var Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  var arr = [];
  for (var i=0; i<8; i++) {
    arr.push([]);
    for (var j = 0; j<8; j++) {
      arr[i].push(undefined);
    }
  }
  arr[3][4] = new Piece('black');
  arr[4][3] = new Piece('black');
  arr[3][3] = new Piece('white');
  arr[4][4] = new Piece('white');
  return arr;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
      alert("Your an idiot");
  } else {
    return this.grid[pos[0]][pos[1]];
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves.length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  return this.grid[pos[0]][pos[1]] === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.grid[pos[0]][pos[1]];
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !(this.hasMove("black")) && !(this.hasMove("white"));
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  return pos[0] < 8 && pos[0] >= 0 && pos[1] < 8 && pos[1] >= 0;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  var newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  if (!board.isMine(newPos, color)) {
    if (!board.isValidPos(newPos) || !board.isOccupied(newPos)) {
      return null;
    }
    piecesToFlip.push(newPos);
    return _positionsToFlip(board, newPos, color, dir, piecesToFlip);
  } else {
    if (piecesToFlip.length < 1) {
      return null;
    } else {
      return piecesToFlip;
    }
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (this.isOccupied(pos)) {
    alert("NOoooOOOOOOO, occupied fool");
  }
  this.grid = new Piece(color);
  var allPiecesToFlip = [];
  Board.DIRS.forEach (function(dir) {
    var p = _positionsToFlip(this, pos, color, dir, []);
    if (p) {
      allPiecesToFlip.push(p);
    }
  });

  allPiecesToFlip.forEach(function(piece){
    piece.flip;
  });
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {

  for(var i=0;i<8;i++){
    var row = '';
    for(var j=0;j<8;j++){
      if (this.grid[i][j]) {
        row = row + (this.grid[i][j].toString());
      } else {
        row += '_';
      }
      }
      console.log(row);
    }
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }
  var allPiecesToFlip = [];
  Board.DIRS.forEach (function(dir) {
    var p = _positionsToFlip(this, pos, color, dir, []);
    if (p) {
      allPiecesToFlip.push(p);
    }
  });

  if (allPiecesToFlip.length === 0) {
    return false;
  }
  return true;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  var valid = [];
  for(var i=0;i<8;i++){
    for(var j=0;j<8;j++){
      if (this.validMove([i,j], color)) {
        valid.push([i,j]);
      }
    }
  }
  return valid;
};

module.exports = Board;
var b = new Board();
console.log(b.print());
// console.log(b.validMoves('black'));
