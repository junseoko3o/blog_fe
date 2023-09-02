import { useState, useEffect } from 'react';
import api from '../../api/api';
import { ContentInfo } from './interface';
import { useParams } from 'react-router';

export const useContentInfo = () => {
  const { id } = useParams();
  const [contentInfo, setContentInfo] = useState<ContentInfo>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id)
        const response = await api.get<ContentInfo>(`/content/${id}`);
        setContentInfo(response.data);
        return response.data;
      } catch (error) {
        console.error('user is not found:', error);
      }
    };

    fetchData();
  }, [id]);

  return { contentInfo, id };
}