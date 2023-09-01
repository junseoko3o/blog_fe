import { useContentInfo } from "../../hooks/contentInfo/useContentInfo";
import style from './lib/contentInfo.module.css';

const ContentInfo = () => {
  const { contentInfo }  = useContentInfo();
  
  return (
    <div className={style.contentListContainer}>
      <p>My Content</p>
        <ul>
          <li key={contentInfo?.id}>
            <h2 className={style.contentListItem}>{contentInfo?.title}</h2>
            <p className={style.contentListItem}>{contentInfo?.content}</p>
          </li>
        </ul>
    </div>
  );
}
export default ContentInfo