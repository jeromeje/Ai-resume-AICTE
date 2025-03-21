import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api/apiConfig";

const ApplyJobs = () => {
    const { jobId } = useParams();
    const [resume, setResume] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("resume", resume);

        const response = await fetch(`${API_URL}/resume/${jobId}/apply`, {
            method: "POST",
            headers: { Authorization: localStorage.getItem("token") },
            body: formData,
        });

        if (response.ok) {
            alert("Resume Submitted!");
        } else {
            alert("Upload Failed");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Upload Resume</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setResume(e.target.files[0])} required />
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

export default ApplyJobs;
