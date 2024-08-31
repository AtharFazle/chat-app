import { Server as IOServer, Socket as IOSocket } from "socket.io";

export default function chat(io: IOServer,socket: IOSocket) {

  let message = [];
    socket.on("message", (data: string) => {
      console.log("Server received message:", data);
      message.push(data);
      console.log("ini message", message,data);
      io.emit("chat-message", message); 
    });
}