import React from 'react';
import { Input, Button } from 'antd';
import { useParams } from 'react-router';
import { useContentUpdate } from 'hooks/useContent/contentUpdate/useContentUpdate';
import styles from './lib/contentUpdate.module.css';

const ContentUpdate = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { title, setTitle, content, setContent, handledUpdateContent } = useContentUpdate(contentId);

  return (
    <>
      <h2>Update</h2>
        <div>
          <label htmlFor="title">제목</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <Input.TextArea
            id="content"
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            placeholder="Content"
            rows={20}
          />
        </div>
        <Button type="primary" htmlType="submit" onClick={e => handledUpdateContent(1)} className={styles.button}>
          Submit
        </Button>
    </>
  );
};

export default ContentUpdate;
