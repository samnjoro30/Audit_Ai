import {bucket} from "../config/Gcs.js";
import {model} from "../config/vertex.js";
import { audit } from "../schema/audit.js";
import { db } from '../config/database_sql.js';
import axios  from "axios";

async function fetchFileAsText(url) {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    return res.data.toString("utf8");
}

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const blob = bucket.file(Date.now() + "-" + file.originalname);
    const stream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype
    });

    stream.end(file.buffer);

    stream.on("finish", () => {
      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).json({ fileUrl });
    });

    stream.on("error", (err) => {
      console.log(err);
      res.status(500).json({ error: "Upload failed" });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const auditText = async (req, res) => {
  try {
    const { category, subject } = req.body;

    const prompt = `
      You are an auditing AI. Analyze the following:

      Category: ${category}
      Text: ${subject}

      Return JSON:
      {
        "summary": "",
        "issues": [],
        "score": number
      }
    `;

    const aiResponse = await model.generateContent(prompt);
    const textResult = aiResponse.response.candidates[0].content.parts[0].text;
    const parsedResult = JSON.parse(textResult);

    const newAudit = await db.insert(audit).values({
      type: "text",
      category,
      userInput: subject,
      result: parsedResult,
      createdAt: new Date()
    }).returning();

    res.json(newAudit[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Audit failed" });
  }
};

export const auditFile = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    const fileText = await fetchFileAsText(fileUrl);

    const prompt = `
      You are an auditing AI. Analyze this document:

      ${fileText}

      Return JSON:
      {
        "summary": "",
        "issues": [],
        "score": number
      }
    `;

    const aiResponse = await model.generateContent(prompt);
    const textResult = aiResponse.response.candidates[0].content.parts[0].text;
    const parsedResult = JSON.parse(textResult);

    const newAudit = await db.insert(audit).values({
      type: "file",
      fileUrl,
      result: parsedResult,
      createdAt: new Date()
    }).returning();

    res.json(newAudit[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "File audit failed" });
  }
};