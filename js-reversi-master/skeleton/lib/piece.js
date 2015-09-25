/**
 * Initializes the Piece with its color.
 */
function Piece (color) {
  this.color = color;
}

/**
 * Returns the color opposite the current piece.
 */
Piece.prototype.oppColor = function () {
  if (this.color === "black") {
    return 'white';
  } else if (this.color === "white") {
    return 'black';
  } else {
    return null;
  }
};

/**
 * Changes the piece's color to the opposite color.
 */
Piece.prototype.flip = function () {
  this.color = this.oppColor();
};

/**
 * Returns a string representation of the piece
 * based on its color.
 */
Piece.prototype.toString = function () {
  if (this.color) {
    return (this.color === "black") ? "B" : "W";
  }else {
    return '_';
  }
};

module.exports = Piece;
