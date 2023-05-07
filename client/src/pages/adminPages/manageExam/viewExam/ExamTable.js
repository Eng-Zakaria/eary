import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ExamTable.css';

const ExamTable = () => {
  // Define exam data as an array of objects
  const [exams, setExams] = useState([]);

  // Use the useEffect hook to fetch exam data from the server
  useEffect(() => {
    axios.get('/api/exams').then(response => {
      setExams(response.data);
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
            <th>Avg Score</th>
            <th>Highest Score</th>
            <th>No Participants</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <Link key={index} to={`/${exam.name}`}>
              <tr>
                <td>{exam.name}</td>
                <td>{exam.difficulty}</td>
                <td>{exam.duration}</td>
                <td>{exam.avgScore}</td>
                <td>{exam.highestScore}</td>
                <td>{exam.noParticipants}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;