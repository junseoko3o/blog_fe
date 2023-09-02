import { useState, useEffect } from 'react';
import api from '../../api/api';
import { ContentInfo } from './interface';
import { useParams } from 'react-router';
import { message } from 'antd';

export const useContentInfo = () => {
  const { id } = useParams();
  const [contentInfo, setContentInfo] = useState<ContentInfo>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ContentInfo>(`/content/${id}`);
        setContentInfo(response.data);
        return response.data;
      } catch (error) {
        message.error('user is not found');
      }
    };

    fetchData();
  }, [id]);

  return { contentInfo, id };
}