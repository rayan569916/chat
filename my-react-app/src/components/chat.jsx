import {useEffect, useState} from 'react';
import axios from "axios";
import { TEST_API_BACKEND,TEST_API_DB } from '../api';

function Chat() {
    const [chats,setChats]= useState(['']);

    useEffect(() => {
      testDB();  
    })
    const setChat = (e) =>{
        setChats(e.target.value);
    };
    const sendChat = async () => {
      try{
        const response=await axios.post(`${TEST_API_BACKEND}`, {chat: chats});
        console.log('API response:', response.data);
        setChats(['']);
      } catch (error) {
        console.error('Error sending chat:', error);
      };
    }
    const testDB = async () => {
      try{
        const response = await axios.get(TEST_API_DB);
        console.log('Database connectivity response:', response.data);
      } catch (error) {
        console.error('Error testing database connectivity:', error);
      }
    }


    return (
            <div className="terminal">
              <div className="terminal-header">
                <span className="led led-red" />
                <span className="led led-yellow" />
                <span className="led led-green" />
                <span className="title">/chat/terminal</span>
              </div>
              <div className="terminal-body" >
                  <div className="line">
                  </div>
              </div>
              <div className="terminal-input">
                <span className="prompt">{" > "}</span>
                <textarea
                  rows={1}
                  placeholder="type here and press Enter… (Shift+Enter for newline)"
                  onChange={setChat}
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