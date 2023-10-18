import { useState } from "react";
import styles from './lib/chat.module.css';
import useChat from "hooks/useChat";

const Chat = () => {
  const { chat, message, handleInputChange, handleSendMessage } = useChat();

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {chat.map((entry, index) => (
          <div key={index} className={`${styles.message} ${entry.isUser ? styles.user : styles.response}`}>
            {entry.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
};
export default Chat;