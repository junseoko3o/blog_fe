import React from 'react';
import { Link } from 'react-router-dom';
import { useContentList } from 'hooks/contentsList/useContentsList';
import style from './lib/contentList.module.css';

const ContentList = () => {
  const { contentList, loading } = useContentList();

  return (
    <div className={style.contentListContainer}>
      {loading ? (
        <p className={style.loadingText}>Loading...</p>
      ) : (
        <ul className={style.contentList}>
          {contentList.map((content) => (
            <li key={content.id} className={style.contentListItem}>
              <Link to={`/content/${content.id}`} className={style.link}>
                <h2 className={style.contentTitle}>{content.title}</h2>
              </Link>
              <p className={style.userInfo}>User: {content.user_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContentList;
