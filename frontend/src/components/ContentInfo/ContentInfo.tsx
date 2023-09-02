import React from 'react';
import { useContentInfo } from "../../hooks/contentInfo/useContentInfo";
import { Link, useNavigate } from 'react-router-dom';
import style from './lib/contentInfo.module.css';
import { useContentDelete } from "../../hooks/contentDelete/useContentDelete";

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
        <li key={contentInfo?.id}>
          <h2 className={style.contentInfoItem}>{contentInfo?.title}</h2>
          <p className={style.contentInfoItem}>{contentInfo?.content}</p>
          <button onClick={() => handleEditClick(contentInfo?.id)} className={style.contentInfoItem}>수정</button>
          <button onClick={handleDelete} className={style.contentInfoItem}>삭제</button>
        </li>
      </ul>
    </div>
  );
}

export default ContentInfo;
