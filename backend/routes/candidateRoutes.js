// const express = require("express");
// const { getCandidates, addCandidate } = require("../controller/candidateController");
// const router = express.Router();

// router.get("/", getCandidates);
// router.post("/add", addCandidate);

// module.exports = router;


const express = require("express");
const { getCandidates, exportCandidates } = require("../controller/candidateController");
const router = express.Router();

router.get("/", getCandidates);
router.get("/export", exportCandidates);

module.exports = router;
