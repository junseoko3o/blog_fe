import { useState, useEffect } from 'react';
import { ContentList } from './lib/interface';
import { useRecoilValue } from 'recoil';
import { message } from 'antd';
import api from 'api/api';
import { userState } from 'hooks/store/store';
import useSwr from 'swr';

const useContentList = (page: number) => {
  const user = useRecoilValue(userState);
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, error } = useSwr(`/content?page=${page}`); 

  useEffect(() => {
    if (data) {
      setContentList(data);
      setLoading(false);
    }
    if (error) {
      message.error('데이터를 불러오는 중 오류가 발생했습니다.');
      setLoading(false);
    }
  }, [data]);

  return { contentList, loading, user };
}


export default useContentList;
