import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <Sidebar setMessages={setMessages} />

      <ChatWindow
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
