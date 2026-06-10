import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #1f2937",
      }}
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      <button
        onClick={handleSend}
        style={{
          marginLeft: "10px",
          padding: "10px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Send
      </button>
    </div>
  );
}