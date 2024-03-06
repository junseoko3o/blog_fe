import api from "api/api";
import { useEffect, useState } from "react";
import { LikeButtonProps } from "./lib/interface";
import useCommentHeartInfo from "../commentHeartInfo/useCommentHeartInfo";

const useCommentHeart = ({comment_id, user_id }: LikeButtonProps) => {
  const info = useCommentHeartInfo(comment_id, user_id);
  const [like, setLike] = useState(false);
  
  const heart = async () => {
    try {
      const newLike = !like;
      setLike(newLike);
      const response = await api.post(`/heart/comment`, {
        comment_id,
        user_id,
        like: newLike,
      });
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeClick = async () => {
    await heart();
  };

  return { like, handleLikeClick };
};

export default useCommentHeart;
