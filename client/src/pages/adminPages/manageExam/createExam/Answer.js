import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./style/response.css";

function Answer({ question, onQuestionChange, index, selectedOption, onOptionChange  }) {
  const handleChoiceChange = (choiceIndex, event) => {
    const updatedChoices = [...question.choices];
    updatedChoices[choiceIndex] = {
      ...updatedChoices[choiceIndex],
      label: event.target.value,
    };
    const updatedQuestion = { ...question, choices: updatedChoices };
    onQuestionChange(index, updatedQuestion);
  };

  const handleAddChoice = () => {
    if (question.choices.length < 5) {
      const updatedChoices = [...question.choices, { label: "" }];
      const updatedQuestion = { ...question, choices: updatedChoices };
      onQuestionChange(index, updatedQuestion);
    }
  };

  const handleDeleteChoice = (choiceIndex) => {
    const updatedChoices = question.choices.filter(
      (choice, index) => index !== choiceIndex
    );
    const updatedQuestion = { ...question, choices: updatedChoices };
    onQuestionChange(index, updatedQuestion);
  };

  return (
    <div className="question-choices">
      <ul className="question-choices-list">
        {question.choices.map((choice, choiceIndex) => (
          <li classname="choice" key={choiceIndex}>
            <input className="choice-radio-button"
              type="radio"
              id={`choice-${index}`}
              // checked={selectedOption === choice}
              value={choice}
              name={`question-${index}`} 
              // onChange={onOptionChange}
              />
              
            <input className="choice-text"
              type="text" 
              value={choice.label}
              
              onChange={(event) => handleChoiceChange(choiceIndex, event)}
            />
            <button onClick={() => handleDeleteChoice(choiceIndex)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </li>
        ))}
      </ul>
      <button className="add-answer" onClick={handleAddChoice}>
        Add Answer
      </button>
    </div>
  );
}

export default Answer;
