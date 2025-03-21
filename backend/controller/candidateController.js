const Candidate = require("../models/Candidate");
const { exportCSV } = require("../utils/csvExport");

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates", error });
  }
};

exports.exportCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    const csvData = await exportCSV(candidates);
    
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=candidates.csv");
    res.status(200).send(csvData);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV", error });
  }
};
