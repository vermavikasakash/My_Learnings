{/*
//? Requirements : Operations → Constraints → Edge Cases → Scale

✅ 1. Core Operations
Vehicle enters parking lot
System assigns parking spot
Ticket is issued with entry time
Vehicle exits - Fee is calculated - Spot is freed

✅ 2. Constraints
Spot must match vehicle type
One vehicle per spot
Cannot enter if parking is full
Ticket required for exit

✅ 3. Edge Cases
Parking full
Lost ticket
Invalid exit

✅ 4. System Nature
Multiple floors
Multiple spots per floor
Concurrent entry/exit
Fast allocation required

❗//? Responsibilities (Control flow ownership)

🔥 Mental Model
Request always starts from a single entry point
→ That object coordinates everything
→ Others just assist

👉 In our case:❗ ParkingLot = Orchestrator (brain)

Step 1: Vehicle arrives
Who receives this?
👉 Options: ParkingSpot ❌ Ticket ❌ ParkingLot ✅

ParkingLot.parkVehicle(vehicle)

Step 2: ParkingLot needs a spot
Can ParkingLot directly pick a spot?
👉 It could, but better design:❗ Use strategy

ParkingLot → ParkingStrategy.findSpot(vehicleType)

Step 3: Strategy finds spot
What does strategy do?
Iterates floors
Finds matching available spot

Returns: ParkingSpot

Step 4: Assign vehicle to spot
Who should do this?
👉 ParkingLot OR ParkingSpot? 
👉 ParkingSpot, Reason: Spot owns its state
ParkingSpot.assignVehicle(vehicle)

Step 5: Create ticket
Who creates ticket?
👉 ParkingLot (coordinator)
new Ticket(vehicle, spot, entryTime)

✅ Final Flow
1. Vehicle enters → request goes to ParkingLot
2. ParkingLot calls ParkingStrategy.findSpot(vehicleType)
3. Strategy returns an available ParkingSpot
4. ParkingLot calls ParkingSpot.assignVehicle(vehicle)
5. ParkingLot creates a Ticket with entryTime and spot details
6. Ticket is returned to user

🧠 Key Insight (Lock This In)

  Concept      | Owner       
| ------------ | ----------- |
| Flow control | ParkingLot  |
| Finding spot | Strategy    |
| State change | ParkingSpot |
| Data         | Ticket      |

ParkingStrategy → decision making (which spot?)
“I decide WHICH spot to use”
Looks at:
all floors
all spots
rules (nearest, first, priority)

👉 It is a decision engine

ParkingSpot → state management (occupy/free)

🔹 1. What is ParkingSpot responsible for?
“I am just a container”
Knows:
am I occupied?
which vehicle is here?
Does:
assignVehicle()
removeVehicle()

👉 It should NOT decide anything globally

// ? Relationships (VERY IMPORTANT)
This is where your design becomes “real”.

✅ Object Interaction Graph
ParkingLot
 ├── has → ParkingFloor[]
 │        ├── has → ParkingSpot[]
 │
 ├── uses → ParkingStrategy
 ├── uses → PricingStrategy
 │
 └── creates → Ticket
                 ├── has → Vehicle
                 └── has → ParkingSpot

🔥 Key Ownership (Memorize This Table)             
| Responsibility    | Class           |
| ----------------- | --------------- |
| Entry/Exit flow   | ParkingLot      |
| Spot selection    | ParkingStrategy |
| Spot state        | ParkingSpot     |
| Parking structure | ParkingFloor    |
| Pricing logic     | PricingStrategy |
| Session data      | Ticket          |

//? Method-Level Design
Now we define who calls what in code terms.

🚗 parkVehicle(vehicle)

1. ParkingLot receives vehicle
2. ParkingLot → strategy.findSpot(floors, vehicleType)
3. Strategy → returns ParkingSpot
4. ParkingLot → spot.assignVehicle(vehicle)
5. ParkingLot → create Ticket
6. return Ticket

🚪 unparkVehicle(ticket)

1. ParkingLot receives ticket
2. ParkingLot → spot.removeVehicle()
3. ParkingLot → pricingStrategy.calculate(ticket)
4. return price
     */}