import { React, useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [roomId, setRoomId] = useState("");
   const [userName, setUserName] = useState("");
   const [roomJoined, setRoomJoined] = useState(false);

  //? send msg or emit
  const sendMessage = () => {
    socket.emit("send_message", { message, roomId });
  };
  //? get message or listen
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  //? join room
  const joinRoom = () => {
    if (roomId !== "") {
      socket.emit("join_room", roomId);
      setRoomJoined(!roomJoined);
    }
  };

  // ! JSX START
  return (
    <div className="App">
      {/* join room */}
      <input
        type="search"
        placeholder="room"
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      />

      <button onClick={joinRoom}>join room </button>
      <br/>

      <label>user name</label>

<input  type = "text" value ={userName}
 onChange={(e)=> setUserName(e.target.value)} />
 <br/>

      {/* Send message */}
      <input
        type="search"
        placeholder="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      {/* //? SHOWING ROOM ID */}
      {roomJoined && <>
        <p>The room id is : {roomId}</p>
     <p>The user is : {userName}</p>
      </>}
  

      <button onClick={sendMessage}>Send Message</button>
      <p>Message Received : </p>
      <p>{messageReceived}</p>
    </div>
  );
}

export default App;
