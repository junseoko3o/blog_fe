import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../store/store";
import { ContentPost } from "./interface";
import api from "../../api/api";
import { message } from 'antd';
import { useNavigate } from "react-router";

export const useContentPost = () => {
  const user = useRecoilValue(authenticatedUserState);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postContent = async () => {
    const contentPostData: ContentPost = {
      title,
      content,
      created_user_id: user.id,
    };
    
    await api.post("/content", contentPostData)
      .then(response => {
        setTitle("");
        setContent("");
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
