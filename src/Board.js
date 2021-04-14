import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5, //nrows: number of rows of board
    ncols: 5 //ncols: number of cols of board
  }
  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() }
    //hasWon: boolean, true when board is all off
    //board: array-of-arrays of true/false
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
      <tr>
        {row.map((cell, id) => (
          <td><Cell key={`${idx}-${id}`} isLit={cell} flipCellsAroundMe={this.flipCellsAround}/></td>
        ))}
      </tr>
    ))
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let hasWon = this.state.hasWon;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */
  render() {
    return (
      <table>
        <tbody>
          <tr>
            {this.state.hasWon ? "You Win!" : this.generateBoard()}
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Board;
