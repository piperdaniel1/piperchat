import { useState } from 'react';
import './Chat.css';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const API_URL = 'http://192.168.10.14:3000';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender}-message`}>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};


const Chat = () => {
  const messages = [
  ];

  const [messageList, setMessageList] = useState(messages);

  async function getNextResponse(newList) {
    // post request
    const messages = newList.map((message) => message.text);
    const response = await fetch(`${API_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    
    const newNewList = [...newList];
    newNewList.push({
      text: (await response.json()).response,
      sender: 'ai',
    });
    setMessageList(newNewList);
  }

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
        onKeyDown={async (event) => {
          if (event.key === 'Enter' && !event.shiftKey && (messageList.length === 0 || messageList[messageList.length - 1].sender !== 'user')) {
            
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
            await getNextResponse(newMessageList);
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
