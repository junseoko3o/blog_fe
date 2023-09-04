import React from 'react';
import { Link } from 'react-router-dom';
import { useContentList } from 'hooks/contentsList/useContentsList';
import moment from 'moment';
import styles from './lib/contentList.module.css';

const ContentList = () => {
  const { contentList } = useContentList();
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.no}>No.</th>
            <th className={styles.title}>Title</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contentList.map((content, index) => (
            <tr key={content.id}>
              <td>{index + 1}</td> 
              <td className={styles.centerAlign}>
                <Link to={`/content/${content.id}`} className={styles.link}>
                  {content.title.length > 50 ? content.title.slice(0, 50) + '...' : content.title}
                </Link>
              </td>
              <td className={styles.username}>{content.user_name}</td>
              <td className={styles.updateAt}>{moment(content.updated_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ContentList;
