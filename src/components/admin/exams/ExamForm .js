import React, { useState } from "react";
import "./exam.css";

const ExamForm = () => {
  const [formValues, setFormValues] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit form values to API or database
    console.log(formValues);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newFormValues = [...formValues];
    newFormValues[index] = { ...newFormValues[index], [name]: value };
    setFormValues(newFormValues);
  };

  const handleAddQuestion = () => {
    setFormValues([...formValues, { question: "", options: [] }]);
  };

  const handleAddOption = (index) => {
    const newFormValues = [...formValues];
    newFormValues[index].options.push("");
    setFormValues(newFormValues);
  };

  const handleRemoveQuestion = (index) => {
    const newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const newFormValues = [...formValues];
    newFormValues[questionIndex].options.splice(optionIndex, 1);
    setFormValues(newFormValues);
  };

  return (
    <form className="exam-form" onSubmit={handleSubmit}>
      <h1>Create Exam</h1>
      {formValues.map((formValue, questionIndex) => (
        <div key={questionIndex} className="question">
          <input
            type="text"
            name={`question-${questionIndex}`}
            placeholder="Enter Question"
            value={formValue.question}
            onChange={(event) => handleInputChange(event, questionIndex)}
          />
          {formValue.options.map((optionValue, optionIndex) => (
            <div key={optionIndex} className="option">
              <input
                type="text"
                name={`option-${questionIndex}-${optionIndex}`}
                placeholder="Enter Option"
                value={optionValue}
                onChange={(event) => handleInputChange(event, questionIndex)}
              />
              <button
                type="button"
                className="remove-option"
                onClick={() => handleRemoveOption(questionIndex, optionIndex)}
              >
                Remove Option
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-option"
            onClick={() => handleAddOption(questionIndex)}
          >
            Add Option
          </button>
          <button
            type="button"
            className="remove-question"
            onClick={() => handleRemoveQuestion(questionIndex)}
          >
            Remove Question
          </button>
        </div>
      ))}
      <button
        type="button"
        className="add-question"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
};

export default ExamForm;
