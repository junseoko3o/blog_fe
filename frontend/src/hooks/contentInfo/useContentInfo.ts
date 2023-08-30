import { useState, useEffect } from 'react';
import api from '../../api/api';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/store';
import { ContentInfo } from './interface';

export const useContentInfo = () => {
  const [contentInfo, setContentInfo] = useState<ContentInfo[]>([]);
  const user = useRecoilValue(userState);
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ContentInfo[]>(`/user/content/${user}`);
        console.log(response);
        setContentInfo(response.data);
      } catch (error) {
        console.error('user is not found:', error);
      }
    };

    fetchData();
  }, [user]);

  return { contentInfo };
}