import React, { useState, useEffect } from "react";
import socket from "../socket";
import axios from "axios";

const ChatBox = ({ userId, doctorId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join personal room
    socket.emit("join", userId);
  
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  
    // Fetch old messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/messages/${userId}/${doctorId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err.message);
      }
    };
  
    fetchMessages();
  
    // Clean up
    return () => {
      socket.off("receive_message");
    };
  }, [userId, doctorId]);
  

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/messages/${userId}/${doctorId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err.message);
    }
  };

  const handleSend = () => {
    if (message.trim() === "") return;

    const data = {
      senderId: userId,
      receiverId: doctorId,
      message: message,
    };
    socket.emit("send_message", data);
    setMessage("");
  };

  return (
    <div style={{ border: "1px solid #aaa", padding: "10px", width: "400px" }}>
      <h3>Chat with Doctor</h3>
      <div style={{ height: "200px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <strong>{msg.senderId === userId ? "You" : "Doctor"}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%", marginRight: "5px" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
