
// // src/pages/AdminLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/admin/login", { username, password });
//       if (res.data.success) navigate("/dashboard");
//     } catch (err) {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };
// export default AdminLogin;

// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, Spinner, InputGroup } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import axios from "axios";
// import { API_URL } from "../api/apiConfig"; // Optional: Uncomment if you want to use API_URL

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/admin/login", { username, password });
      // const response = await axios.post(`${API_URL}/admin/login`, { username, password }); // if using API_URL

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Login Successful");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Invalid Credentials");
      }
    } catch (error) {
      toast.error("Invalid Credentials or Server Error");
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
              <p className="text-center text-muted mb-4">Sign in to your admin account</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                      aria-label="Toggle password visibility"
                    >
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
