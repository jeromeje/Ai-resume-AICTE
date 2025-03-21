const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");
const rankResumes = require("../utils/resumeRanker");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Apply for Job
router.post("/:jobId/apply", protect, upload.single("resume"), async (req, res) => {
    await Application.create({ jobId: req.params.jobId, userId: req.user.id, resume: req.file.path });
    res.json({ message: "Application submitted" });
});

// Rank Resumes
router.get("/:jobId/rank", async (req, res) => {
    const applications = await Application.find({ jobId: req.params.jobId });
    const rankedResumes = rankResumes(applications);
    res.json(rankedResumes);
});

module.exports = router;
