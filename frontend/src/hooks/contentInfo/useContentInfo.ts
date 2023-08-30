import { useState, useEffect } from 'react';
import api from '../../api/api';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/store';
import { ContentInfo } from './interface';

export const useContentInfo = () => {
  const user = useRecoilValue(userState);
  const [contentInfo, setContentInfo] = useState<ContentInfo[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ContentInfo[]>(`/user/content/${user.id}`);
        setContentInfo(response.data);
      } catch (error) {
        console.error('user is not found:', error);
      }
    };

    fetchData();
  }, [user]);

  return { contentInfo };
}