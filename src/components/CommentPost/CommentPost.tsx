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
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Input
            type='text'
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a new comment"
          />
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={handleCreatePost} className={styles.postButton}>
            Add Comment
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CommentPost;
