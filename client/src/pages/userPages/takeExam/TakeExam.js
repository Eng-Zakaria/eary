import React, { useState, useEffect } from "react";
import axios from "axios";

import ExamHeader from "./ExamHeader";
import Question from "./Question";
import AudioFile from "./AudioFile";

function TakeExam(props) {
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExamData() {
      try {
        const response = await axios.get("/api/exam-data");
        setExamData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchExamData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ExamHeader examName={examData.examName} examDate={examData.examDate} />

      {examData.questions.map((question, index) => (
        <Question key={index} questionText={question.questionText} choices={question.choices} />
      ))}

      <AudioFile audioSrc={examData.audioSrc} />
    </div>
  );
}

export default TakeExam;