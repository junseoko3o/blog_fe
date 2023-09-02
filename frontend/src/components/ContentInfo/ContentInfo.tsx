import React from 'react';
import { useContentInfo } from '../../hooks/contentInfo/useContentInfo';
import { Link, useNavigate } from 'react-router-dom';
import style from './lib/contentInfo.module.css';
import { useContentDelete } from '../../hooks/contentDelete/useContentDelete';

const ContentInfo = () => {
  const { contentInfo } = useContentInfo();
  const { handleDelete } = useContentDelete();
  const navigate = useNavigate();

  const handleEditClick = (id: any) => {
    navigate(`/content/edit/${id}`);
  };

  return (
    <div className={style.contentInfoContainer}>
      <ul>
        <li key={contentInfo?.id} className={style.contentInfoItem}>
          <h2 className={style.contentTitle}>{contentInfo?.title}</h2>
          <p className={style.content}>{contentInfo?.content}</p>
          <div className={style.buttonContainer}>
            <button onClick={() => handleEditClick(contentInfo?.id)} className={style.editButton}>
              수정
            </button>
            <button onClick={handleDelete} className={style.deleteButton}>
              삭제
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContentInfo;
