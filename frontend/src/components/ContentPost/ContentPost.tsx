import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useContentPost } from '../../hooks/contentPost/useContentPost';
import { authenticatedUserState } from '../../hooks/store/store';
import { contentPost } from '../../hooks/contentPost/interface';

const ContentPost = () => {
  const user = useRecoilValue(authenticatedUserState);
  const { createContentPost } = useContentPost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    const contentPost: contentPost = {
      title,
      content,
      created_user_id: user.id,
    };

    try {
      await createContentPost(contentPost);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default ContentPost;
