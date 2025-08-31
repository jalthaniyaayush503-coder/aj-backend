import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// ✅ Chat API
app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.messages[req.body.messages.length - 1].content.toLowerCase();

    // 🔍 Keywords check (Hindi + English + Hinglish)
    const keywords = [
      "creator",
      "who made",
      "who created",
      "kisne banaya",
      "banane wala",
      "maker",
      "created you",
      "tumhe kisne"
    ];

    if (keywords.some(word => userMsg.includes(word))) {
      return res.json({
        choices: [
          {
            message: {
              role: "assistant",
              content: "👉 Mujhe banaya hai Ayush 😎"
            }
          }
        ]
      });
    }

    // ✅ Agar creator wala question nahi hai → API call
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

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("AJ Backend is running! 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

