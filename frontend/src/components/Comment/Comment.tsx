import React, { useEffect, useState } from 'react';
import { List, Button, Input, Row, Col } from 'antd';
import { useCommentList } from 'hooks/commentList/useCommentList';
import moment from 'moment';
import { userCommentPost } from 'hooks/commentPost/useCommentPost';

const Comment = () => {
  const { user, commentList } = useCommentList();
  const { comment, setComment, handleCreatePost} = userCommentPost();
  const [editingIndex, setEditingIndex] = useState(-1);
  const handleUpdateClick = (index: any) => {
    setEditingIndex(index);
  }

  // const handleSaveClick = (index: any) => {
  //   const newComments = [...comments];
  //   newComments[index].comment = comments[index].comment;
  //   setComments(newComments);
  //   setEditingIndex(-1);
  // }

  // const handleCommentInputChange = (e: any, index: any) => {
  //   const newComments = [...comments];
  //   newComments[index].comment = e.target.value;
  //   setComments(newComments);
  // };

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
        renderItem={(comment, index) => (
          <List.Item>
            <div style={{ width: '100%' }}>
              {editingIndex === index ? (
                <>
                  <Input
                    // value={comment.comment}
                    // onChange={(e) => {handleCommentInputChange(e, index)} }
                  />
                  <Button type="primary" /> 
                </>
              ) : (
                <>
                  <p>{comment.comment}</p>
                  <p>작성자: {comment.user_name} 작성시간: {moment(comment.updated_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <Button type="primary" onClick={() => handleUpdateClick(index)}>
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
