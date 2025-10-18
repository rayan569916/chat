import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { BASE_URL } from '../api';

function Chat() {
  const [chats, setChats] = useState('');
  const [receiveChats, setReceiveChats] = useState([]);
  const username = localStorage.getItem('username');
  const accessToken = localStorage.getItem('accessToken');
  const toUser = localStorage.getItem('ToUser');

const socket = io(BASE_URL, {
  query: { token: accessToken },
  transports: ['websocket', 'polling'], // fallback to polling
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err);
});

  useEffect(() => {
    socket.emit("join", { username });

    socket.on("receive_message", (data) => {
      // ensure JSON decoding
      const message = typeof data === "string" ? JSON.parse(data) : data;
      setReceiveChats((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  const sendChat = () => {
    const chatPayload = {
      sendUser: username,
      recieverUser: toUser,
      message: chats,
    };
    socket.emit("send_message", chatPayload);
    setChats('');
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="led led-red" />
        <span className="led led-yellow" />
        <span className="led led-green" />
        <span className="title">/chat/terminal</span>
      </div>

      <div className="terminal-body">
        {receiveChats.map((m, i) => (
          <div key={i}>
            <b>{m.sendUser === username ? "Me" : m.sendUser}:</b> {m.message}
          </div>
        ))}
      </div>

      <div className="terminal-input">
        <span className="prompt">{"> "}</span>
        <textarea
          rows={1}
          placeholder="Type here and press Enter"
          onChange={(e) => setChats(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendChat();
            }
          }}
          value={chats}
        />
      </div>
    </div>
  );
}

export default Chat;
