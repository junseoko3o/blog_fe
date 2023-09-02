import { useState, useEffect } from 'react';
import api from '../../api/api';
import { ContentList } from './interface';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/store';

export const useContentList = () => {
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ContentList[]>('/content/list');
        setContentList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content list:', error);
      }
    };
    fetchData();
  }, []);

  return { contentList, loading, user };
}