import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const createSession = async () => {
  const response = await axios.post(`${API_URL}/session`);
  return response.data;
};

export const getSessions = async () => {
  const response = await axios.get(`${API_URL}/sessions`);
  return response.data;
};

export const getMessages = async (sessionId) => {
  const response = await axios.get(
    `${API_URL}/messages/${sessionId}`
  );
  return response.data;
};