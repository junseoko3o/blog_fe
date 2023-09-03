import { useState } from 'react';
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../store/store";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router";
import { ContentUpdate } from "./interface";
import { message } from 'antd';

export const useContentUpdate = () => {
  const user = useRecoilValue(authenticatedUserState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [contentUpdate, setContentUpdate] = useState<ContentUpdate>({
    title: '',
    content: '',
    updated_user_id: user.id,
  });

  const updateContent = async () => {
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setContentUpdate({
      ...contentUpdate,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateContent();
    } catch (error) {
      console.error(error);
    }
  };

  return { user, contentUpdate, handleInputChange, handleSubmit };
};
