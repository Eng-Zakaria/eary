import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const GetExam = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/exams")
      .then((res) => {
        setExams(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Manage Exams</h2>
      <Link to="/exams/create">
        <Button variant="primary" className="mb-3">
          Create Exam
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Questions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => {
            return (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.name}</td>
                <td>{exam.questions.length}</td>
                <td>
                  <Link to={`/exams/${exam.id}/edit`}>
                    <Button className="mr-2 rounded-pill" variant="primary">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/exams/${exam.id}/delete`}>
                    <Button className="mr-2 rounded-pill" variant="danger">
                      Delete
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default GetExam;
