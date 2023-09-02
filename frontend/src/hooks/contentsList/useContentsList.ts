import { useState, useEffect } from 'react';
import api from '../../api/api';
import { ContentList } from './interface';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/store';
import { message } from 'antd';

export const useContentList = () => {
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);
  useEffect(() => {
    const fetchData = async () => {
      await api.get<ContentList[]>('/content/list')
        .then(response => {
          setContentList(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response.status === 500) {
            message.error('server error');
          }
        })
      };
    fetchData();
  }, []);

  return { contentList, loading, user };
}