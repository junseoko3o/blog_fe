import api from "api/api";
import { LikeButtonProps } from "./lib/interface";
import useCommentHeartInfo from "../commentHeartInfo/useCommentHeartInfo";
import { useSWRConfig } from "swr";

const useCommentHeart = ({ comment_id, user_id }: LikeButtonProps) => {
  const infoLike = useCommentHeartInfo(comment_id, user_id);
  const { mutate } = useSWRConfig();
  
  const heart = async () => {
    const newLike = !infoLike.infoLike;
    try {
      const response = await api.post(`/heart/comment`, {
        comment_id,
        user_id,
        like: newLike,
      });
      window.location.reload();
      return response.data;
    } catch (error) {
      console.error('Error occurred while updating like:', error);
    }
  };

  const handleLikeClick = async () => {
    await heart();
  };
  
  return { heart, handleLikeClick };
};

export default useCommentHeart;
