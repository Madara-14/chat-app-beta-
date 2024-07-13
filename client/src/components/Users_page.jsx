import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Users.css';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

function UserPage() {
  const [users, setUsers] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const user = location.state?.user;
  const username = user?.name;
  const newUserinfo = location.state?.info;
  console.log(newUserinfo);
  const socketRef = useRef(null);

  useEffect(() => {
    axios.get('https://chat-app-beta-backend.onrender.com/Users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    socketRef.current = io('https://chat-app-beta-backend.onrender.com/');

    socketRef.current.on('msg', (data) => {
      setMessages(prevMessages => [...prevMessages, { username: data.username, content: data.message }]);
      // console.log('bfore:',messages);
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (user) {
      // Fetch messages from the backend for the current user
      axios.get(`https://chat-app-beta-backend.onrender.com/messages/${user._id}`)
        .then(response => {
          const userMessages = response.data.map(msg => ({ username: msg.person, content: msg.content }));
          setMessages(userMessages);
        })
        .catch(error => {
          console.error('Error fetching user messages:', error);
        });
    }
  }, [user]);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    if (inputMessage.trim()) {
      try {
        const response = await axios.post('https://chat-app-beta-backend.onrender.com/messages', {
          userId: user._id,
          content: inputMessage,
          person: username
        });

       
       
        socketRef.current.emit('msg', { userId: user._id, username, message: inputMessage });
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
     console.log('msg:',messages);
  useEffect(() => {
    const messageContainer = document.getElementById('messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);


  return (
    <>
      <div className='user-container'>
        <h2 className='heading'>Users Available</h2>
        <ul className="user-list">
          {users.map(user => (
            <div key={user._id} className='username'>
              <li className="user-list-item">
                <strong></strong> {user.name}
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div className='chat-section'>
        <div className='chat-container'>
        <div className="header"><h2>Chat Interface</h2></div>
         <div className='new User info'><p>{newUserinfo}</p></div>
          <ul id="messages">
          {messages.map((msg, index) => (
         <li key={index} className="message-item" style={{ justifyContent: msg.username === username ? 'flex-end' : 'flex-start' }}>
            <div className={`message-content ${msg.username === username ? 'message-sent' : 'message-received'}`}>
         <strong>{msg.username}:</strong> {msg.content}
               </div>
              </li>
           ))}

          </ul>
        </div>

        <div className="msg-container">
          <form id="form" onSubmit={sendMessage}>
            <input
              id="input"
              autoComplete="off"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserPage;
