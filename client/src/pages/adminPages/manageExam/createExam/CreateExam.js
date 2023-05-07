import { useState } from 'react';
import axios from 'axios';
import { getAuthUser } from '../../../../helper/Storage';

const CreateExam = () => {
  const auth = getAuthUser();
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [totalScore, setTotalScore] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleTotalScoreChange = (event) => {
    setTotalScore(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/exams/manage', {
        header,
        description,
        duration,
        difficulty,
        totalScore,
      }, { 
        headers: {
          token: auth.token,
          }});
      setSuccessMessage(response.data.message);
      setHeader('');
      setDescription('');
      setDuration('');
      setDifficulty('');
      setTotalScore('');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Create Exam</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={header}
            onChange={handleHeaderChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (in minutes):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={handleDurationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <select id="difficulty" value={difficulty} onChange={handleDifficultyChange} required>
            <option value="">Select difficulty level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="totalScore">Total Score:</label>
          <input
            type="number"
            id="totalScore"
            value={totalScore}
            onChange={handleTotalScoreChange}
            required
          />
        </div>
        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
};

export default CreateExam;