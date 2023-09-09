import { useState, useEffect } from 'react';
import { ContentList } from './lib/interface';
import { useRecoilValue } from 'recoil';
import { message } from 'antd';
import api from 'api/api';
import { userState } from 'hooks/store/store';
import useSwr from 'swr';

const useContentList = () => {
  const user = useRecoilValue(userState);
  const [contentList, setContentList] = useState<ContentList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, error } = useSwr(`/content/list`)
  useEffect(() => {
    if (data) {
      setContentList(data);
    }
  }, [data]);

  return { contentList, loading, user };
}

export default useContentList;