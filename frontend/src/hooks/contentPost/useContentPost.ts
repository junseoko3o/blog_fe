import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../store/store";
import { contentPost } from "./interface";
import api from "../../api/api";
import { message } from 'antd';

export const useContentPost = () => {
  const user = useRecoilValue(authenticatedUserState);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postContent = async () => {
    const contentPostData: contentPost = {
      title,
      content,
      created_user_id: user.id,
    };

    await api.post("/content", contentPostData)
      .then(response => {
        setTitle("");
        setContent("");
        message.success('생성이 완료되었습니다.');
        return response.data;
      })
      .catch(err => {
        message.error('생성 실패');
      })
  };

  return { user, title, setTitle, content, setContent, postContent };
};
