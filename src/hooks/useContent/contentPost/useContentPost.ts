import { useState } from "react";
import { useRecoilValue } from "recoil";
import { ContentPost } from "./lib/interface";
import { message } from 'antd';
import { useNavigate } from "react-router";
import { authenticatedUserState } from "hooks/store/store";
import api from "api/api";
import { mutate } from "swr";

const useContentPost = () => {
  const user = useRecoilValue(authenticatedUserState);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const postContent = async () => {
    const contentPostData: ContentPost = {
      title,
      content,
      created_user_id: user.id,
    };
    
    await api.post<ContentPost>("/content", contentPostData)
      .then(response => {
        setTitle("");
        setContent("");
        mutate(`/content/list`);
        message.success('생성이 완료되었습니다.');
        navigate('/home');
        return response.data;
      })
      .catch(err => {
        message.error('생성 실패');
      })
  };

  const handleCreatePost = async () => {
    await postContent();
  };

  return { user, title, setTitle, content, setContent, handleCreatePost };
};

export default useContentPost;