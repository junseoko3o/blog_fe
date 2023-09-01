import { useState, useEffect } from 'react';
import api from '../../api/api';
import { ContentList } from './interface';
import { useRecoilState } from 'recoil';
import { contentState } from '../store/store';

export const useContentList = () => {
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [contentId, setContentId] = useRecoilState(contentState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ContentList[]>('/content/list');
        setContentList(response.data);
        setLoading(false);
        setContentId(response.data[0].id)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching content list:', error);
      }
    };
    fetchData();
  }, []);

  return { contentList, loading, contentId };
}