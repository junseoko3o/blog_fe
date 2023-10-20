import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from 'socket.io-client';
import { authenticatedUserState } from "hooks/store/store";
import { Message } from "./lib/interface";

const api = process.env.REACT_APP_SERVER_API || '';
const socket = io(api);

const useChat = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (data: Message) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (user && user.id && message.trim() !== '') {
      const createChatDto: Message = {
        userId: user.id,
        name: user.user_name,
        message: message
      };
      socket.emit('message', createChatDto);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  return { user, message, setMessage, messages, sendMessage, handleKeyPress, handleInputChange };
}

export default useChat;
