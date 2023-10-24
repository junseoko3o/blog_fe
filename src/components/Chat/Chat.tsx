import React, { useEffect, useRef } from 'react';
import useHeartAnimation from 'hooks/useHeartAnimation';
import styles from './lib/chat.module.css';
import useChat from "hooks/useChat";

const Chat = () => {
  useHeartAnimation();
  const { user, messages, message, handleInputChange, handleKeyPress, sendMessage, messageEndRef } = useChat();

  return (
    <div>
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {messages.map((e, i) => (
          <div key={i}>
            {e.userId !== user.id && <span className={styles.userName}>{e.name}</span>}
            <div className={`${styles.message} ${e.userId === user.id ? styles.user : styles.response}`}>
              {e.message}
            </div>
          </div>
        ))}
      </div>
      <div ref={messageEndRef}></div>

    </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chat;