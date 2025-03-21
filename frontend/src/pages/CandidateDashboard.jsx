import React, { useEffect, useState } from "react";
import { API_URL } from "../api/apiConfig";
import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  const applyJob = async (jobId) => {
    try {
      await fetch(`${API_URL}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, userId: localStorage.getItem("userId") }),
      });
      alert("Applied successfully!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply.");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Job Portal</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/candidate">Jobs</Nav.Link>
            <Nav.Link href="/upload">Apply Jobs</Nav.Link>
            <Nav.Link href="#user-info">User Information</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Available Jobs</h1>
        {loading ? (
          <p className="text-center">Loading jobs...</p>
        ) : (
          <section className="featured-jobs">
            <h2 className="mt-5 text-center">Featured Jobs</h2>
            <Row>
              {jobs.map((job) => (
                <Col md={4} sm={6} xs={12} key={job._id} className="mb-4">
                  <Card className="job-card shadow-sm">
                    <Card.Body>
                      <h5 className="job-title">{job.title}</h5>
                      <p className="company-name">{job.company}</p>
                      <p className="company-name">Job Descriptions: {job.description}</p>
                      <p className="job-location">
                        <i className="bi bi-geo-alt"></i> {job.location}
                      </p>
                      <p className="job-salary">
                        <i className="bi bi-cash-stack"></i> {job.salary}
                      </p>
                      <Button
                        variant="primary"
                        className="w-100 mt-2"
                        onClick={() => applyJob(job._id)}
                      >
                        Apply Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>
    </>
  );
};

export default CandidateDashboard;
