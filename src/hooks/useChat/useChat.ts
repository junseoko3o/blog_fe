import { useState } from "react";

const useChat = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<{ text: string; isUser: boolean }[]>([]);
  const [responses, setResponses] = useState<string>('response');


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newChatEntry = { text: message, isUser: true };
      const responseEntry = { text: responses, isUser: false };
      setChat(prevChat => [...prevChat, newChatEntry, responseEntry]);
      setMessage('');
    }
  };

  return { message, chat, responses, handleInputChange, handleSendMessage }
}

export default useChat;