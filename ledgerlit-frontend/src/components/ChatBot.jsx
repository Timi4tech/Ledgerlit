// client/src/components/ChatBot.jsx

import React, { useState } from 'react';
import axios from 'axios';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);

    const res = await axios.post('http://localhost:5000/api/chatbot/query', { message: input });
    setMessages(prev => [...prev, { text: res.data.reply, sender: 'bot' }]);
    setInput('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '10px', width: '300px', margin: '1rem auto' }}>
      <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p><strong>{msg.sender === 'user' ? 'You' : 'LedgerBot'}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={sendMessage} style={{ width: '18%', marginLeft: '2%', padding: '0.5rem' }}>Send</button>
    </div>
  );
}

export default ChatBot;
