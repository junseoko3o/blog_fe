import api from 'api/api';
import { useState, useEffect } from 'react';
import { ContentInfo } from './interface';
import { message } from 'antd';
import { useRecoilValue } from 'recoil';
import { authenticatedUserState } from 'hooks/store/store';

export const useContentInfo = (contentId: number) => {
  const user = useRecoilValue(authenticatedUserState);
  const [contentInfo, setContentInfo] = useState<ContentInfo>({} as ContentInfo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ContentInfo>(`/content/${contentId}`);
        setContentInfo(response.data);
        return response.data;
      } catch (err) {
        message.error('먼가 오류');
      }
    };

    fetchData();
  }, []);

  return { contentInfo, user };
}
