import api from "api/api";
import { mutate } from "swr";

const useCommentHeartAllCount = () => {
  const heartCount = async (comment_id: number) => {
    const response = await api.get(`/${comment_id}`);
    try {
      if (response.data) {
        mutate(`/${comment_id}`);
        return response.data;
      }
    } catch (err) {
      console.log(err);
    };
  };
  return { heartCount };
}

export default useCommentHeartAllCount;