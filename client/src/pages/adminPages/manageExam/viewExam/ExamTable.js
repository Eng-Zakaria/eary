import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ExamTable.css';
import { getAuthUser } from '../../../../helper/Storage';

const ExamTable = () => {
  // Define exam data as an array of objects
  const auth = getAuthUser();
  const [exams, setExams] = useState([]);

  // Use the useEffect hook to fetch exam data from the server
  useEffect(() => {
    axios.get('http://localhost:4000/api/exams/manage',{
      headers: {
        token: auth.token,
      },
    }).then(response => {
      setExams(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error('Error fetching exam data:', error);
    });
  }, []);

  // Define a function to handle creating a new exam
  const handleCreateExam = () => {
    // TODO: Implement logic for creating a new exam
  };

  return (
    <div>
      <h2>Exam Table</h2>
      <Link to={"create"} className="btn btn-success" onClick={handleCreateExam}>Create Exam </Link>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Duration</th>
            <th>description</th>
            <th> state</th>
            <th>created_at</th>
          </tr>
        </thead>
        <tbody>
  {exams.map((exam, index) => (
    <tr key={index}>
      <td><Link to={`/manage-exam/${exam.exam_id}`}>{exam.header}</Link></td>
      <td>{exam.difficultly}</td>
      <td>{exam.duration_mins}</td>
      <td>{exam.description}</td>
      <td>{exam.state}</td>
      <td>{exam.created_at}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default ExamTable;