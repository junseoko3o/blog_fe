import { useContentInfo } from "../../hooks/contentInfo/useContentInfo";
import Styles from './lib/contentInfo.module.css';

const ContentInfo = () => {
  const { contentInfo }  = useContentInfo();

  return (
    <div className={Styles.contentListContainer}>
      <p>My Content</p>
        <ul>
          {contentInfo.map(content => (
            <li key={content.id}>
              <h2 className={Styles.contentListItem}>{content.title}</h2>
            </li>
          ))}
        </ul>
    </div>
  );
}
export default ContentInfo