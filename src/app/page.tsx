"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket"; // Assuming you have a socket instance exported from this file

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<string[]>([]);

  const handleSendMessage = () => {
    console.log("message", message);
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    } else {
      console.log("Socket is not connected yet.");
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      
      console.log("Connected with transport:", socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        console.log("Transport upgraded to:", transport);
        setTransport(transport.name);
      });
    }

    function getMessage(e: string[]) {
      setMessageList((prevMessageList) => [...prevMessageList, ...e]);
      console.log("Received chat message:", e);
    }

    function onDisconnect() {
      console.log("Socket disconnected");
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("chat-message", getMessage);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("chat-message", getMessage);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="w-full max-w-md">
        {messageList.map((m, i) => (
          <p key={i} className="bg-gray-100 p-2 rounded mb-2">
            {m}
          </p>
        ))}
      </div>

      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
        placeholder="Type your message here"
      />

      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Send Message
      </button>
    </div>
  );
}
