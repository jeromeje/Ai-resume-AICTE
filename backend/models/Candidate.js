// const mongoose = require("mongoose");

// const CandidateSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   jobTitle: String,
//   resumeUrl: String,
//   score: Number,
//   status: { type: String, enum: ["Shortlisted", "Under Review", "Rejected"], default: "Under Review" }
// });

// module.exports = mongoose.model("Candidate", CandidateSchema);


const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  jobTitle: { type: String, required: true },
  score: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Candidate", CandidateSchema);


