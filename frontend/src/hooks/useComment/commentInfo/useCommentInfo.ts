import api from "api/api";
import { useState } from "react";
import { message } from 'antd';

export const useCommentInfo = (commentId: number) => {
  const [detailComment, setDetailComment] = useState();
  const fetchData = async (commentId: number) => {
    await api.get(`/comment/list/${commentId}`)
      .then((response) => {
        setDetailComment(response.data);
        return response.data;
      })
      .catch((error) => {
        message.error('문제있음');
      });
    }
    fetchData(commentId);
  return { detailComment, setDetailComment }
}