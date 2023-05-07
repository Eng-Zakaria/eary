import React, { useState, useRef } from "react";
import "./style/question.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/question.css";
import Answer from "./Answer";

function Question({ index, question, onQuestionChange, onDeleteQuestion }) {
  const [audioFileName, setAudioFileName] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const audioRef = useRef(null);
  const uploadBtnRef = useRef(null);

  const handleQuestionTitleChange = (event) => {
    const updatedQuestion = { ...question, title: event.target.value };
    onQuestionChange(index, updatedQuestion);
  };

  const handleAudioFileChange = (event) => {
    const audioFile = event.target.files[0];
    if (!audioFile) {
      return;
    }
    const updatedQuestion = { ...question, audioFile };
    onQuestionChange(index, updatedQuestion);
    setAudioFileName(audioFile.name);
  };

  const handleAudioPlay = () => {
    if (!audioRef.current) {
      return;
    }
    if (audioRef.current.paused) {
      audioRef.current.play();
      setAudioPlaying(true);
    } else {
      audioRef.current.pause();
      setAudioPlaying(false);
    }
  };

  const handleAudioRecord = () => {
    if (!recording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const url = URL.createObjectURL(blob);
          const updatedQuestion = { ...question, audioFile: url };
          onQuestionChange(index, updatedQuestion);
          setAudioFileName("Recorded Audio");
        });
        mediaRecorder.start();
        setRecording(true);
      }).catch((error) => {
        console.error("Error recording audio:", error);
        setRecording(false);
      });
    } else {
      setRecording(false);
    }
  };

  const handleDeleteQuestion = () => {
    onDeleteQuestion(index);
  };

  return (
    <div className="question">
      <div className="question-header">
        <h2>
          {index + 1}){" "}
          <input
            type="text"
            value={question.title}
            onChange={handleQuestionTitleChange}
          />
        </h2>

        <div className="audio-container">
          {recording ? (
            <button className="record-btn" onClick={handleAudioRecord}>
              Stop Recording
            </button>
          ) : (
            <>
              <label htmlFor={`audio-file-${index}`} className="upload-btn" ref={uploadBtnRef}>
                {audioFileName || "Upload Audio File"}
              </label>
              <input
                type="file"
                id={`audio-file-${index}`}
                accept="audio/*"
                onChange={handleAudioFileChange}
                style={{ display: "none" }}
              />
              <button className="record-btn" onClick={handleAudioRecord}>
                Record Audio
              </button>
            </>
          )}
          <audio id={`audio-${index}`} src={question.audioFile} ref={audioRef} />
          <div
            className={`audio-icon${audioPlaying ? " playing" : ""}`}
            onClick={handleAudioPlay}
            aria-label={audioPlaying ? "Pause audio" : "Play audio"}
          >
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
          </div>
        </div>

        {onDeleteQuestion && (
          <button
            className="question-delete"
            onClick={handleDeleteQuestion}
            aria-label="Delete question"
            disabled={onDeleteQuestion.length === 1}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>

      <Answer
        question={question}
        onQuestionChange={onQuestionChange}
        index={index}
      />
    </div>
  );
}

export default Question;