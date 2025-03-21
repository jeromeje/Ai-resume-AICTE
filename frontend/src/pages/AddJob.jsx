
// // src/pages/AddJob.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddJob = () => {
//   const [jobName, setJobName] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [applyLastDate, setApplyLastDate] = useState("");
//   const [experience, setExperience] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     await axios.post("http://localhost:5000/jobs/add", { jobName, jobDescription, applyLastDate, experience });
//     navigate("/dashboard");
//   };

//   return (
//     <div>
//       <h2>Add Job</h2>
//       <input type="text" placeholder="Job Name" onChange={(e) => setJobName(e.target.value)} />
//       <textarea placeholder="Job Description" onChange={(e) => setJobDescription(e.target.value)}></textarea>
//       <input type="date" onChange={(e) => setApplyLastDate(e.target.value)} />
//       <input type="text" placeholder="Experience" onChange={(e) => setExperience(e.target.value)} />
//       <button onClick={handleSubmit}>Add Job</button>
//     </div>
//   );
// };
// export default AddJob;





import { useState, useEffect } from "react";
import { Button, Card, Container, Form, Nav, Navbar, Row, Col, Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJob, setNewJob] = useState({ title: "", description: "", applyLastDate: "", experience: "" });
  const [addingJob, setAddingJob] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle adding a new job
  const handleAddJob = async (e) => {
    e.preventDefault();
    setAddingJob(true);
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (response.ok) {
        const addedJob = await response.json();
        setJobs([...jobs, addedJob.job]);
        setNewJob({ title: "", description: "", applyLastDate: "", experience: "" });
      } else {
        console.error("Error adding job");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAddingJob(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand>ResumeRank Admin</Navbar.Brand>
          <Link to="/dashboard" className="btn btn-primary mb-4">Admin Dashboard</Link>
          <Nav className="ms-auto">
            <Button variant="outline-danger">Logout</Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="py-4">
        <h1 className="mb-4">Admin Dashboard</h1>

        {/* Jobs Statistics */}
        <Row className="mb-4">
          <Col md={4}>
            <Card body>Total Jobs: {jobs.length}</Card>
          </Col>
        </Row>

        {/* Add Job Form */}
        <Card className="mb-4">
          <Card.Body>
            <h5>Add New Job</h5>
            <Form onSubmit={handleAddJob}>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Apply Last Date</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      value={newJob.applyLastDate}
                      onChange={(e) => setNewJob({ ...newJob, applyLastDate: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={newJob.experience}
                      onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="mt-3" disabled={addingJob}>
                {addingJob ? <Spinner size="sm" animation="border" /> : "Add Job"}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        {/* Jobs Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Apply Last Date</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>{job.applyLastDate}</td>
                <td>{job.experience}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
