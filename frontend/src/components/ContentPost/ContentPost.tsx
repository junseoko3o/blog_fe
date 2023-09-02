import React from 'react';
import { Input, Button, Typography } from 'antd';
import { useContentPost } from 'hooks/contentPost/useContentPost';
import styles from './lib/contentPost.module.css'

const { Text } = Typography;

const ContentPost = () => {
  const { user, title, setTitle, content, setContent, postContent } = useContentPost();

  const handleCreatePost = async () => {
    await postContent();
  };

  return (
    <div>
      <div style={{ color: 'navy' }}>
        Username: <Text strong>{user.user_name}</Text>
      </div>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <Input.TextArea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
        rows={20}
      />
      <Button type="primary" onClick={handleCreatePost} className={styles.button}>
        Submit
      </Button>
    </div>
  );
}

export default ContentPost;
