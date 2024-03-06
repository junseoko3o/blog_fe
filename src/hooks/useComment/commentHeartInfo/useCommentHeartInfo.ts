import api from "api/api";
import { useEffect, useState } from "react";

const useCommentHeartInfo = (comment_id: number, user_id: number) => {
  const [infoLike, setInfoLike] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await api.post(`/heart/comment/info`, {
          comment_id,
          user_id,
        });
        const infoData = response.data;
        setInfoLike(infoData.like);
      } catch (error) {
        console.error("Error fetching comment heart info:", error);
      }
    };

    fetchInfo();
  }, [comment_id, user_id]);

  return { infoLike };
};

export default useCommentHeartInfo;
