import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import io from 'socket.io-client';
import { authenticatedUserState } from "hooks/store/store";
import { Message } from "./lib/interface";
import useSwr from 'swr';

const api = process.env.REACT_APP_SERVER_API || '';
const socket = io(api);

const useChat = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const { data, error } = useSwr(`/chat/list`);
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
    if (socket) {
      socket.on('message', (newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }
    return () => {
      if (socket) {
        socket.off('message');
      }
    };
  }, [data, socket]);

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

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return { user, message, setMessage, messages, sendMessage, handleKeyPress, handleInputChange, messageEndRef };
}

export default useChat;
