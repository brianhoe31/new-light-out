import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 3, //nrows: number of rows of board
    ncols: 3 //ncols: number of cols of board
  }
  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() } //hasWon: boolean, true when board is all off
    this.flipCellsAroundMe = this.flipCellsAroundMe.bind(this); //board: array-of-arrays of true/false
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    let rand = () => {
      return Math.floor(Math.random() * 2);
    }

    for (var i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (var j = 0; j < this.props.ncols; j++) {
        if (rand() === 1) {
          row.push(true);
        } else {
          row.push(false);
        }
      }
      board.push(row);
    }
    return board;
  }

  generateBoard() {
    return this.state.board.map((row, idx) => (
      <tr key={idx}>
        {row.map((cell, id) => (
          <Cell key={`${idx}-${id}`} value={`${idx}-${id}`} isLit={cell} flipCellsAroundMe={this.flipCellsAroundMe} />
        ))}
      </tr>
    ))
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAroundMe(coord) {
    console.log(coord);
    let { ncols, nrows } = this.props;
    let board = this.state.board;

    let [y, x] = coord.split("-").map(Number);

    console.log([y, x]);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it & tiles adjacent to it.
      if (x >= 0 && x < ncols - 1 && y > 0 && y < nrows - 1) {
        board[y][x] = !board[y][x]; //center
        board[y - 1][x] = !board[y - 1][x]; //top
        board[y + 1][x] = !board[y + 1][x]; //bottom
        board[y][x - 1] = !board[y][x - 1]; //left
        board[y][x + 1] = !board[y][x + 1]; //right
      } else if (y === 0 && x < ncols - 1) { //edge case top - first row
        board[y][x] = !board[y][x]; //center
        board[y + 1][x] = !board[y + 1][x]; //bottom
        board[y][x - 1] = !board[y][x - 1]; //left
        board[y][x + 1] = !board[y][x + 1]; //right
      } else if (x === ncols - 1 && (y !== 0 && y !== nrows - 1)) { //edge case right side
        board[y][x] = !board[y][x]; //center
        board[y - 1][x] = !board[y - 1][x]; //top
        board[y + 1][x] = !board[y + 1][x]; //bottom
        board[y][x - 1] = !board[y][x - 1]; //left
      } else if (y === nrows - 1 && (x !== 0 && x !== ncols - 1)) { //edge case bottom row 
        board[y][x] = !board[y][x]; //center
        board[y - 1][x] = !board[y - 1][x]; //top
        board[y][x - 1] = !board[y][x - 1]; //left
        board[y][x + 1] = !board[y][x + 1]; //right
      } else if ( y === nrows - 1 && x === 0){
        board[y][x] = !board[y][x]; //center
        board[y - 1][x] = !board[y - 1][x]; //top
        board[y][x + 1] = !board[y][x + 1]; //right
      } else if ( y === nrows - 1 && x === ncols - 1){
        board[y][x] = !board[y][x]; //center
        board[y - 1][x] = !board[y - 1][x]; //top
        board[y][x - 1] = !board[y][x - 1]; //left
      } else if ( y === 0 && x === ncols - 1){
        board[y][x] = !board[y][x]; //center
        board[y + 1][x] = !board[y + 1][x]; //bottom
        board[y][x - 1] = !board[y][x - 1]; //left
      }
    }

    flipCell(y, x);

    let count = 0;
    board.forEach(e => e.forEach(f => f===true? count++ : count--));
    
    let hasWon;
    if(count === 9){
      hasWon = true;
    } else {
      hasWon = false;
    }

    this.setState(st => ({ 
      hasWon: hasWon, 
      board: board 
    }));
  }

  /** Render game board or winning message. */
  render() {
    return (
      <table>
        <tbody>
            {this.state.hasWon ? "You Win!" : this.generateBoard()}
        </tbody>
      </table>
    )
  }
}

export default Board;
