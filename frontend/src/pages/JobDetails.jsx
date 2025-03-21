
// src/pages/JobDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  return job ? (
    <div>
      <h2>{job.jobName}</h2>
      <p>{job.jobDescription}</p>
      <h3>Applicants</h3>
      <ul>
        {job.applicants.map(app => (
          <li key={app.name}>
            {app.name} - <a href={app.resumeLink} target="_blank">Resume</a> - Score: {app.cosineScore}
          </li>
        ))}
      </ul>
      <CSVLink data={job.applicants} filename="applicants.csv">Download CSV</CSVLink>
    </div>
  ) : <p>Loading...</p>;
};
export default JobDetails;