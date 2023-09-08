import api from "api/api";
import { authenticatedUserState } from "hooks/store/store";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { message } from 'antd';
import useCommentInfo from "../commentInfo";
import { CommentUpdate } from "./lib/interface";

const useCommentUpdate = (contentId: number) => {
  const user = useRecoilValue(authenticatedUserState);
  const [updateComment, setUpdateComment] = useState<string>("");
  const { commentInfo } = useCommentInfo();

  const commentUpdate = async (id: number) => {
    await commentInfo(id);
    const commentUpdate: CommentUpdate = {
      comment: updateComment,
      content_id: contentId,
      updated_user_id: user.id,
    };
      await api.post<CommentUpdate>(`/comment/${id}`, commentUpdate)
      .then(response => {
        message.success('수정이 완료되었습니다.');
        return response.data;
      })
      .catch(err => {
        message.error('수정을 실패하였습니다.');
      })
    };

    const hadledUpdateComment = async (id: number) => {
      await commentUpdate(id);
    };

  return { updateComment, setUpdateComment, hadledUpdateComment }
}

export default useCommentUpdate;