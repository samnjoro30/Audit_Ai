
import { VertexAI } from "@google-cloud/vertexai";

const vertex_ai = new VertexAI({
  project: process.env.GCLOUD_PROJECT_ID,
  location: "us-central1"
});

export const model = vertex_ai.getGenerativeModel({
  model: "gemini-1.5-pro"
});
