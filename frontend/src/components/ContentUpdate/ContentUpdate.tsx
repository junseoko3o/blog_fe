import React from 'react';
import { Input, Button, Typography } from 'antd';
import { useContentUpdate } from 'hooks/contentUpdate/useContentUpdate';
import styles from './lib/contentUpdate.module.css';

const { Text } = Typography;

const ContentUpdate = () => {
  const { contentUpdate, handleInputChange, handleSubmit } = useContentUpdate();

  return (
    <div>
      <h2>Update</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={contentUpdate.title}
            onChange={handleInputChange}
            required
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <Input.TextArea
            id="content"
            name="content"
            value={contentUpdate.content}
            onChange={handleInputChange}
            required
            placeholder="Content"
            rows={20}
          />
        </div>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContentUpdate;
