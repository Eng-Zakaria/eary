import React, { useState } from 'react';

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  let mediaRecorder = null;

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener('dataavailable', event => {
      setAudioChunks(audioChunks => [...audioChunks, event.data]);
    });

    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('Recorded audio:', audioUrl);
      setAudioChunks([]);
    });

    mediaRecorder.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
}

export default AudioRecorder;