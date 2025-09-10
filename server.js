// ✅ For local development (optional on Render)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Get API key from environment variable
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// ✅ POST route
app.post("/ask", async (req, res) => {
  try {
    // ✅ OpenRouter API call
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Backend error", details: err.message });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("AJ Backend is running! 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
