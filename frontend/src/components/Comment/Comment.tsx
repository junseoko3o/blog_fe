import React, { useState } from 'react';
import { List, Button, Input, Row, Col } from 'antd';
import { useCommentList } from 'hooks/commentList/useCommentList';
import moment from 'moment';
import { userCommentPost } from 'hooks/commentPost/useCommentPost';
import styles from './lib/comment.module.css';

const Comment = () => {
  const { user, commentList } = useCommentList();
  const { comment, setComment, handleCreatePost} = userCommentPost();
  const [editingIndex, setEditingIndex] = useState(-1);

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
            <div >
                <>
                  <p className={styles.comment}>{comment.comment}</p>
                  <p className={styles.info}>User: {comment.user_name} | Time: {moment(comment.updated_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <Button type="primary" className={styles.updateButton}>
                    Update
                  </Button>
                    <Button type="primary" className={styles.deleteButton}>
                      Delete
                    </Button>
                </>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Comment;
