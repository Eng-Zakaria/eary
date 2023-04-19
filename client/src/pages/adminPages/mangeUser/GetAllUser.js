import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../../helper/Storage";

const GetAllUser = () => {
  const [users, setUsers] = useState([]);
  const auth = getAuthUser();
  useEffect(() => {
    axios
      .get("http://localhost:4000/users", {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/users/${id}`, {
        headers: {
          token: auth.token,
        },
      })
      .then((res) => {
        alert("User deleted successfully");
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleStatusChange = (id, status) => {
    axios
      .put(
        `http://localhost:4000/users/${id}`,
        {
          headers: {
            token: auth.token,
          },
        },

        { status: status }
      )
      .then((res) => {
        alert("User status updated successfully");
        setUsers(
          users.map((user) => {
            if (user.id === id) {
              user.status = status;
            }
            return user;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-10">
        <h2 className="my-4">All Users</h2>
        <Button variant="success" href="/create-user">
          Add User
        </Button>
        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone}</td>
                <td>
                  <Form.Check
                    type="switch"
                    id={`status-switch-${user.id}`}
                    label={user.status ? "Active" : "Inactive"}
                    checked={user.status}
                    onChange={(e) =>
                      handleStatusChange(user.id, e.target.checked)
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    href={`/update-user/${user.id}`}
                    variant="warning"
                    className="ml-2"
                  >
                    Update
                  </Button>
                  <Link
                    to={`/view-user/${user.id}`}
                    className="btn btn-primary ml-2"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GetAllUser;
