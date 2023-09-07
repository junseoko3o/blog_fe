import React, { useState } from 'react';
import { List, Button, Input, Row, Col } from 'antd';
import moment from 'moment';
import styles from './lib/comment.module.css';
import { useParams } from 'react-router';
import { useCommentList } from 'hooks/useComment/commentList/useCommentList';
import { useCommentPost } from 'hooks/useComment/commentPost/useCommentPost';
import { useCommentUpdate } from 'hooks/useComment/commentUpdate/useCommentUpdate';

const Comment = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { commentList } = useCommentList(contentId);
  const { comment, setComment, handleCreatePost} = useCommentPost();
  const [editingIndex, setEditingIndex] = useState(-1);
  const{ updateComment, setUpdateComment, hadledUpdateComment } = useCommentUpdate(contentId);

  const handleUpdateClick = (index: number) => {
    setEditingIndex(index);
  }

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
      <List
        dataSource={commentList}
        header={`${commentList.length} ${commentList.length === 1 ? 'Comment' : 'Comments'}`}
        itemLayout="horizontal"
        renderItem={(comment) => (
          <List.Item>
          <div key={comment.id} className={styles.div}>
            {editingIndex === comment.id ? (
              <>
                <Input
                  type="text"
                  id="comment"
                  name="comment"
                  value={updateComment}
                  onChange={e => setUpdateComment(e.target.value)} 
                />
                <Button type="primary"
                 onClick={() => hadledUpdateComment(comment.id)}
                >
                  Save
                </Button>
                <Button type="default" onClick={() => handleUpdateClick(-1)}>
                    Cancel
                </Button>
              </>
            ) : (
              <>
                <p>{comment.comment}</p>
                <p>작성자: {comment.user_name} 작성시간: {moment(comment.updated_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                <Button type="primary" 
                onClick={() => handleUpdateClick(comment.id)}
                >
                  Update
                </Button>
                <Button type="primary">
                  Delete
                </Button>
              </>
            )}
          </div>
        </List.Item>
        )}
      />
    </div>
  );
};

export default Comment;
