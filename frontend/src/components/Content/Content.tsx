import { useContentList } from "../../hooks/contentsList/useContentsList"

const Content = () => {
  const { contentList, loading } = useContentList();

  return (
    <div>
      <h1>Content List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {contentList.map((content) => (
            <li key={content.id}>
              <h2>{content.title}</h2>
              <p>{content.content}</p>
              <p>User: {content.user_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Content