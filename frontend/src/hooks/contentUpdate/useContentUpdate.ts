import { useState } from 'react';
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "../store/store";
import api from "../../api/api";
import { useParams } from "react-router";
import { ContentUpdate } from "./interface";

export const useContentUpdate = () => {
  const user = useRecoilValue(authenticatedUserState);
  const { id } = useParams();
  const [contentUpdate, setContentUpdate] = useState<ContentUpdate>({
    title: '',
    content: '',
    updated_user_id: user.id,
  });

  const updateContent = async () => {
    try {
      const response = await api.post(`/content/${id}`, contentUpdate);
      return response.data;
    } catch (err) {
      console.log(err);
    }
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
