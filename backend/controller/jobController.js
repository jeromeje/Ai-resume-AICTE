const Job = require("../models/Job");

exports.addJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ job });
  } catch (error) {
    res.status(500).json({ message: "Error adding job", error });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};
