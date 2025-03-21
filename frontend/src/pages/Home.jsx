// import { useEffect, useState } from "react";
// import { API_URL } from "../api/apiConfig";
// import JobCard from "../components/JobCard";

// const Home = () => {
//     const [jobs, setJobs] = useState([]);

//     useEffect(() => {
//         fetch(`${API_URL}/jobs`)
//             .then((res) => res.json())
//             .then((data) => setJobs(data));
//     }, []);

//     return (
//         <div className="container mt-4">
//             <h2>Available Jobs</h2>
//             <div className="row">
//                 {jobs.map((job) => (
//                     <JobCard key={job._id} job={job} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Home;

import { useEffect, useState } from "react";
import { API_URL } from "../api/apiConfig";
import JobCard from "../components/JobCard";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/jobs`)
            .then((res) => res.json())
            .then((data) => setJobs(data));
    }, []);

    return (
        <Container className="mt-4 home-container">
            {/* Hero Section */}
            <div className="hero-section text-center">
                <h1>Find your perfect job match</h1>
                <p>Upload your resume and get matched with the best opportunities based on your skills and experience.</p>
                <Button variant="primary" className="me-2">Create Account</Button>
                <Button variant="outline-primary">Browse Jobs</Button>
            </div>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2 className="text-center mt-5">How it works</h2>
                <Row className="mt-4">
                    <Col md={4} sm={6} xs={12} className="text-center">
                        <Card className="info-card">
                            <Card.Body>
                                <h5>Upload your resume</h5>
                                <p>Create an account and upload your resume in just a few clicks.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={6} xs={12} className="text-center">
                        <Card className="info-card">
                            <Card.Body>
                                <h5>Get matched with jobs</h5>
                                <p>Our AI analyzes your skills and matches you with the best opportunities.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12} xs={12} className="text-center">
                        <Card className="info-card">
                            <Card.Body>
                                <h5>Apply with confidence</h5>
                                <p>See how well you match with each job before applying.</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>

            {/* Featured Jobs Section */}
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
                        <p className="job-location"><i className="bi bi-geo-alt"></i> {job.location}</p>
                        <p className="job-salary"><i className="bi bi-cash-stack"></i> {job.salary}</p>
                        <Button variant="primary" className="w-100 mt-2">Apply Now</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
</section>


            {/* Call to Action */}
            <section className="cta text-center mt-5 p-4">
                <h2>Ready to find your dream job?</h2>
                <p>Join thousands of professionals who have already found their perfect match.</p>
                <Button variant="light">Get Started</Button>
            </section>
        </Container>
    );
};

export default Home;
