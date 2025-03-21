
// import { useState, useEffect } from "react";
// import { Button, Card, Container, Form, Row, Col, Table, Spinner } from "react-bootstrap";
// import { FaUsers, FaBriefcase, FaChartBar, FaDownload } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function AdminDashboardPage() {
//   const [candidates, setCandidates] = useState([]);
//   const [minScore, setMinScore] = useState(70);
//   const [jobFilter, setJobFilter] = useState("all");
//   const [exportLoading, setExportLoading] = useState(false);

//   // Fetch candidates from the backend
//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/candidates");
//         setCandidates(response.data);
//       } catch (error) {
//         console.error("Error fetching candidates:", error);
//       }
//     };
//     fetchCandidates();
//   }, []);

//   const filteredCandidates = candidates.filter(
//     (candidate) => candidate.score >= minScore && (jobFilter === "all" || candidate.jobTitle === jobFilter)
//   );

//   const jobTitles = Array.from(new Set(candidates.map((c) => c.jobTitle)));

//   const handleExportCSV = async () => {
//     setExportLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/candidates/export", {
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "candidates.csv");
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error("Error exporting CSV:", error);
//     }
//     setExportLoading(false);
//   };

//   return (
//     <div>
//       <Container className="py-4">
//          {/* Navbar
//               <Navbar bg="light" expand="lg" className="border-bottom">
//                 <Container>
//                   <Navbar.Brand>ResumeRank Admin</Navbar.Brand>
//                   <Link to="/add-job" className="btn btn-primary mb-4">Go to Add Job Page</Link>

//                   <Nav className="ms-auto">
//                     <Button variant="outline-danger">Logout</Button>
//                   </Nav>
//                 </Container>
//               </Navbar> */}
//         <h1 className="mb-4">Admin Dashboard</h1>
//         <Link to="/add-job" className="btn btn-primary mb-4">Go to Add Job Page</Link>
//         <Row className="mb-4">
//           <Col md={4}><Card body><FaUsers /> Total Candidates: {candidates.length}</Card></Col>
//           <Col md={4}><Card body><FaBriefcase /> Open Jobs: {jobTitles.length}</Card></Col>
//           <Col md={4}><Card body><FaChartBar /> Avg. Match Score: {candidates.length > 0 ? Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length) : 0}%</Card></Col>
//         </Row>
        

//         {/* Rest of the component remains the same */}
//         <Card className="mb-4">
//           <Card.Body>
//             <h5>Resume Screening Results</h5>
//             {/* Filters and Export */}
//             {/* ... */}
//           </Card.Body>
//         </Card>

//         {/* Candidates Table */}
//         <Table striped bordered hover>
//           <thead>
//             <tr><th>Name</th><th>Email</th><th>Job Title</th><th>Score</th><th>Status</th></tr>
//           </thead>
//           <tbody>
//             {filteredCandidates.map(candidate => (
//               <tr key={candidate.id}><td>{candidate.name}</td><td>{candidate.email}</td><td>{candidate.jobTitle}</td><td>{candidate.score}%</td><td>{candidate.status}</td></tr>
//             ))}
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Button, Card, Container, Table, Row, Col, Spinner, Form } from "react-bootstrap";
import { FaUsers, FaBriefcase, FaChartBar, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboardPage() {
  const [candidates, setCandidates] = useState([]);
  const [minScore, setMinScore] = useState(70);
  const [jobFilter, setJobFilter] = useState("all");
  const [exportLoading, setExportLoading] = useState(false);

  // Fetch candidates from the backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/candidates");
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(
    (candidate) => candidate.score >= minScore && (jobFilter === "all" || candidate.jobTitle === jobFilter)
  );

  const jobTitles = Array.from(new Set(candidates.map((c) => c.jobTitle)));

  const handleExportCSV = async () => {
    setExportLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/candidates/export", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "candidates.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
    setExportLoading(false);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <Link to="/add-job" className="btn btn-primary mb-4">Go to Add Job Page</Link>
      <Row className="mb-4">
        <Col md={4}><Card body><FaUsers /> Total Candidates: {candidates.length}</Card></Col>
        <Col md={4}><Card body><FaBriefcase /> Open Jobs: {jobTitles.length}</Card></Col>
        <Col md={4}><Card body><FaChartBar /> Avg. Match Score: {candidates.length > 0 ? Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length) : 0}%</Card></Col>
      </Row>
      <Card className="mb-4">
        <Card.Body>
          <h5>Resume Screening Results</h5>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group controlId="minScore">
                  <Form.Label>Min Score</Form.Label>
                  <Form.Control type="number" value={minScore} onChange={(e) => setMinScore(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="jobFilter">
                  <Form.Label>Job Filter</Form.Label>
                  <Form.Control as="select" value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}>
                    <option value="all">All</option>
                    {jobTitles.map((title, index) => (
                      <option key={index} value={title}>{title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <Button onClick={handleExportCSV} disabled={exportLoading}>
                  {exportLoading ? <Spinner animation="border" size="sm" /> : <FaDownload />} Export CSV
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Job Title</th><th>Score</th><th>Status</th></tr>
        </thead>
        <tbody>
          {filteredCandidates.map(candidate => (
            <tr key={candidate._id}><td>{candidate.name}</td><td>{candidate.email}</td><td>{candidate.jobTitle}</td><td>{candidate.score}%</td><td>{candidate.status}</td></tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
