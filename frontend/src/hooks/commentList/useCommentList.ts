import { useContentInfo } from "hooks/contentInfo/useContentInfo";
import { authenticatedUserState } from "hooks/store/store";
import { useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from 'recoil';

export const useCommentList = () => {
  const user = useRecoilValue(authenticatedUserState);
  const contents = useContentInfo();
  const { id } = useParams();
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState('');


}