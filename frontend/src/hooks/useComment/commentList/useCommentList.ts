import api from "api/api";
import { authenticatedUserState } from "hooks/store/store";
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { message } from 'antd';
import { CommentList } from "./interface";

export const useCommentList = (contentId: number) => {
  const user = useRecoilValue(authenticatedUserState);
  const [commentList, setCommentList] = useState<CommentList[]>([]); 
  useEffect(() => {
    const fetchData = async () => {
      await api.get<CommentList[]>(`/comment/content/${contentId}`)
        .then(response => {
          setCommentList(response.data);
        })
        .catch(error => {
          if (error.response.status === 500) {
            message.error('server error');
          }
        })
      };
    fetchData();
  }, [contentId]);

  return { user, commentList }
}