import React from 'react';
import { useContentInfo } from "../../hooks/contentInfo/useContentInfo";
import style from './lib/contentInfo.module.css';

const ContentInfo = () => {
  const { contentInfo }  = useContentInfo();

  return (
    <div className={style.contentInfoContainer}>
      <ul>
        <li key={contentInfo?.id}>
          <h2 className={style.contentInfoItem}>{contentInfo?.title}</h2>
          <p className={style.contentInfoItem}>{contentInfo?.content}</p>
        </li>
      </ul>
    </div>
  );
}

export default ContentInfo;
