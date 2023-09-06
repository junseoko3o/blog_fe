import api from "api/api";
import { useContentInfo } from "hooks/contentInfo/useContentInfo";
import { authenticatedUserState } from "hooks/store/store";
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { message } from 'antd';
import { CommentList } from "./interface";

export const useCommentList = () => {
  const user = useRecoilValue(authenticatedUserState);
  const contents = useContentInfo();
  const [commentList, setCommentList] = useState<CommentList[]>([]); 
  useEffect(() => {
    const fetchData = async () => {
      await api.get<CommentList[]>(`/comment/content/${contents.id}`)
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
  }, [contents.id]);

  return { user, commentList }
}