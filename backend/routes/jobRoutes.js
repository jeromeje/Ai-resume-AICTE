// const express = require("express");
// const Job = require("../models/Jobs");
// const protect = require("../middleware/authMiddleware");

// const router = express.Router();

// // Add Job (Admin Only)
// router.post("/add", protect, async (req, res) => {
//     // if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied" });

//     const job = await Job.create({ ...req.body, postedBy: req.user.id });
//     res.json(job);
// });

// // Get Jobs
// router.get("/", async (req, res) => {
//     const jobs = await Job.find();
//     res.json(jobs);
// });

// module.exports = router;


const express = require("express");
const { addJob, getJobs } = require("../controller/jobController");
const router = express.Router();

router.post("/", addJob);
router.get("/", getJobs);

module.exports = router;
