{/*
Requirement -> Entities -> Class Design -> Implementation -> Extensibility
Topic: TicTacToe Game 

//? Requirement :
Timed game - Each player should have a limited amount of time to make their move.(like chess clock)

Undo functionality - Players should be able to undo their last move.

Spectator mode - Allow users to watch ongoing games without participating.

Statistics tracking - Keep track of wins, losses, and draws for each player.

Tournament mode - Allow multiple players to compete in a tournament format.

Ai opponent - Implement an AI opponent that players can choose to play against.

Elo rating system should be implemented to track player performance over time.

//? Core Entity: 
 1.Board
 2d square : string[][],
 winner - 1st player, 2nd player, draw, undefined
 getBoard(), getWinner(),getCuurrentPlayer(), makeMove(), undoMove(), resetBoard()

 2.Player, 
 PleayerId, stats(wins, losses, draws), getStats(), updateStats()

 3.Game, 
 playerId1, playerId2, listOfMoves()


 //? Class Design:  O(n)
 

*/}

  /**
   * Makes a move on the board and returns the winner if the move is a winning move.
   *
   * @param player 0 or 1
   * @param row row index
   * @param col column index
   * @returns 1 if first player wins, -1 if second player wins, 0 otherwise
   */-
class TicTacToe {
  private board: number[][];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.board = Array.from({ length: n }, () => Array(n).fill(0));
  }


  move(player: number, row: number, col: number): number {
    if (row < 0 || col < 0 || row >= this.n || col >= this.n) {
      throw new Error("Move out of board boundary!");
    }

    if (this.board[row][col] !== 0) {
      throw new Error("Square is already occupied!");
    }

    if (player !== 0 && player !== 1) {
      throw new Error("Invalid player!");
    }

    // Convert player: 0 → -1, 1 → +1
    const mark = player === 0 ? -1 : 1;
    this.board[row][col] = mark;

    let winRow = true;
    let winCol = true;
    let winDiag = true;
    let winRevDiag = true;

    for (let i = 0; i < this.n; i++) {
      if (this.board[row][i] !== mark) {
        winRow = false;
      }

      if (this.board[i][col] !== mark) {
        winCol = false;
      }

      if (this.board[i][i] !== mark) {
        winDiag = false;
      }

      if (this.board[i][this.n - 1 - i] !== mark) {
        winRevDiag = false;
      }
    }

    if (winRow || winCol || winDiag || winRevDiag) {
      return mark;
    }

    return 0;
  }
}