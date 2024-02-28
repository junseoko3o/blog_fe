import React, { useState } from "react";
import styles from "./lib/likeButton.module.css"; 
import heart from "./lib/like.png";
import unheart from "./lib/unlike.png";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <div>
      <div onClick={handleLikeClick}>
        <img src={liked ? heart : unheart} alt="Like Button" className={styles.likeButton} />
      </div>
    </div>
  );
};

export default LikeButton;
