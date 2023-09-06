import React, { useState } from 'react';
import { List, Button, Input, Row, Col } from 'antd';

const Comment = () => {
  const [comments, setComments] = useState([
    {
      comment: 'This is the first comment',
      user: 'User1',
      datetime: '2023-09-06 10:00 AM',
    },
    {
      comment: 'This is the second comment',
      user: 'User2',
      datetime: '2023-09-06 11:30 AM',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(-1);

  const handleUpdateClick = (index: any) => {
    setEditingIndex(index);
  }

  const handleSaveClick = (index: any) => {
    const newComments = [...comments];
    newComments[index].comment = comments[index].comment;
    setComments(newComments);
    setEditingIndex(-1);
  }

  const handleCommentInputChange = (e: any, index: any) => {
    const newComments = [...comments];
    newComments[index].comment = e.target.value;
    setComments(newComments);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Input
            placeholder="Add a new comment"
          />
        </Col>
        <Col span={6}>
          <Button type="primary">
            Add Comment
          </Button>
        </Col>
      </Row>
      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length === 1 ? 'Comment' : 'Comments'}`}
        itemLayout="horizontal"
        renderItem={(comment, index) => (
          <List.Item>
            <div style={{ width: '100%' }}>
              {editingIndex === index ? (
                <>
                  <Input
                    value={comment.comment}
                    onChange={(e) => {handleCommentInputChange(e, index)} }
                  />
                  <Button type="primary" onClick={() => handleSaveClick(index)}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p>{comment.comment}</p>
                  <p>작성자: {comment.user} 작성시간: {comment.datetime}</p>
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
