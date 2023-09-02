import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../store/store";
import { contentPost } from "./interface";
import api from "../../api/api";

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

    try {
      const response = await api.post("/content", contentPostData);
      setTitle("");
      setContent("");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return { user, title, setTitle, content, setContent, postContent };
};
