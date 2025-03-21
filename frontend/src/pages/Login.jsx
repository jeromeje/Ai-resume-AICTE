// import { useState } from "react";
// import { API_URL } from "../api/apiConfig";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch(`${API_URL}/auth/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             localStorage.setItem("token", data.token);
//             alert("Login Successful");
//             navigate("/");
//         } else {
//             alert("Invalid Credentials");
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//                 <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, Spinner, InputGroup } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { API_URL } from "../api/apiConfig";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login Successful");
        navigate("/candidate");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={5} className="mx-auto">
          <Card className="p-4 shadow">
            <Card.Body>
              <h1 className="text-center mb-4">Welcome Back</h1>
              <p className="text-center text-muted mb-4">Sign in to your account to continue</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                      {showPassword ? <EyeSlashFill /> : <EyeFill />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button 
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner animation="border" size="sm" /> : 'Sign in'}
                </Button>
              </Form>

              <div className="text-center">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register">Register</Link>
              </div>

              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
