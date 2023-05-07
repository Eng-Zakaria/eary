import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/ExamDetails.css';

const ExamDetails = ({ match, history }) => {
  const [exam, setExam] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    avgScore: '',
    highestScore: '',
    noParticipants: ''
  });

  useEffect(() => {
    // Use the exam name from the URL to fetch the corresponding exam data
    axios.get(`/api/exams/${match.params.name}`).then(response => {
      setExam(response.data);
    }).catch(error => {
      console.error('Error fetching exam data:', error);
    });
  }, [match.params.name]);

  if (!exam) {
    return <div>Loading...</div>;
  }

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdateExam = event => {
    event.preventDefault();
    axios.put(`/api/exams/${exam.name}`, formData).then(response => {
      setExam(response.data);
      setIsEditing(false);
    }).catch(error => {
      console.error('Error updating exam data:', error);
    });
  };

  const handleDeleteExam = event => {
    event.preventDefault();
    axios.delete(`/api/exams/${exam.name}`).then(() => {
      history.push('/');
    }).catch(error => {
      console.error('Error deleting exam data:', error);
    });
  };

  return (
    <div className="exam-details">
      <h2 className="exam-details-title">{exam.name}</h2>
      {isEditing ? (
        <form onSubmit={handleUpdateExam}>
          <label className="exam-details-label">Name:</label>
          <input className="exam-details-input" type="text" name="name" value={formData.name} onChange={handleInputChange} />
          <label className="exam-details-label">Difficulty:</label>
          <input className="exam-details-input" type="text" name="difficulty" value={formData.difficulty} onChange={handleInputChange} />
          <label className="exam-details-label">Duration:</label>
          <input className="exam-details-input" type="text" name="duration" value={formData.duration} onChange={handleInputChange} />
          <label className="exam-details-label">Average Score:</label>
          <input className="exam-details-input" type="text" name="avgScore" value={formData.avgScore} onChange={handleInputChange} />
          <label className="exam-details-label">Highest Score:</label>
          <input className="exam-details-input" type="text" name="highestScore" value={formData.highestScore} onChange={handleInputChange} />
          <label className="exam-details-label">No Participants:</label>
          <input className="exam-details-input" type="text" name="noParticipants" value={formData.noParticipants} onChange={handleInputChange} />
          <button className="exam-details-button" type="submit">Save</button>
          <button className="exam-details-button" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p className="exam-details-difficulty">Difficulty: {exam.difficulty}</p>
          <p className="exam-details-duration">Duration: {exam.duration}</p>
          <p className="exam-details-score">Average Score: {exam.avgScore}</p>
          <p className="exam-details-score">Highest Score: {exam.highestScore}</p>
          <p className="exam-details-participants">Number of Participants: {exam.noParticipants}</p>
          <button className="exam-details-button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="exam-details-button" onClick={handleDeleteExam}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ExamDetails;