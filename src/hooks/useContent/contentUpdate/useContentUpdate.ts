import api from 'api/api';
import { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import { ContentUpdate } from "./lib/interface";
import { message } from 'antd';
import { authenticatedUserState } from 'hooks/store/store';
import useContentInfo from '../contentInfo';

const useContentUpdate = (contentId: number) => {
  const user = useRecoilValue(authenticatedUserState);
  const contents = useContentInfo(contentId);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  console.log(contentId);
  useEffect(() => {
    if (contents.contentInfo) {
      setTitle(contents.contentInfo.title || "");
      setContent(contents.contentInfo.content || "");
    }
  }, [contents.contentInfo]);

  const updateContent = async (id: number) => {
    if (user.id !== contents.contentInfo.created_user_id) {
      message.error('작성자가 아님');
    }
    const contentUpdate: ContentUpdate = {
      title,
      content,
      updated_user_id: user.id,
    }
      await api.post<ContentUpdate>(`/content/${id}`, contentUpdate)
      .then(response => {
        message.success('수정이 완료되었습니다.');
        navigate('/home');
        return response.data;
      })
      .catch(err => {
        message.error('수정을 실패하였습니다.');
      })
    };

    const handledUpdateContent = async (id: number) => {
      await updateContent(id);
    };

    const cancelUpdate = (id: number) => {
        navigate(`/content/${id}`)
    }
  

  return { user, title, setTitle, content, setContent, updateContent, handledUpdateContent, cancelUpdate };
};

export default useContentUpdate;