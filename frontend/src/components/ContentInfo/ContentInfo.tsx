import { useContentInfo } from "../../hooks/contentInfo/useContentInfo";
import Styles from './lib/contentInfo.module.css';

const ContentInfo = () => {
  const { contentInfo }  = useContentInfo();

  return (
    <div className={Styles.contentListContainer}>
      <p>My Content</p>
        <ul>
          <li key={contentInfo?.id}>
            <h2 className={Styles.contentListItem}>{contentInfo?.title}</h2>
          </li>
        </ul>
    </div>
  );
}
export default ContentInfo