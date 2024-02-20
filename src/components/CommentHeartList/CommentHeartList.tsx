import { useState } from "react";
import { useParams } from "react-router";
import moment from 'moment';
import CommentPost from "components/CommentPost/CommentPost";
import useCommentList from "hooks/useComment/commentList";
import useCommentUpdate from "hooks/useComment/commentUpdate";
import useCommentDelete from "hooks/useComment/commentDelete";
import styles from './lib/commentList.module.css';
import { Button } from "antd";

const CommentHeartList = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);

  return (
    <>
    </>
  );
};

export default CommentHeartList;
