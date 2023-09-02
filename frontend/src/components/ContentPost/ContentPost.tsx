import React from "react";
import { useContentPost } from "hooks/contentPost/useContentPost";
import styles from "./lib/contentPost.module.css";

function YourComponent() {
  const { user, title, setTitle, content, setContent, postContent } = useContentPost();

  const handleCreatePost = async () => {
    await postContent();
  };

  return (
    <div className={styles.contentPostContainer}>
      <div className={styles.contentPostUser}>
        User ID: {user.user_name}
      </div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.contentPostInput}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.contentPostTextarea}
      />
      <button onClick={handleCreatePost} className={styles.contentPostButton}>
        Create Post
      </button>
    </div>
  );
}

export default YourComponent;
