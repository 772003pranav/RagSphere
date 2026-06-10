import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const sendMessage = async (sessionId, question) => {
  const response = await axios.post(
    `${API_URL}/chat`,
    {
      session_id: sessionId,
      question: question,
    }
  );

  return response.data;
};