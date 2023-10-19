import styles from './lib/chat.module.css';
import useChat from "hooks/useChat";

const Chat = () => {
  const { user, messages, message, handleInputChange, handleKeyPress, sendMessage } = useChat();
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.userId === user.id ? styles.user : styles.response
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chat;
