import React from 'react';
import { Button, Input, Row, Col } from 'antd';
import { useCommentPost } from 'hooks/useComment/commentPost/useCommentPost';

const CommentPost = () => {
  const { comment, setComment, handleCreatePost} = useCommentPost();

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
          <Button type="primary" onClick={handleCreatePost}>
            Add Comment
          </Button>
        </Col>
      </Row>
  
    </div>
  );
};

export default CommentPost;
