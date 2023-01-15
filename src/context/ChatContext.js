import React, {createContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import {BACKEND_ROOT} from '@env';

let socket; 
 
const ChatContext = createContext();

const ChatProvider = ({ children} ) => {

  const [chatMsgs, setChatMsgs] = useState([]);

  useEffect(() => {
    socket = io(BACKEND_ROOT);
  }, []);

  const addChatMsg = (msg, id) => {
    // const chatActualizado = [...chatMsgs, msg];
    // setChatMsgs(chatActualizado);

    // SOCKET
    socket.emit('nuevo msg', msg, id);
  }

  //Socket-io

  const actualizarChat = (msg) => {
    const chatActualizado = [...chatMsgs, msg];
    setChatMsgs(chatActualizado);
  }

  return (
    <ChatContext.Provider
      value={{
        chatMsgs,
        addChatMsg,
        actualizarChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider };

export default ChatContext;
