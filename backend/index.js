const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const natural = require("natural");
const connectDB = require("./config/db");

const User = require("./models/User");
const Candidate = require("./models/Candidate");
const Job = require("./models/Job");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Cosine Similarity Calculation
const calculateCosineSimilarity = (text1, text2) => {
  const tokenizer = new natural.WordTokenizer();
  const words1 = tokenizer.tokenize(text1.toLowerCase());
  const words2 = tokenizer.tokenize(text2.toLowerCase());

  const allWords = new Set([...words1, ...words2]);
  const vector1 = Array.from(allWords).map(word => words1.filter(w => w === word).length);
  const vector2 = Array.from(allWords).map(word => words2.filter(w => w === word).length);

  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

  return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
};

// ✅ Resume Upload Endpoint
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, jobTitle } = req.body;

    const job = await Job.findOne({ title: jobTitle });
    if (!job) return res.status(400).json({ message: "Job not found" });

    const existingApplication = await Candidate.findOne({ email, jobTitle });
    if (existingApplication) {
      return res.status(400).json({ message: "User already applied to this job" });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const resumeData = await pdfParse(fileBuffer).catch((err) => {
      console.error("PDF Parse Error:", err);
      throw new Error("Failed to parse PDF. Please upload a valid file.");
    });

    const score = calculateCosineSimilarity(job.description, resumeData.text) * 100;

    const candidate = new Candidate({
      name,
      email,
      jobTitle,
      score: Math.round(score),
    });

    await candidate.save();

    res.json({ message: "Resume uploaded successfully", score: Math.round(score) });
  } catch (error) {
    console.error("Resume upload error:", error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate entry. Email already used for this job." });
    } else {
      res.status(500).json({ message: error.message || "Error processing resume" });
    }
  }
});

// ✅ Get user by email
app.get("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error("User fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/candidates", require("./routes/candidateRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
