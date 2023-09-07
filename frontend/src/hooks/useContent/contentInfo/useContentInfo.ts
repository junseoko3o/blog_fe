import { useState, useEffect } from 'react';
import { ContentInfo } from './interface';
import { message } from 'antd';
import api from 'api/api';

export const useContentInfo = (contentId: number) => {
  const [contentInfo, setContentInfo] = useState<ContentInfo>();
  useEffect(() => {
    const fetchData = async () => {
        await api.get<ContentInfo>(`/content/${contentId}`)
          .then(response => {
            setContentInfo(response.data);
          })
          .catch(err => {
            message.error('user is not found');
          })
    };

    fetchData();
  }, []);

  return { contentInfo };
}
