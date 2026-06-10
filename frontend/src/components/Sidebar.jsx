import { useState, useEffect } from "react";
import { uploadPdf } from "../services/uploadService";
import {
  createSession,
  getSessions,
  getMessages,
} from "../services/sessionService";
import { getDocuments } from "../services/documentService";

export default function Sidebar({ setMessages }) {
  const [file, setFile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    loadSessions();
    loadDocuments();
  }, []);

  const loadSessions = async () => {
    const data = await getSessions();
    setSessions(data);
  };

  const loadDocuments = async () => {
    const docs = await getDocuments();
    setDocuments(docs);
  };

  const handleUpload = async () => {
    if (!file) return;

    const res = await uploadPdf(file);

    setFile(null);
    await loadDocuments();

    alert(res.message);
  };

  const handleNewChat = async () => {
    await createSession();
    loadSessions();
  };

  const handleOpenChat = async (sessionId) => {
    const msgs = await getMessages(sessionId);
    setMessages(msgs);
  };

  return (
    <div
      style={{
        width: "280px",
        minWidth: "280px",
        height: "100vh",
        background: "#0b1220",
        padding: "20px",
        borderRight: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "4px", color: "white" }}>
        🚀 RagSphere
      </h2>

      <p
        style={{
          color: "#9ca3af",
          marginTop: "0",
          marginBottom: "24px",
          fontSize: "14px",
        }}
      >
        AI Document Assistant
      </p>

      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            marginBottom: "10px",
            width: "100%",
            color: "white",
          }}
        />

        <button
          onClick={handleUpload}
          style={{
            padding: "10px",
            width: "100%",
            background: "#2563eb",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Upload PDF
        </button>

        {file && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#9ca3af",
              wordBreak: "break-word",
            }}
          >
            {file.name}
          </p>
        )}
      </div>

      <button
        onClick={handleNewChat}
        style={{
          marginTop: "20px",
          padding: "10px",
          width: "100%",
          background: "#10b981",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer",
        }}
      >
        + New Chat
      </button>

      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            fontSize: "14px",
            color: "#9ca3af",
            marginBottom: "10px",
          }}
        >
          Chats
        </h3>

        {sessions.length === 0 ? (
          <p style={{ fontSize: "12px", color: "#d1d5db" }}>
            No chats yet
          </p>
        ) : (
          <div>
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleOpenChat(session.id)}
                style={{
                  marginTop: "10px",
                  color: "#d1d5db",
                  cursor: "pointer",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  background: "#111827",
                }}
              >
                {session.title || `Chat ${session.id}`}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3
          style={{
            fontSize: "14px",
            color: "#9ca3af",
            marginBottom: "10px",
          }}
        >
          Documents
        </h3>

        {documents.length === 0 ? (
          <p style={{ fontSize: "12px", color: "#d1d5db" }}>
            No documents yet
          </p>
        ) : (
          <div>
            {documents.map((doc) => (
              <div
                key={doc}
                style={{
                  marginTop: "10px",
                  color: "#d1d5db",
                  fontSize: "13px",
                  wordBreak: "break-word",
                }}
              >
                📄 {doc}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}