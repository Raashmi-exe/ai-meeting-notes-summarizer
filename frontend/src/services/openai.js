import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateSummary = async (transcript) => {
  const response = await API.post("/summarize", {
    transcript,
  });

  return response.data;
};