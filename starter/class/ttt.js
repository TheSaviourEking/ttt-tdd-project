const Screen = require("./screen");
const Cursor = require("./cursor");

const { isEmptyGrid, isHorizontalWin, isVerticalWin, isDiagonalWin, isTie, isFullBoard } = require('../../_helper');
const ComputerPlayer = require("./computer-player");

class TTT {

  constructor() {

    this.playerTurn = "O";
    ComputerPlayer.symbol = 'X';

    this.grid = [[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', TTT.testCommand);
    Screen.addCommand('left', 'move left', this.cursor.left);
    Screen.addCommand('right', 'move right', this.cursor.right);
    Screen.addCommand('up', 'move up', this.cursor.up);
    Screen.addCommand('down', 'move down', this.cursor.down);
    Screen.addCommand('space', "Place Value", TTT.changeTurn.bind(this));


    // Screen.addCommand()
    Screen.printCommands();
  }

  // Remove this
  // static testCommand() {
  //   console.log("TEST COMMAND");
  // }

  static changeTurn() {
    if (Screen.grid[this.cursor.row][this.cursor.col] === ' ' || Screen.grid[this.cursor.row][this.cursor.col] === '') {
      Screen.render();
      Screen.setTextColor(this.cursor.row, this.cursor.col, 'white');
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

      // this.playerTurn == "O" ? this.playerTurn = "X" : this.playerTurn = "O";

      const winner = TTT.checkWin(Screen.grid);

      // !winner ? Screen.render() : TTT.endGame(winner);

      if (winner) {
        TTT.endGame(winner);
      } else {
        this.placeCpuMove();
      }
    }
  }

  cpuMove = () => {
    let move = ComputerPlayer.getSmartMove(Screen.grid, ComputerPlayer.symbol);

    return move;
  }

  placeCpuMove = () => {
    const move = this.cpuMove();

    Screen.setTextColor(move.row, move.col, 'white');
    Screen.setGrid(move.row, move.col, ComputerPlayer.symbol);
    Screen.render();
    if (TTT.checkWin(Screen.grid)) {
      TTT.endGame(TTT.checkWin(Screen.grid));
    }
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    // console.log(this);

    if (isFullBoard(grid)) {
      return isTie(grid);
    } else if (isEmptyGrid(grid)) {
      return false;
    }
    else {
      return isHorizontalWin(grid) || isVerticalWin(grid) || isDiagonalWin(grid);
    }
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
