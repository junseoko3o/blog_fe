import api from "api/api";
import { useContentInfo } from "hooks/contentInfo/useContentInfo";
import { authenticatedUserState } from "hooks/store/store"
import { useState } from "react";
import { useRecoilValue } from "recoil"
import { message } from 'antd';
import { CommentPost } from "./interface";

export const userCommentPost = () => {
  const user = useRecoilValue(authenticatedUserState);
  const content = useContentInfo();
  const contentId = content.id ? parseInt(content.id) : 0;
  const [comment, setComment] = useState("");

  const postComment = async () => {
    const commentPost: CommentPost = {
      comment,
      content_id: contentId,
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