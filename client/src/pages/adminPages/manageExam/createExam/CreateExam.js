import React, { useState } from 'react';
import ExamHeader from './ExamHeader';
import Question from './Question';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style/exam.css'

function CreateExam() {
  const [name, setName] = useState();
  const [difficulty, setDifficulty] = useState('Easy');
  const [duration, setDuration] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [passingScore, setPassingScore] = useState();

  const handleAddQuestion = () => {
    const newQuestion = {
      title: 'New Question',
      audioFile: null,
      choices: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const handleQuestionDelete = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    // Validate exam data
    if (!name || name.trim() === '') {
      alert('Please enter a name for the exam');
      return;
    }
    if (!duration || duration <= 0) {
      alert('Please enter a valid duration for the exam');
      return;
    }
    if (!passingScore || passingScore <= 0) {
      alert('Please enter a valid passing score for the exam');
      return;
    }
    if (questions.length === 0) {
      alert('Please add at least one question to the exam');
      return;
    }
    for (const question of questions) {
      if (!question.title || question.title.trim() === '') {
        alert('Please enter a title for all questions');
        return;
      }
      if (!question.choices || question.choices.length < 2) {
        alert('Please add at least two choices to all questions');
        return;
      }
      if (!question.answer || question.answer.trim() === '') {
        alert('Please select an answer for all questions');
        return;
      }
    }
  
    // Construct exam data
    const exam = {
      name,
      difficulty,
      duration,
      passingScore,
      questions,
    };
  
    // Send POST request to server
    fetch('/3000/exams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exam),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        alert('Exam saved successfully');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error saving the exam');
      });
  };
  
  return (
    <div className="exam-container">
      <ExamHeader
        name={name}
        difficulty={difficulty}
        duration={duration}
        passingScore={passingScore}
        setName={setName}
        setDifficulty={setDifficulty}
        setDuration={setDuration}
        setPassingScore={setPassingScore}
        onSave={handleSave}
      />
      <div className="questions-container">
        {questions.map((question, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            onQuestionChange={handleQuestionChange}
            onDeleteQuestion={() => handleQuestionDelete(index)}
          />
        ))}
      </div>
      <button className="add-question-button" onClick={handleAddQuestion}>
        <FontAwesomeIcon icon={faPlus} />
        Add Question
      </button>
    </div>
  );
}

export default CreateExam;