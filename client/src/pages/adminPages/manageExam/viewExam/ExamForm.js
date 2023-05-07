import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
function ExamForm() {
    const [questions, setQuestions] = useState([]);
    const [durationInMins, setDurationInMins] = useState(30);
    const [totalScore, setTotalScore] = useState(100);
    const [difficulty, setDifficulty] = useState('mid');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // TODO: handle form submission
    };
  
    const handleAddQuestion = () => {
      setQuestions([...questions, { header: '', rank: 1 }]);
    };
  
    const handleQuestionChange = (event, index) => {
      const newQuestions = [...questions];
      newQuestions[index][event.target.name] = event.target.value;
      setQuestions(newQuestions);
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="durationInMins">
          <Form.Label>Duration in Minutes</Form.Label>
          <Form.Control type="number" value={durationInMins} onChange={(event) => setDurationInMins(event.target.value)} />
        </Form.Group>
  
        <Form.Group controlId="totalScore">
          <Form.Label>Total Score</Form.Label>
          <Form.Control type="number" value={totalScore} onChange={(event) => setTotalScore(event.target.value)} />
        </Form.Group>
  
        <Form.Group controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control as="select" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option value="easy">Easy</option>
            <option value="mid">Mid</option>
            <option value="hard">Hard</option>
          </Form.Control>
        </Form.Group>
  
        <Form.Group controlId="questions">
          <Form.Label>Questions</Form.Label>
          {questions.map((question, index) => (
            <Form.Group controlId={`question-${index}`} key={`question-${index}`}>
              <Form.Label>Question {index + 1}</Form.Label>
              <Form.Control type="text" name="header" placeholder="Question Header" value={question.header} onChange={(event) => handleQuestionChange(event, index)} />
              <Form.Control type="number" name="rank" placeholder="Question Rank" value={question.rank} onChange={(event) => handleQuestionChange(event, index)} />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={handleAddQuestion}>Add Question</Button>
        </Form.Group>
  
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    );
  }
  
  export default ExamForm;
  