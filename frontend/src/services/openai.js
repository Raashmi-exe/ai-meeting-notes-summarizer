import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-meeting-notes-summarizer-whj6.onrender.com/api/summarize",
});

export const generateSummary = async (transcript) => {
  const response = await API.post("/summarize", {
    transcript,
  });

  return response.data;
};