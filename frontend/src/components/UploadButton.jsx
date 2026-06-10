import { useState } from "react";
import { uploadPdf } from "../services/uploadService";

export default function UploadButton() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const res = await uploadPdf(file);
    alert(res.message);
  };

  return (
    <div>
      {/* File select */}
      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        style={{
          marginBottom: "10px",
          width: "100%",
        }}
      />

      {/* Upload button */}
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

      {/* Show filename */}
      {file && (
        <p style={{ marginTop: "10px", fontSize: "12px" }}>
          {file.name}
        </p>
      )}
    </div>
  );
}