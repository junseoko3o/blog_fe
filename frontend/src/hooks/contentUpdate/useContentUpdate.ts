import { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../store/store";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router";
import { ContentUpdate } from "./interface";
import { message } from 'antd';
import { useContentInfo } from 'hooks/contentInfo/useContentInfo';

export const useContentUpdate = () => {
  const user = useRecoilValue(authenticatedUserState);
  const contents = useContentInfo();
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    if (contents.contentInfo) {
      setTitle(contents.contentInfo?.title || "");
      setContent(contents.contentInfo?.content || "");
    }
  }, [contents.contentInfo, id]);

  const updateContent = async () => {
    if (user.id !== contents.contentInfo?.created_user_id) {
      message.error('작성자가 아님');
    }
    const contentUpdate: ContentUpdate = {
      title,
      content,
      updated_user_id: user.id,
    }
      await api.post(`/content/${id}`, contentUpdate)
      .then(response => {
        message.success('수정이 완료되었습니다.');
        navigate('/home');
        return response.data;
      })
      .catch(err => {
        message.error('수정을 실패하였습니다.');
      })
    };

  return { user, title, setTitle, content, setContent, updateContent };
};
