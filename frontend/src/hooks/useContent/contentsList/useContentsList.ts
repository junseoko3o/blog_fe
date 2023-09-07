import { useState, useEffect } from 'react';
import { ContentList } from './interface';
import { useRecoilValue } from 'recoil';
import { message } from 'antd';
import api from 'api/api';
import { userState } from 'hooks/store/store';

export const useContentList = () => {
  const user = useRecoilValue(userState);
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [loading, setLoading] = useState(true);
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