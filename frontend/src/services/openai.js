import axios from "axios";

export const generateSummary = async (transcript) => {
  const response = await axios.post(
    "https://ai-meeting-notes-summarizer-whj6.onrender.com/api/summarize",
    {
      transcript,
    }
  );

  return response.data;
};