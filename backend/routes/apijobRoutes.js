const express = require("express");
const { getJobs, addJob } = require("../controller/jobController");
const router = express.Router();

router.get("/", getJobs);
router.post("/add", addJob);

module.exports = router;
