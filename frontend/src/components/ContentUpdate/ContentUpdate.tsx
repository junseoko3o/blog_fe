import React from 'react';
import { useContentUpdate } from 'hooks/contentUpdate/useContentUpdate';
import styles from './lib/contentUpdate.module.css'; 

const ContentUpdate = () => {
  const { contentUpdate, handleInputChange, handleSubmit } = useContentUpdate();

  return (
    <div className={styles.contentUpdateContainer}>
      <h2 className={styles.contentUpdateUser}>Update</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={contentUpdate.title}
            onChange={handleInputChange}
            required
            className={styles.contentUpdateInput}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={contentUpdate.content}
            onChange={handleInputChange}
            required
            className={styles.contentUpdateTextarea}
          />
        </div>
        <button type="submit" className={styles.contentUpdateButton}>업데이트</button>
      </form>
    </div>
  );
};

export default ContentUpdate;
