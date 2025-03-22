// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../api/apiConfig";
// import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";

// const CandidateDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userEmail, setUserEmail] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const email = localStorage.getItem("email");
//     setUserEmail(email);

//     fetch(`${API_URL}/jobs`)
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching jobs:", error);
//         setLoading(false);
//       });
//   }, []);

//   const applyJob = async (jobId) => {
//     try {
//       await fetch(`${API_URL}/apply`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ jobId, userId: localStorage.getItem("userId") }),
//       });
//       alert("Applied successfully!");
//     } catch (error) {
//       console.error("Error applying for job:", error);
//       alert("Failed to apply.");
//     }
//   };

//   const handleLogout = () => {
//     // ✅ Clear localStorage and redirect
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand href="#">Job Portal</Navbar.Brand>
//           <Nav className="ml-auto">
//             <Nav.Link href="/candidate">Jobs</Nav.Link>
//             <Nav.Link href="/upload">Apply Jobs</Nav.Link>
//             <Nav.Link href="#user-info">User Info</Nav.Link>
//             <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>

//       <Container className="mt-4">
//         {/* ✅ Display user email */}
//         <div className="text-end text-muted mb-3">
//           Logged in as: <strong>{userEmail}</strong>
//         </div>

//         <h1 className="text-center mb-4">Available Jobs</h1>
//         {loading ? (
//           <p className="text-center">Loading jobs...</p>
//         ) : (
//           <section className="featured-jobs">
//             <Row>
//               {jobs.map((job) => (
//                 <Col md={4} sm={6} xs={12} key={job._id} className="mb-4">
//                   <Card className="job-card shadow-sm">
//                     <Card.Body>
//                       <h5 className="job-title">{job.title}</h5>
//                       <p className="company-name">{job.company}</p>
//                       <p className="company-name">Job Description: {job.description}</p>
//                       <p className="job-location">
//                         <i className="bi bi-geo-alt"></i> {job.location}
//                       </p>
//                       <p className="job-salary">
//                         <i className="bi bi-cash-stack"></i> {job.salary}
//                       </p>
//                       <Button
//                         variant="primary"
//                         className="w-100 mt-2"
//                         onClick={() => applyJob(job._id)}
//                       >
//                         Apply Now
//                       </Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </section>
//         )}
//       </Container>
//     </>
//   );
// };

// export default CandidateDashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Navbar,
  Nav,
  Modal,
  Form,
} from "react-bootstrap";
import { API_URL } from "../api/apiConfig";

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    resume: null,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);

    if (email) {
      fetch(`${API_URL}/user?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.name);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setFormData({
      name: userName,
      email: userEmail,
      jobTitle: job.title,
      resume: null,
    });
    setShowModal(true);
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
      const response = await axios.post(`${API_URL}/upload`, data);
      setMessage(response.data.message + " Score: " + response.data.score);
      setShowModal(false);
      alert(response.data.message);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error uploading resume";
      setMessage(errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Job Portal</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/candidate">Jobs</Nav.Link>
            <Nav.Link href="/user-info">User Info</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <div className="text-end text-muted mb-3">
          Logged in as: <strong>{userEmail}</strong>
        </div>

        <h1 className="text-center mb-4">Available Jobs</h1>
        {loading ? (
          <p className="text-center">Loading jobs...</p>
        ) : (
          <section className="featured-jobs">
            <Row>
              {jobs.map((job) => (
                <Col md={4} sm={6} xs={12} key={job._id} className="mb-4">
                  <Card className="job-card shadow-sm">
                    <Card.Body>
                      <h5 className="job-title">{job.title}</h5>
                      <p className="company-name">{job.company}</p>
                      <p>Job Description: {job.description}</p>
                      <p>
                        <i className="bi bi-geo-alt"></i> {job.location}
                      </p>
                      <p>
                        <i className="bi bi-cash-stack"></i> {job.salary}
                      </p>
                      <Button
                        variant="primary"
                        className="w-100 mt-2"
                        onClick={() => openModal(job)}
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

      {/* Resume Upload Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {formData.jobTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control value={formData.name} readOnly />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={formData.email} readOnly />
            </Form.Group>

            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control value={formData.jobTitle} readOnly />
            </Form.Group>

            <Form.Group controlId="resume">
              <Form.Label>Upload Resume (PDF)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-3 w-100">
              Submit Application
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CandidateDashboard;
