import { Socket, Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("The socket.IO server is already active");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
      socket.on("join", (room) => {
        console.log("join request recieved");
        socket.join(room);
        console.log(`${socket.id} joined ${room}`);
      });
      socket.on("roomMessage", (message) => {
        socket.to("room1").emit("sendMembers", message);
      });
    });
  }

  res.end();
}
