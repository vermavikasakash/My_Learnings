const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

# socket.io: Enables real-time, bi-directional communication using WebSockets.

# Creates an Express app instance

const app = express();

# Enables CORS to allow requests from any origin.

app.use(cors());

# 1. Create HTTP Server & WebSocket Server

const server = http.createServer(app);

# The server wraps the Express app using http.createServer(), allowing both HTTP and WebSocket connections.

# Initializes a new Socket.io server.

const io = new Server(server, {
cors: {
origin: "\*",
methods: ["GET", "POST"],
},
});

# Configures CORS: origin: "\*": Allows requests from any origin. methods: ["GET", "POST"]: Restricts allowed HTTP methods.

# 2. Handle WebSocket Connections

io.on("connection", (socket) => {
// console.log(`user connected id is : ${socket.id}`);

# data contains the room name (roomId).

# socket.join(data): The user joins a specific room (group chat or private chat). Listens for new client connections.

# data contains the room name (roomId).

# socket.join(data): The user joins a specific room (group chat or private chat). When a client connects, a socket object is created for that connection

# socket.id is a unique identifier assigned to the connected client

# 3. Handling Events

socket.on("join_room", (data) => {
socket.join(data);
});

# data contains the room name (roomId).

# socket.join(data): The user joins a specific room (group chat or private chat).

// socket.on("send_message", (data) => {
// socket.broadcast.emit("receive_message", data);
// });

# 4. Send & Receive Messages

socket.on("send_message", (data) => {
socket.to(data.roomId).emit("receive_message", data);
});

# Listens for a "send_message" event from a client.

# Uses socket.to(data.roomId).emit("receive_message", data); to send the message only to users in the specified room

# This ensures that messages are only received by clients in the same chat room.

});

# Start Server

let PORT = 5001;
server.listen(PORT, () => {
console.log("listening to port", PORT);
});

# The server listens on port 5001 and logs a message when it's running.
