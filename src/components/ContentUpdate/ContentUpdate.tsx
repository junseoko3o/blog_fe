import React from 'react';
import { Input, Button } from 'antd';
import { useParams } from 'react-router';
import styles from './lib/contentUpdate.module.css';
import useContentUpdate from 'hooks/useContent/contentUpdate';

const ContentUpdate = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { title, setTitle, content, setContent, handledUpdateContent, cancelUpdate } = useContentUpdate(contentId);

  return (
    <>
      <div className={styles.container}>
        <h2>Update</h2>
          <div>
            <label htmlFor="title">Title</label>
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
          <label htmlFor="content">Content</label>
          <Input.TextArea
            id="content"
            className={styles.text}
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            placeholder="Content"
            rows={20}
          />
        <Button type="primary" htmlType="submit" onClick={e => handledUpdateContent(contentId)} className={styles.button}>
          Submit
        </Button>
        <Button  className={styles.cancelButton} onClick={e => cancelUpdate(contentId)}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default ContentUpdate;
