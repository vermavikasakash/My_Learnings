Requirements
   ↓
Identify objects
   ↓
Responsibilities
   ↓
Relationships
   ↓
Interfaces / abstractions
   ↓
Apply SOLID
   ↓
Identify useful patterns
   ↓
Implement in Java
   ↓
Discuss trade-offs

# Step 1: Identify Actors + Actions
(Requirements)
Who uses the system?
What do they do?

# Step 2: Extract Core Entities (nouns from actions)

# Step 3: Define Responsibilities
For each entity, ask: “What does this object OWN?”

Example:

ParkingSpot
 knows if free/occupied
 assigns vehicle

Ticket
 entry time
 exit time
 price calculation

# Step 4: Define Relationships
Ask:
Who contains whom?
Who talks to whom?

Example:
ParkingLot → has Floors
Floor → has Spots
Spot → has Vehicle

# Step 5: Add Behavior (methods)
Now convert responsibilities → functions

class ParkingSpot {
  isAvailable()
  assignVehicle(vehicle)
  removeVehicle()
}