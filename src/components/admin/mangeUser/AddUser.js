import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("normal");
  const [status, setStatus] = useState("active");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      role: role,
      email: email,
      status: status,
    };
    axios
      .post("http://localhost:3333/users", data)
      .then((res) => {
        alert("User created successfully");
        setUsername("");
        setPassword("");
        setRole("normal");
        setStatus("active");
        navigate("/user");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div style={{ marginTop: "100px" }}>
        <h2>Create User</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="normal">Normal User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
