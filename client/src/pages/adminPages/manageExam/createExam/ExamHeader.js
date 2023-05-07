import React from 'react';
import './style/examHeader.css';

function ExamHeader({ name, difficulty, duration, passingScore, setName, setDifficulty, setDuration, setPassingScore, onSave }) {
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value));
  };

  const handlePassingScoreChange = (event) => {
    setPassingScore(parseInt(event.target.value));
  };

  const handleSaveClick = () => {
    onSave({ name, difficulty, duration, passingScore });
  };



  // const saveExam = async (exam) => {
  //   try {
  //     const response = await fetch('/api/exams', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(exam),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log('Exam saved:', data);
  //   } catch (error) {
  //     console.error('Error saving exam:', error);
  //   }
  // };

  return (
    <div className="ExamHeader">
      <h1>
        <input type="text" value={name} onChange={handleNameChange} />
      </h1>
      <div className="ExamHeader-fields">
        <label>
          Difficulty:
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label>
          Duration (minutes):
          <input type="number" value={duration} onChange={handleDurationChange} />
        </label>
        <label>
          Passing Score (%):
          <input type="number" value={passingScore} onChange={handlePassingScoreChange} />
        </label>
        <button onClick={handleSaveClick}>Save Exam</button>
      </div>
    </div>
  );
}

export default ExamHeader;