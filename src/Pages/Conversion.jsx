import React from 'react';
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { FaRobot } from 'react-icons/fa';

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
        Audio Play
        <audio />
      </div>
    </div>
  );
}

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      <div className={`message-icon ${sender}`}>
        {sender === 'bot' ? <FaRobot /> : <AiOutlineUser />}
      </div>
      <div className="message-text">{text}</div>
    </div>
  );
};

export default Conversion;
