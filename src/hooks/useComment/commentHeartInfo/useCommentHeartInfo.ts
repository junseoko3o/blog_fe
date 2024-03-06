import api from "api/api";

const useCommentHeartInfo = (comment_id: number, user_id: number) => {
  const info = async () => {
    const response = await api.post(`/heart/comment/info`, {
      comment_id,
      user_id,
    })
    return response.data;
  }

  return { info }
}

export default useCommentHeartInfo;