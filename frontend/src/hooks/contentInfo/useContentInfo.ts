import { useState, useEffect } from 'react';
import api from '../../api/api';
import { useRecoilValue } from 'recoil';
import { contentState } from '../store/store';
import { ContentInfo } from './interface';

export const useContentInfo = () => {
  const contentId = useRecoilValue(contentState);
  const [contentInfo, setContentInfo] = useState<ContentInfo>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ContentInfo>(`/content/${contentId}`);
        setContentInfo(response.data);
      } catch (error) {
        console.error('user is not found:', error);
      }
    };

    fetchData();
  }, [contentId, contentInfo]);

  return { contentInfo };
}