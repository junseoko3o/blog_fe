import api from "api/api";
import { authenticatedUserState } from "hooks/store/store";
import { useRecoilValue } from "recoil";
import useCommentInfo from "../commentInfo";

const useCommentHeart = () => {

  const heart = async (comment_id: number) => {
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