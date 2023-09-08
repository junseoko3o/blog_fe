import api from "api/api";
import { message } from 'antd';

export const useCommentInfo = () => {
  const commentInfo = async (id: number) => {
     try {
       const response = await api.get(`/comment/list/${id}`);
       console.log(response.data);
       return response.data;
     } catch (error) {
       message.error('문제있음');
       throw error;
     }
  }
  return { commentInfo }
}
