import api from "api/api";
import { authenticatedUserState } from "hooks/store/store"
import { useState } from "react";
import { useRecoilValue } from "recoil"
import { message } from 'antd';
import { CommentPost } from "./interface";

export const useCommentPost = () => {
  const user = useRecoilValue(authenticatedUserState);
  const [comment, setComment] = useState("");

  const postComment = async () => {
    const commentPost = {
      comment,
      // content_id: contentId,
      created_user_id: user.id,
    };

    await api.post("/comment", commentPost)
    .then(response => {
      setComment("");
      message.success('생성이 완료되었습니다.');
      return response.data;
    })
    .catch(err => {
      message.error('생성 실패');
    })
 };

  const handleCreatePost = async () => {
    await postComment();
  };

 return { comment, setComment, handleCreatePost }
}