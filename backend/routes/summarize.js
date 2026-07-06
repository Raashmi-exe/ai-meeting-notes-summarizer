import express from "express";
import client from "../services/azureOpenAI.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { transcript } = req.body;

    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL,

      response_format: { type: "json_object" },

      messages: [
        {
          role: "system",
          content: `
You are an AI Meeting Notes Assistant.

Return ONLY valid JSON in this format:

{
  "executiveSummary": "",
  "keyDiscussionPoints": [],
  "decisions": [],
  "actionItems": [
    {
      "owner": "",
      "task": "",
      "deadline": ""
    }
  ]
}
`
        },
        {
          role: "user",
          content: transcript
        }
      ]
    });

    res.json(JSON.parse(response.choices[0].message.content));

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});

export default router;