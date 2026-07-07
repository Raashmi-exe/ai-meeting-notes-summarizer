import { TextAnalysisClient } from "@azure/ai-language-text";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();

const client = new TextAnalysisClient(
  process.env.AZURE_LANGUAGE_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_LANGUAGE_KEY)
);

console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(client)));

export async function extractEntities(text) {
  return {
    people: [],
    organizations: [],
    locations: [],
    dates: []
  };
}