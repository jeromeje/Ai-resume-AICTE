const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const natural = require("natural");
const Candidate = require("./models/Candidate");
const Job = require("./models/Job");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/authRoutes"));
app.use("/jobs", require("./routes/jobRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
// app.use("/jobs", require("./routes/jobRoutes"));

// app.use("/api/admin", require("./routes/apiadminRoutes"));
// app.use("/api/candidates", require("./routes/candidateRoutes"));
// app.use("/api/jobs", require("./routes/apijobRoutes"));

// const candidateRoutes = require("./routes/candidate");
// app.use("/api/candidates", candidateRoutes);

const jobRoutes = require("./routes/jobRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);




const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Cosine similarity function
const calculateCosineSimilarity = (text1, text2) => {
  const tokenizer = new natural.WordTokenizer();
  const words1 = tokenizer.tokenize(text1.toLowerCase());
  const words2 = tokenizer.tokenize(text2.toLowerCase());
  
  const wordSet = new Set([...words1, ...words2]);
  const vector1 = Array.from(wordSet).map((word) => words1.filter(w => w === word).length);
  const vector2 = Array.from(wordSet).map((word) => words2.filter(w => w === word).length);
  
  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
  
  return magnitude1 && magnitude2 ? (dotProduct / (magnitude1 * magnitude2)) : 0;
};

// API to handle resume upload and ranking
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, jobTitle } = req.body;
    const job = await Job.findOne({ title: jobTitle });
    if (!job) return res.status(400).json({ message: "Job not found" });

    const resumeData = await pdfParse(fs.readFileSync(req.file.path));
    const score = calculateCosineSimilarity(job.description, resumeData.text) * 100;
    
    const candidate = new Candidate({
      name,
      email,
      jobTitle,
      score: Math.round(score),
    });
    await candidate.save();
    res.json({ message: "Resume uploaded successfully", score });
  } catch (error) {
    res.status(500).json({ message: "Error processing resume" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
