//🔹 Enums
enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  IDLE = "IDLE"
}

enum RequestType {
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL"
}
//🔹 Request
class Request {
  constructor(
    public source: number,
    public destination: number | null,
    public direction: Direction,
    public type: RequestType
  ) {}
}

//🔹 Elevator

class Elevator {
  private upQueue: number[] = [];
  private downQueue: number[] = [];

  public currentFloor: number = 0;
  public direction: Direction = Direction.IDLE;

  constructor(public id: number) {}

  addRequest(request: Request): void {
    const targetFloor =
      request.type === RequestType.INTERNAL
        ? request.destination!
        : request.source;

    if (targetFloor > this.currentFloor) {
      this.upQueue.push(targetFloor);
      this.upQueue.sort((a, b) => a - b);
    } else if (targetFloor < this.currentFloor) {
      this.downQueue.push(targetFloor);
      this.downQueue.sort((a, b) => b - a);
    }
  }

  step(): void {
    if (this.direction === Direction.IDLE) {
      if (this.upQueue.length > 0) {
        this.direction = Direction.UP;
      } else if (this.downQueue.length > 0) {
        this.direction = Direction.DOWN;
      }
    }

    if (this.direction === Direction.UP) {
      if (this.upQueue.length === 0) {
        this.direction = Direction.DOWN;
        return;
      }

      const next = this.upQueue.shift();
      if (next !== undefined) {
        this.moveTo(next);
      }
    } else if (this.direction === Direction.DOWN) {
      if (this.downQueue.length === 0) {
        this.direction = Direction.UP;
        return;
      }

      const next = this.downQueue.shift();
      if (next !== undefined) {
        this.moveTo(next);
      }
    }

    if (this.upQueue.length === 0 && this.downQueue.length === 0) {
      this.direction = Direction.IDLE;
    }
  }

  private moveTo(floor: number): void {
    console.log(
      `Elevator ${this.id}: ${this.currentFloor} → ${floor}`
    );
    this.currentFloor = floor;
  }

  isIdle(): boolean {
    return (
      this.direction === Direction.IDLE &&
      this.upQueue.length === 0 &&
      this.downQueue.length === 0
    );
  }
}
//🔹 Scheduling Strategy
interface SchedulingStrategy {
  selectElevator(
    elevators: Elevator[],
    request: Request
  ): Elevator;
}
//🔹 Nearest Strategy (fixed)
class NearestStrategy implements SchedulingStrategy {
  selectElevator(
    elevators: Elevator[],
    request: Request
  ): Elevator {
    let best = elevators[0];
    let minCost = Number.MAX_SAFE_INTEGER;

    for (const e of elevators) {
      let cost = Math.abs(e.currentFloor - request.source);

      if (
        e.direction !== Direction.IDLE &&
        e.direction !== request.direction
      ) {
        cost += 1000; // penalty
      }

      if (cost < minCost) {
        minCost = cost;
        best = e;
      }
    }

    return best;
  }
}
🔹 Controller
class ElevatorController {
  constructor(
    private elevators: Elevator[],
    private strategy: SchedulingStrategy
  ) {}

  requestElevator(request: Request): void {
    const elevator = this.strategy.selectElevator(
      this.elevators,
      request
    );

    console.log(
      `Assigning Elevator ${elevator.id} for floor ${request.source}`
    );

    elevator.addRequest(request);
  }

  stepAll(): void {
    for (const e of this.elevators) {
      e.step();
    }
  }
}
🔹 Usage
const elevators = [new Elevator(1), new Elevator(2)];

const controller = new ElevatorController(
  elevators,
  new NearestStrategy()
);

// External request: floor 5 UP
controller.requestElevator(
  new Request(5, null, Direction.UP, RequestType.EXTERNAL)
);

// simulate movement
controller.stepAll();
controller.stepAll();
