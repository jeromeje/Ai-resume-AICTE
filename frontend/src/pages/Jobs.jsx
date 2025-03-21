import { useState, useEffect } from "react";
import { getJobs, applyJob } from "../api";

function Jobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await getJobs();
            setJobs(res.data);
        };
        fetchJobs();
    }, []);

    const handleApply = async (id) => {
        await applyJob(id);
        alert("Applied successfully");
    };

    return (
        <div className="container mt-5">
            <h2>Job Listings</h2>
            {jobs.map(job => (
                <div className="card my-2" key={job._id}>
                    <div className="card-body">
                        <h5>{job.title}</h5>
                        <p>{job.description}</p>
                        <button className="btn btn-success" onClick={() => handleApply(job._id)}>Apply</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Jobs;
