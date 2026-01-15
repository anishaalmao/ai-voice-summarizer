import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import cors from "cors";
import axios from "axios";

dotenv.config();

/* ---------- APP SETUP ---------- */
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, _, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

app.post("/api/upload", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const transcriptText = await new Promise((resolve, reject) => {
      exec(
        `python3 whisper_transcribe.py "${req.file.path}"`,
        { cwd: __dirname },
        (error, stdout, stderr) => {
          if (error) {
            console.error("WHISPER ERROR:", stderr);
            reject(error);
          } else {
            resolve(stdout.trim());
          }
        }
      );
    });

    // Clean up uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({ transcript: transcriptText });

  } catch (err) {
    console.error("BACKEND TRANSCRIPTION ERROR:", err);
    res.status(500).json({ error: "Transcription failed" });
  }
});

app.post("/api/summarize", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "No transcript provided" });
    }

    const hfResponse = await axios.post(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
      { inputs: transcript },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        timeout: 60000, // cold start protection
      }
    );

    res.json({
      summary: hfResponse.data[0].summary_text,
    });

  } catch (err) {
    console.error("HF ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Summarization failed" });
  }
});

const buildPath = path.join(__dirname, "../frontend/build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  app.get("*", (_, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});