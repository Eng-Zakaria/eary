import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const UpdateUser = () => {
  const navigate = useNavigate();
  console.log(useParams());
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3333/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setRole(res.data.role);
        setStatus(res.data.status);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handelSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      role: role,
      status: status,
    };
    axios
      .put(`http://localhost:3333/users/${id}`, data)
      .then((res) => {
        alert("User updated successfully");
        navigate("/user");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <h1>Update User</h1>
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="normal">Normal User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              className="form-control"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
