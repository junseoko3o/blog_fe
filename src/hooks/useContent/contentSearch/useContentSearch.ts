import { message } from "antd";
import React, { useEffect, useState } from "react";
import useSwr from 'swr';

const useContentSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const handleKeywordChange = (inputKeyword: string) => {
    setKeyword(inputKeyword);
  };

  const encodedKeyword = encodeURIComponent(keyword);
  const { data, error } = useSwr(`/content/list/all?keyword=${encodedKeyword}`); 
  useEffect(() => {
    if (error) {
      message.error('데이터를 불러오는 중 오류가 발생했습니다.');
    }
  }, [data]);
  return { keyword, setKeyword, handleKeywordChange }
}

export default useContentSearch;