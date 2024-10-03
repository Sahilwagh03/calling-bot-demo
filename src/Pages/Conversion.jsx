import React, { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { FaPlay, FaPause } from "react-icons/fa";
import { RiRobot3Line } from "react-icons/ri";
import WavesurferPlayer from '@wavesurfer/react';

const Conversion = () => {
  const messagesData = [
    { text: "Hello! How can I assist you today?", sender: "bot" },
    { text: "Hi! I need help with my order.", sender: "human" },
    { text: "Of course! What seems to be the issue with your order?", sender: "bot" },
    { text: "I received the wrong item.", sender: "human" },
    { text: "I'm sorry to hear that. Can you provide your order number?", sender: "bot" },
    { text: "Yes, it's #12345.", sender: "human" },
    { text: "Thank you! I'll look that up for you.", sender: "bot" },
    { text: "When can I expect a replacement?", sender: "human" },
    { text: "We can send a replacement by tomorrow.", sender: "bot" },
    { text: "Great! Thank you for your help!", sender: "human" },
    { text: "You're welcome! Is there anything else I can assist you with?", sender: "bot" },
    { text: "No, that's all for now.", sender: "human" },
    { text: "Alright! Have a wonderful day!", sender: "bot" },
    { text: "You too! Bye!", sender: "human" },
    { text: "Goodbye! Feel free to reach out anytime.", sender: "bot" },
  ];

  const handleClose = () => {
    console.log("Chatbot closed");
  };

  return (
    <div className='chatbot-wrapper'>
      <div className="chatbot-container">
        <h2 className="chat-header">
          Conversion
          <button className="close-button" onClick={handleClose}>
            <AiOutlineClose />
          </button>
        </h2>
        <div className="sticky-message">
          <div className='stats'>
            <span>Intend as positive</span>
          </div>
        </div>
        <div className="chat-messages custom-scrollbar">
          {messagesData.map((msg, index) => (
            <Message key={index} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <div className="chatbot-footer">
          <AudioPlayer />
        </div>
      </div>
    </div>
  );
};

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      <div className={`message-icon ${sender}`}>
        {sender === 'bot' ? <RiRobot3Line /> : <AiOutlineUser />}
      </div>
      <div className="message-text">{text}</div>
    </div>
  );
};

const AudioPlayer = () => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const onReady = (ws) => {
    setWavesurfer(ws);
    setDuration(ws.getDuration());
    setIsPlaying(false);
  };

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });

      wavesurfer.on('ready', () => {
        setDuration(wavesurfer.getDuration());
      });

      return () => {
        wavesurfer.un('audioprocess');
        wavesurfer.un('ready');
      };
    }
  }, [wavesurfer]);

  const onPlayPause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div className='audio-player-container'>
      <button className='play-pause-btn' onClick={onPlayPause}>
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
      <WavesurferPlayer
        height={30}
        url="/demo.mp3"
        waveColor="#34374B"
        progressColor="#956afa"
        width="30vw"
        dragToSeek={true}
        hideScrollbar={true}
        normalize={true}
        barGap={1}
        barHeight={5}
        barRadius={20}
        barWidth={3}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className='time-info'>
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </div>
  );
};


export default Conversion;
