import { Link } from "react-router-dom";
import { useContentList } from "hooks/contentsList/useContentsList"
import style from './lib/contentList.module.css';
// import { useRecoilValue } from "recoil";
// import { authenticatedUserState } from "hooks/store/store";

const ContentList = () => {
  // const user = useRecoilValue(authenticatedUserState);
  const { contentList, loading } = useContentList();

  return (
    <div className={style.contentListContainer}>
      <h1 className={style.contentListItem}>Content List</h1>
      {loading ? (
        <p className={style.contentListItem}>Loading...</p>
      ) : (
        <ul>
          {contentList.map((content) => (
            <li key={content.id}>
              <Link to={`/content/${content.id}`}>
                <h2 className={style.contentListItem}>{content.title}</h2>
              </Link>
              <p>User: {content.user_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ContentList