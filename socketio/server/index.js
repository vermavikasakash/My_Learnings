const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`user connected id is : ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  // socket.on("send_message", (data) => {
  //   socket.broadcast.emit("receive_message", data);
  // });
  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("receive_message", data);
  });
});

let PORT = 5001;
server.listen(PORT, () => {
  console.log("listening to port", PORT);
});
