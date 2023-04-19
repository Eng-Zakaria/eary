import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`//localhost:3333/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <h2>View User</h2>
      <Card>
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user.email}
          </Card.Subtitle>
          <Card.Text>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Status:</strong> {user.status ? "Active" : "Inactive"}
            </p>
          </Card.Text>
          <Button
            href={`/update-user/${user.id}`}
            variant="warning"
            className="mr-2"
          >
            Update
          </Button>
          <Button href="/get-all-users" variant="secondary">
            Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewUser;
