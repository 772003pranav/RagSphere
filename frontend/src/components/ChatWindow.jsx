import { useState } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { sendMessage } from "../services/chatService";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);

  // =========================
  // HANDLE SEND
  // =========================
  const handleSend = async (text) => {
    if (!text) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        content: text,
      },
    ]);

    // Call backend
    const response = await sendMessage(
      currentSessionId,
      text);


    // Add assistant message WITH sources ✅
    setMessages((prev) => [
      ...prev,
      {
        sender: "assistant",
        content: response.answer,
        sources: response.sources,
      },
    ]);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* ===================== */}
      {/* CHAT AREA */}
      {/* ===================== */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {messages.length === 0 ? (
          <h1
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontSize: "28px",
              color: "#e5e7eb",
            }}
          >
            Ask Anything About Your PDF
          </h1>
        ) : (
          messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender}
              content={msg.content}
              sources={msg.sources}
            />
          ))
        )}
      </div>

      {/* ===================== */}
      {/* INPUT */}
      {/* ===================== */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}