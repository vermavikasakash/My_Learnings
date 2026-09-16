Step-by-step LLD flow (memorize this)

1. Clarify requirements
2. Identify entities (nouns)
3. Assign responsibilities (verbs)
4. Define relationships
5. Design classes
6. Add methods

🎯 Step 1: Requirements 
Functional: - What actions system supports
Non-functional: - scale? consistency? latency? (keep light)

Functional:
- start game
- make move
- check winner

Non-functional:
- small system, no scaling needed

🎯 Step 2: Entities (THIS is where clarity comes)
“Pick nouns from problem statement”
Game
Board
Player
Move

🎯 Step 3: Responsibilities
“Each entity gets 1–2 clear responsibilities”

Game → manages turns, winner
Board → stores state, validates moves
Player → holds symbol

🎯 Step 4: Relationships
"Who owns whom?"
Game → has Board
Game → has Players
Board → has grid

🎯 Step 5: Classes
class Game {
  board
  players
}

class Board {
  grid
}

class Player {
  symbol
}

🎯 Step 6: Methods (👉 Add only essential)
Game.makeMove()
Board.place()
Board.checkWinner()

# WORKING FLOW
# CLASS PLAYER
class Player {
    symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;
    }
}

# CLASS BOARD
class Board {
    size: number;
    grid: string[][];

    constructor(size: number) {
        this.size = size;
        this.grid = Array.from({ length: size }, () =>
            Array(size).fill("")
        );
    }

    place(row: number, col: number, symbol: string): boolean {
        if (this.grid[row][col] !== "") return false;
        this.grid[row][col] = symbol;
        return true;
    }

    checkWinner(row: number, col: number, symbol: string): boolean {
        let winRow = true;
        let winCol = true;
        let winDiag = true;
        let winAntiDiag = true;

        for (let i = 0; i < this.size; i++) {
            if (this.grid[row][i] !== symbol) winRow = false;
            if (this.grid[i][col] !== symbol) winCol = false;
            if (this.grid[i][i] !== symbol) winDiag = false;
            if (this.grid[i][this.size - 1 - i] !== symbol) winAntiDiag = false;
        }

        return winRow || winCol || winDiag || winAntiDiag;
    }
}

# CLASS GAME
class Game {
    board: Board;
    players: Player[];
    currentPlayerIndex: number;

    constructor(size: number) {
        this.board = new Board(size);
        this.players = [new Player("X"), new Player("O")];
        this.currentPlayerIndex = 0;
    }

    makeMove(row: number, col: number): string {
        let player = this.players[this.currentPlayerIndex];

        if (!this.board.place(row, col, player.symbol)) {
            return "Invalid Move";
        }

        if (this.board.checkWinner(row, col, player.symbol)) {
            return `Player ${player.symbol} wins`;
        }

        // switch turn
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;

        return "Continue";
    }
}