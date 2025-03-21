const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  applyLastDate: { type: Date, required: true },
  experience: { type: String, required: true },
});

module.exports = mongoose.model("Job", JobSchema);
