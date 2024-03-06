import api from "api/api";
import { mutate } from "swr";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { authenticatedUserState } from "hooks/store/store";

const useCommentHeart = (comment_id: number) => {
  const [like, setLike] = useState(false);
  const user = useRecoilValue(authenticatedUserState)
  const heart = async () => {
    try {
      const newLike = !like;
      setLike(newLike);
      const response = await api.post(`/heart/comment/update`, {
        comment_id,
        user_id: user.id,
        like: newLike,
      });
      mutate(`/heart/comment/count/${comment_id}`);
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
