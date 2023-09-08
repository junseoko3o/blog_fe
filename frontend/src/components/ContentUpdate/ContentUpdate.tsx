import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useParams } from 'react-router';
import { useContentUpdate } from 'hooks/useContent/contentUpdate/useContentUpdate';
import styles from './lib/contentUpdate.module.css';

const ContentUpdate = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { title, setTitle, content, setContent, handledUpdateContent, cancelUpdate } = useContentUpdate(contentId);

  return (
    <>
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
        <div>
          <label htmlFor="content">Content</label>
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
        <Button type="primary" htmlType="submit" onClick={e => handledUpdateContent(contentId)} className={styles.button}>
          Submit
        </Button>
        <Button  className={styles.cancelButton} onClick={e => cancelUpdate(contentId)}>
          Cancel
        </Button>
    </>
  );
};

export default ContentUpdate;
