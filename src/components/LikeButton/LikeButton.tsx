import React, { useState } from "react";
import styles from "./lib/likeButton.module.css"; 
import heart from "./lib/like.png";
import unheart from "./lib/unlike.png";
import useCommentHeartAllCount from "hooks/useComment/commentHeartAllCount/useCommentHeartAllCount";

interface LikeButtonProps {
  comment_id: number;
}

const LikeButton = ({ comment_id }: LikeButtonProps )=> {
  const [liked, setLiked] = useState(false);
  // const { count } = useCommentHeartAllCount(comment_id);
  const handleLikeClick = () => {
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <div>
      <div onClick={handleLikeClick}>
        <img src={liked ? heart : unheart} alt="Like Button" className={styles.likeButton} />
      </div>
      {/* <div>{count}</div> */}
    </div>
  );
};

export default LikeButton;
