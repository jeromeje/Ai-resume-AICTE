const express = require("express");
const Candidate = require("../models/Candidate");

const router = express.Router();

// Fetch all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Export candidates data as CSV
router.get("/export", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    let csvData = "Name,Email,Job Title,Score,Status\n";
    
    candidates.forEach(candidate => {
      csvData += `${candidate.name},${candidate.email},${candidate.jobTitle},${candidate.score},${candidate.status}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=candidates.csv");
    res.status(200).send(csvData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
