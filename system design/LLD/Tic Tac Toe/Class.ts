export class TicTacToe {
  private n: number;
  private rows: number[];
  private cols: number[];
  private diag: number;
  private antiDiag: number;

  constructor(n: number) {
    this.n = n;
    this.rows = new Array(n).fill(0);
    this.cols = new Array(n).fill(0);
    this.diag = 0;
    this.antiDiag = 0;
  }

  move(player: number, row: number, col: number): number {
    if (row < 0 || col < 0 || row >= this.n || col >= this.n) {
      throw new Error("Move out of board boundary!");
    }

    if (player !== 0 && player !== 1) {
      throw new Error("Invalid player!");
    }

    const mark = player === 0 ? -1 : 1;

    this.rows[row] += mark;
    this.cols[col] += mark;

    if (row === col) {
      this.diag += mark;
    }

    if (row + col === this.n - 1) {
      this.antiDiag += mark;
    }

    // Check win
    if (
      Math.abs(this.rows[row]) === this.n ||
      Math.abs(this.cols[col]) === this.n ||
      Math.abs(this.diag) === this.n ||
      Math.abs(this.antiDiag) === this.n
    ) {
      return mark;
    }

    return 0;
  }
}