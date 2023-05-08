import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getAuthUser } from '../../../../helper/Storage';

const UpdateExam = () => {
  // Get the exam ID from the URL params
  const { examId } = useParams();

  // Define exam data as an object
  const auth = getAuthUser();
  const [exam, setExam] = useState({
    header: '',
    difficultly: '',
    duration_mins: '',
    description: '',
    state: '',
  });

  // Use the useEffect hook to fetch exam data from the server
  useEffect(() => {
    axios.get(`http://localhost:4000/api/exams/${examId}`, {
      headers: {
        token: auth.token,
      },
    }).then(response => {
      setExam(response.data);
      console.log(response.data);
    }).catch(error => {
      console.error('Error fetching exam data:', error);
    });
  }, [auth.token, examId]);

  // Define a function to handle updating an exam
  const handleUpdateExam = () => {
    axios.put(`http://localhost:4000/api/exams/${examId}`, exam, {
      headers: {
        token: auth.token,
      },
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error('Error updating exam:', error);
    });
  };

  // Define a function to handle changes to the exam data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExam(prevExam => ({ ...prevExam, [name]: value }));
  };

  return (
    <div>
      <h2>Update Exam</h2>
      <form onSubmit={handleUpdateExam}>
        <div className="form-group">
          <label htmlFor="header">Name:</label>
          <input type="text" className="form-control" id="header" name="header" value={exam.header} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="difficultly">Difficulty:</label>
          <input type="text" className="form-control" id="difficultly" name="difficultly" value={exam.difficultly} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="duration_mins">Duration:</label>
          <input type="text" className="form-control" id="duration_mins" name="duration_mins" value={exam.duration_mins} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea className="form-control" id="description" name="description" value={exam.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" className="form-control" id="state" name="state" value={exam.state} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Exam</button>
      </form>
    </div>
  );
};

export default UpdateExam;