import api from "api/api";
import { useEffect, useState } from "react";

const useCommentHeartAllCount = (comment_id: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const heartCount = async () => {
      const response = await api.get(`/heart/comment/${comment_id}`);
      try {
        if (response.data) {
          setCount(response.data.like_count)
          return response.data;
        }
      } catch (err) {
        console.log(err);
      };
    };
    heartCount();
  }, [comment_id]);

  return { count };
}

export default useCommentHeartAllCount;