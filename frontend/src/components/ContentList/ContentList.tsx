import React from 'react';
import { Link } from 'react-router-dom';
import { useContentList } from 'hooks/contentsList/useContentsList';
import styles from './lib/contentList.module.css';

const ContentList = () => {
  const { contentList, loading } = useContentList();

  return (
    <div className={styles.contentListContainer}>
      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : (
        <ul className={styles.contentList}>
          {contentList.map((content) => (
            <li key={content.id} className={styles.contentListItem}>
              <Link to={`/content/${content.id}`} className={styles.link}>
                <h2 className={styles.contentTitle}>{content.title}</h2>
              </Link>
              <p className={styles.userInfo}>User: {content.user_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContentList;
