import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TakeExam = () => {
  const { id } = useParams(); // get the exam ID from the URL params
  console.log(id)
  const [examData, setExamData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:4000/exams/take/${id}`)
      .then(response => {
        setExamData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching exam data:', error);
      });
  }, [id]);

  if (!examData) {
    return <div>Loading...</div>;
  }

  const { answers, questions } = examData;

  return (
    <div>
      <h2>Exam</h2>
      {questions.map(question => (
        <div key={question.question_id}>
          <h3>{question.header}</h3>
          <p>{question.description}</p>
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index}>
                <input type={question.type} name={`question_${question.question_id}`} value={answer[1]} disabled />
                <label htmlFor={`question_${question.question_id}`}>{answer[1]}</label>
                {index === question.correct_answer_index && <span> (correct)</span>}
              </li>
            ))}
          </ul>
          <p>Your answer: {answers[question.question_id][1]}</p>
          {answers[question.question_id][2] === 1 ? (
            <p>Your answer is correct!</p>
          ) : (
            <p>Your answer is incorrect. The correct answer is {question.answers[question.correct_answer_index][1]}.</p>
          )}
          <p>Points earned: {answers[question.question_id][3]}</p>
          <p>Last modified at: {answers[question.question_id][4]}</p>
        </div>
      ))}
    </div>
  );
};

export default TakeExam;