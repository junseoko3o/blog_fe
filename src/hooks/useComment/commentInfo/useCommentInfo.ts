import api from "api/api";
import { message } from 'antd';
import { CommentInfo } from "./lib/interface";

const useCommentInfo = () => {
  const commentInfo = async (id: number) => {
     try {
       const response = await api.get<CommentInfo>(`/comment/list/${id}`);
      return response.data;
     } catch (error) {
       message.error('문제있음');
       throw error;
     }
  }
  return { commentInfo }
}

export default useCommentInfo;