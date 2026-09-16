// TypeScript Implementation

// 🔸 Enums
enum VehicleType {
  BIKE,
  CAR,
  TRUCK
}

//🔸 Vehicle
class Vehicle {
  constructor(
    public license: string,
    public type: VehicleType
  ) {}
}

// 🔸 ParkingSpot
class ParkingSpot {
  private vehicle: Vehicle | null = null;

  constructor(
    public id: number,
    public type: VehicleType
  ) {}

  isAvailable(): boolean {
    return this.vehicle === null;
  }

  assignVehicle(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  removeVehicle() {
    this.vehicle = null;
  }
}

// 🔸 ParkingFloor

class ParkingFloor {
  constructor(
    public id: number,
    public spots: ParkingSpot[]
  ) {}
}

// 🔸 ParkingStrategy
interface ParkingStrategy {
  findSpot(
    floors: ParkingFloor[],
    type: VehicleType
  ): ParkingSpot | null;
}
// 🔸 FirstAvailableStrategy
class FirstAvailableStrategy implements ParkingStrategy {
  findSpot(floors: ParkingFloor[], type: VehicleType) {
    for (const floor of floors) {
      for (const spot of floor.spots) {
        if (spot.type === type && spot.isAvailable()) {
          return spot;
        }
      }
    }
    return null;
  }
}

// 🔸 Ticket

class Ticket {
  exitTime?: Date;

  constructor(
    public id: number,
    public vehicle: Vehicle,
    public spot: ParkingSpot,
    public entryTime: Date
  ) {}
}

// 🔸 PricingStrategy
interface PricingStrategy {
  calculate(ticket: Ticket): number;
}
// 🔸 Simple Pricing
class HourlyPricing implements PricingStrategy {
  calculate(ticket: Ticket): number {
    const hours =
      (Date.now() - ticket.entryTime.getTime()) / (1000 * 60 * 60);
    return Math.ceil(hours) * 10;
  }
}


//🔸 ParkingLot (Main Brain)
class ParkingLot {
  constructor(
    private floors: ParkingFloor[],
    private strategy: ParkingStrategy,
    private pricing: PricingStrategy
  ) {}

  park(vehicle: Vehicle): Ticket | null {
    const spot = this.strategy.findSpot(this.floors, vehicle.type);
    if (!spot) return null;

    spot.assignVehicle(vehicle);

    return new Ticket(
      Date.now(),
      vehicle,
      spot,
      new Date()
    );
  }

  unpark(ticket: Ticket): number {
    ticket.spot.removeVehicle();
    ticket.exitTime = new Date();

    return this.pricing.calculate(ticket);
  }
}