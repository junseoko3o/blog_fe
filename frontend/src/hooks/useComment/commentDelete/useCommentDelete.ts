import api from "api/api";
import { authenticatedUserState } from "hooks/store/store";
import { useRecoilValue } from "recoil";
import { message } from 'antd';
import { CommentDelete } from "./lib/interface";
import useCommentInfo from "../commentInfo";

const useCommentDelete = () => {
  const user = useRecoilValue(authenticatedUserState);
  const { commentInfo } = useCommentInfo();

  const deleteComment = async (id: number) => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    const commentData = await commentInfo(id);
    if (confirmDelete) {
      try {
        if (commentData && commentData.id === user.id) {
          await api.delete<CommentDelete>(`/comment/${id}`);
          message.success('삭제가 완료되었습니다.');
        } else {
          message.error('댓글을 삭제할 수 있는 권한이 없습니다.');
        }
      } catch (error) {
        message.error('삭제를 실패하였습니다.');
      }
    }
  };

  const handledDelete = async (id: number) => {
    await deleteComment(id);
  };

  return { handledDelete }
}

export default useCommentDelete;