import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = ({ examId, auth, setQuestions }) => {
  // Define question data as an object
  const [question, setQuestion] = useState({
    header: '',
    description: '',
    answers: [],
    file_path: '',
  });

  // Define a function to add an answer field
  const addAnswer = () => {
    setQuestion({
      ...question,
      answers: [...question.answers, ''],
    });
  };

  // Define a function to handle form submissions
  const handleSubmit = (event) => {
    event.preventDefault();
    // Make a POST request to add the question to the server
    axios.post(`http://localhost:4000/api/exams/manage/questions/${examId}`, question, {
      headers: {
        token: auth.token,
      }
    })
    .then(response => {
      console.log(response.data);
      setQuestions(prevQuestions => [...prevQuestions, response.data]);
      // Reset the form
      setQuestion({
        header: '',
        description: '',
        answers: [],
        file_path: '',
      });
      // Close the modal
      document.getElementById('addQuestionModal').classList.remove('show');
      document.body.classList.remove('modal-open');
      document.querySelector('.modal-backdrop').remove();
    })
    .catch(error => {
      console.error('Error adding question:', error);
    });
  };

  // Define a function to handle form input changes
  const handleChange = (event) => {
    if (event.target.name.startsWith('answer')) {
      // If the input is for an answer, update the answer array in the question object
      const answerIndex = parseInt(event.target.name.match(/\d+/)[0]);
      const updatedAnswers = [...question.answers];
      updatedAnswers[answerIndex] = event.target.value;
      setQuestion({
        ...question,
        answers: updatedAnswers,
      });
    } else {
      // If the input is not for an answer, update the question object as usual
      setQuestion({
        ...question,
        [event.target.name]: event.target.value,
      });
    }
  };

  // Define a function to handle file input changes
  const handleFileChange = (event) => {
    setQuestion({
      ...question,
      file_path: event.target.value,
    });
  };

  return (
    <div className="modal fade" id="addQuestionModal" tabIndex="-1" aria-labelledby="addQuestionModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addQuestionModalLabel">Add Question</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="header" className="form-label">Header</label>
                <input type="text" className="form-control" id="header" name="header" value={question.header} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name="description" value={question.description} onChange={handleChange} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="file_path" className="form-label">File</label>
                <input type="file" className="form-control" id="file_path" name="file_path" accept=".pdf" onChange={handleFileChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="answers" className="form-label">Answers</label>
                {question.answers.map((answer, index) => (
                  <div key={index} className="input-group mb-3">
                    <span className="input-group-text">{index + 1}</span>
                    <input type="text" className="form-control" id={`answer-${index}`} name={`answer-${index}`} value={answer} onChange={handleChange} required />
                  </div>
                ))}
                <button type="button" className="btn btn-primary" onClick={addAnswer}>Add Answer</button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Add Question</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;