
// // 1. src/components/ResumeUpload.js
// import { useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";

// const ResumeUpload = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", jobTitle: "", resume: null });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, resume: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("jobTitle", formData.jobTitle);
//     data.append("resume", formData.resume);

//     try {
//       const response = await axios.post("http://localhost:5000/upload", data);
//       setMessage(response.data.message + " Score: " + response.data.score);
//     } catch (error) {
//       setMessage("Error uploading resume");
//     }
//   };

//   return (
//     <div>
//        <Navbar bg="dark" variant="dark" expand="lg">
//                <Container>
//                  <Navbar.Brand href="#">Job Portal</Navbar.Brand>
//                  <Nav className="ml-auto">
//                    <Nav.Link href="/candidate">Jobs</Nav.Link>
//                    <Nav.Link href="/upload">Apply Jobs</Nav.Link>
//                    <Nav.Link href="#user-info">User Information</Nav.Link>
//                  </Nav>
//                </Container>
//              </Navbar> 
//       <h2>Upload Resume</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} required />
//         <input type="file" name="resume" accept=".pdf" onChange={handleFileChange} required />
//         <button type="submit">Submit</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default ResumeUpload;




// 1. src/components/ResumeUpload.js
import { useState, useEffect } from "react";
import axios from "axios";

const ResumeUpload = () => {
  const [formData, setFormData] = useState({ name: "", email: "", jobTitle: "", resume: null });
  const [message, setMessage] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("jobTitle", formData.jobTitle);
    data.append("resume", formData.resume);

    try {
      const response = await axios.post("http://localhost:5000/upload", data);
      setMessage(response.data.message + " Score: " + response.data.score);
    } catch (error) {
      setMessage("Error uploading resume");
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <select name="jobTitle" onChange={handleChange} required>
          <option value="">Select Job</option>
          {jobs.map((job) => (
            <option key={job._id} value={job.title}>{job.title}</option>
          ))}
        </select>
        <input type="file" name="resume" accept=".pdf" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResumeUpload;
