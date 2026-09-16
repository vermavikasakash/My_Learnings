{/*
//? Requirements : Operations → Constraints → Edge Cases → Scale

✅ 1. Core Operations

User makes request:
     External (UP/DOWN from floor)
     Internal (destination inside elevator)
System assigns request to an elevator
Elevator moves to serve requests
Elevator stops at requested floors
Request is completed and removed

✅ 2. Constraints (Critical for Elevator)

Elevator serves requests based on direction (UP/DOWN)
While moving in one direction, it serves all requests in that path
Internal requests have higher priority than new external ones (common assumption)
Elevator has capacity limits

✅ 3. Edge Cases

No available elevator (all busy)
Requests in opposite direction
Simultaneous requests (race condition)
Elevator overload / capacity full

✅ 4. System Nature

Multiple elevators
Multiple floors
Concurrent requests
Real-time scheduling required

❗//? Responsibilities (Control flow ownership)

🔥Entities
  ElevatorController → assigns requests
  Elevator → executes movement + handles requests
  Request → represents a user request (source, destination, direction)
  SchedulingStrategy → selects best elevator
  Enums → Direction, RequestType

🔹 1. ElevatorController (Orchestrator)
Owns:
list of elevators
schedulingStrategy

Does:
receives request
assigns elevator using strategy
request → controller → strategy → elevator

🔹 2. Elevator
Owns:
id
currentFloor
direction (UP / DOWN / IDLE)
internalRequests (destinations)
externalRequests (assigned by controller)

Does:
move()
addRequest()
processRequests()

🔹 3. Request (DATA CLASS)

👉 Fix this in your mind:
Request = event, not enum

Attributes:
sourceFloor
destinationFloor (optional for external)
direction (UP/DOWN)
type (INTERNAL / EXTERNAL)

🔹 4. Enums (Correct place for enums)
Direction → UP, DOWN, IDLE  
RequestType → INTERNAL, EXTERNAL  

🔹 5. SchedulingStrategy
Does:
  pick best elevator based on:
  direction match
  distance
  load

🧠 Key Mental Model (Very Important)
Controller → assigns work
Elevator → executes work
Strategy → decides assignment
Request → describes work


🔥 Critical Elevator Insight
This is what makes Elevator harder than Parking Lot:

 ParkingLot:
 1 request → 1 decision → done

 Elevator:
 many requests → continuous decisions → dynamic system

 🚧 How elevator processes requests
 UP requests   → Min Heap (smallest first)
 DOWN requests → Max Heap (largest first)

 🔼 UP Direction
Move from low → high
Always pick nearest higher floor

👉 MinHeap gives: 12 → 15 → 20 ✔

🔽 DOWN Direction
Move from high → low
Always pick nearest lower floor

👉 MaxHeap gives: 8 → 6 → 2 ✔

🔥 Final Elevator Internal Structure
Inside each Elevator:

currentFloor
direction

upQueue   → MinHeap
downQueue → MaxHeap

🔁 Processing Logic

IF direction == UP:
    serve all upQueue
    then switch to DOWN

IF direction == DOWN:
    serve all downQueue
    then switch to UP

🧠 This design ensures:

✔ No zig-zag movement
✔ Efficient batching
✔ Predictable behavior

“This is similar to SCAN algorithm (disk scheduling)”

❓ When a new request comes:

👉 How do you decide: (Scheduling Logic)

Add to current elevator?
Or assign to another elevator?

✅ Step 1: Filter candidates
1. Elevators moving in SAME direction AND will pass the request floor
2. Idle elevators
3. All other elevators

✅ Step 2: Choose best among them
Define a cost function:

cost = distance + penalty

Case 1: Same direction (BEST case)
Elevator going UP and request is UP
Elevator is below request floor
👉 cost = (requestFloor - currentFloor)

Case 2: Idle elevator
👉 cost = absolute distance
|requestFloor - currentFloor|

Case 3: Opposite direction (worst)
👉 Elevator must:
finish current path
reverse
come back
👉 assign higher penalty
cost = distance + large_penalty

🧠 Clean Summary
Same direction → best
Idle → second best
Opposite direction → fallback

🧠 Final Strategy
“I would first prioritize elevators moving in the same direction and will pass the request floor.
If none exist, I’d pick the nearest idle elevator.
Otherwise, I’d assign the least costly elevator based on a cost function considering distance and direction penalty.”

🚧 Final Step (Wrap the Design)

❓ Full Flow
When user presses UP button on floor 5, explain:
End-to-end flow (Controller → Strategy → Elevator → Queue → Movement)

“User generates a request which goes to the controller. The controller uses a scheduling strategy
 to select the best elevator. The request is assigned to that elevator, which adds it to its 
 direction-based queue and processes it during movement.”

🚀 End-to-End Flow
1. User presses UP button on floor 5
2. System creates an EXTERNAL Request (source=5, direction=UP)
3. Request is sent to ElevatorController
4. ElevatorController calls SchedulingStrategy to select best elevator
5. Strategy returns chosen Elevator
6. Controller assigns request → elevator.addRequest(request)
7. Elevator adds request to appropriate queue (UP min-heap)
8. Elevator processes queue → moves and stops at floor 5
9. Request is completed and removed

👉Key Ownership
| Step             | Owner                 |
| ---------------- | --------------------- |
| Request creation | System                |
| Assignment       | Controller + Strategy |
| Storage          | Elevator (queues)     |
| Execution        | Elevator              |

*/}  