import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrowseExams = () => {
  // Define exam data as an array
  const [exams, setExams] = useState([]);

  // Use the useEffect hook to fetch exam data from the server
  useEffect(() => {
    axios.get('http://localhost:4000/api/exams/')
    .then(response => {
      setExams(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error fetching exam data:', error);
    });
  }, []);

  return (
    <div className="row">
      {exams.map(exam => (
        <div key={exam.exam_id} className="col-md-4 mb-4">
          <div className="card h-100">
            {exam.logo && <img src={exam.logo} className="card-img-top" alt={exam.header} />}
            <div className="card-body">
              <h5 className="card-title">{exam.header}</h5>
              <p className="card-text">{exam.description}</p>
              <p className="card-text">Duration: {exam.duration_mins} minutes</p>
              <p className="card-text">Difficulty: {exam.difficultly}</p>
              <p className="card-text">Total Score: {exam.total_score}</p>
              <Link to={`/browse-exam/${exam.exam_id}`} className="btn btn-primary">View Exam</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrowseExams;