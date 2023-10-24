import React from 'react';
import { Button, Input, Row, Col } from 'antd';
import { useParams } from 'react-router';
import styles from './lib/comment.module.css';
import useCommentPost from 'hooks/useComment/commentPost';

const CommentPost = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { comment, setComment, handleCreatePost} = useCommentPost(contentId);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a new comment"
          className={styles.inputField}
        />
        <Button type='primary' onClick={handleCreatePost} className={styles.postButton}>
        Post
        </Button>
      </div>
    </div>
  );
};

export default CommentPost;
