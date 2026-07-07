import express from "express";
import client from "../services/azureOpenAI.js";
import { extractEntities } from "../services/languageService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { transcript } = req.body;

    // Azure OpenAI
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_MODEL,

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content: `
You are an AI Meeting Notes Assistant.

Return ONLY valid JSON.

{
  "executiveSummary":"",
  "keyDiscussionPoints":[],
  "decisions":[],
  "actionItems":[
    {
      "owner":"",
      "task":"",
      "deadline":""
    }
  ]
}
`,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
    });
const summary = JSON.parse(response.choices[0].message.content);

// Temporary test data
const entities = {
  people: ["Alice", "Bob"],
  organizations: ["Microsoft"],
  locations: ["Hyderabad"],
  dates: ["Next Monday", "Friday"],
};

res.json({
  ...summary,
  entities,
});

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;