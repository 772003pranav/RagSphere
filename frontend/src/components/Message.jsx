export default function Message({
  sender,
  content,
  sources,
}) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser
          ? "flex-end"
          : "flex-start",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "12px",
          borderRadius: "12px",
          background: isUser
            ? "#2563eb"
            : "#1f2937",
          color: "white",
        }}
      >
        <div>{content}</div>

        {!isUser && sources?.length > 0 && (
          <div
            style={{
              marginTop: "12px",
              fontSize: "12px",
              color: "#9ca3af",
            }}
          >
            <b>Sources</b>

            {sources.map((s, index) => (
              <div key={index}>
                📄 {s.source}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}