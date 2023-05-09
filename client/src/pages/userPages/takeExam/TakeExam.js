import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TakeExam = () => {
  const { id } = useParams(); // get the exam ID from the URL params
  console.log(id)
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    axios.get(`https://localhost:4000/exams/take/${id}`)
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

  const { title, description, duration, questions } = examData;

  return (
    <div>
      <header>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>Duration: {duration}</p>
        <p>Questions: {questions.length}</p>
      </header>
      <section>
        {questions.map(question => (
          <div key={question.id}>
            <h2>{question.text}</h2>
            <ul>
              {question.answers.map(answer => (
                <li key={answer.id}>{answer.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TakeExam;