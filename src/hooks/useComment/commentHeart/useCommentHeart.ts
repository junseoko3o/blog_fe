import api from "api/api";
import { LikeButtonProps } from "./lib/interface";

const useCommentHeart = ({ comment_id }: LikeButtonProps) => {
  const heart = async () => {
    const response = await api.post('', {
      comment_id,
      like: true,
    });
    try {
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    };
  };
  return { heart };
}
export default useCommentHeart;