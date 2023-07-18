import { useState } from 'react';
import './Chat.css';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender}-message`}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

const Chat = () => {
  const messages = [
    {
      text: 'Hello, how can I help you today?',
      sender: 'ai',
    },
  ];

  const [messageList, setMessageList] = useState(messages);

  return (
  <div className='outer-chat-container'>
    <div className="chat-container">
    <header>
      <h1>PiperChat</h1>
      {/* <button>Login / Signup</button> */}
    </header>
    <div className="message-container">
      {messageList.map((message, index) => (
        <Message key={index} text={message.text} sender={message.sender} />
      ))}
    </div>
    <div className="input-container">
      <textarea
        type="text"
        placeholder="Type your message here"
        id="message-input"
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            // Handle enter key press
            console.log('Enter key pressed');
            event.preventDefault();
            const newMessageList = [...messageList];
            newMessageList.push({
              text: event.target.value,
              sender: 'user',
            });
            setMessageList(newMessageList);
            event.target.value = '';
            // send to backend
          } else if (event.key === 'Enter' && event.shiftKey) {
            // Handle shift+enter key press
            console.log('Shift+Enter key pressed');
          }
        }}
      />
      <button>Send</button>
    </div>
    </div>
  </div>
  );
};

export default Chat;