import { authenticatedUserState } from "hooks/store/store";
import { UserAuthentication } from "hooks/useUser/athenticate";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');
const useChat = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', { user, message });
      setMessage('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return { user, message, setMessage, messages, sendMessage, handleInputChange }
}

export default useChat;