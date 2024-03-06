import React, { useState } from "react";
import styles from "./lib/likeButton.module.css"; 
import heart from "./lib/like.png";
import unheart from "./lib/unlike.png";
import useCommentHeartAllCount from "hooks/useComment/commentHeartAllCount/useCommentHeartAllCount";
import { LikeButtonProps } from "./lib/interface";
import useCommentHeart from "hooks/useComment/commentHeart/useCommentHeart";
import useCommentHeartInfo from "hooks/useComment/commentHeartInfo/useCommentHeartInfo";

const LikeButton = ({ comment_id, user_id}: LikeButtonProps)=> {
  const { count } = useCommentHeartAllCount(comment_id);
  const { like, handleLikeClick  } = useCommentHeart({ comment_id, user_id });
  const { infoLike } = useCommentHeartInfo(comment_id, user_id);
  return (
    <div>
      <div onClick={handleLikeClick}>
        <img src={infoLike === true && like === false ? heart : unheart} alt="Like Button" className={styles.likeButton} />
      </div>
      <div>{count}</div>
    </div>
  );
};

export default LikeButton;
