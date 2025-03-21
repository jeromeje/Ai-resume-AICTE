// const mongoose = require("mongoose");

// const JobSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// module.exports = mongoose.model("Job", JobSchema);


const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
  jobName: String,
  jobDescription: String,
  applyLastDate: String,
  experience: String,
  applicants: [{
    name: String,
    resumeLink: String,
    cosineScore: Number
  }]
});
module.exports = mongoose.model("Job", JobSchema);