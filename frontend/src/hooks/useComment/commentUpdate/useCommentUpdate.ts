import api from "api/api";
import { authenticatedUserState } from "hooks/store/store";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { message } from 'antd';
import { useCommentInfo } from "../commentInfo/useCommentInfo";

export const useCommentUpdate = (contentId: number) => {
  const user = useRecoilValue(authenticatedUserState);
  const [updateComment, setUpdateComment] = useState("");
  const { commentInfo } = useCommentInfo();

  const commentUpdate = async (id: number) => {
    const info = await commentInfo(id);
    const commentUpdate = {
      comment: updateComment,
      content_id: contentId,
      updated_user_id: user.id,
    };
      await api.post(`/comment/${id}`, commentUpdate)
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