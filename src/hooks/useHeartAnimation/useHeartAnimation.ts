import { useEffect } from "react";
import styles from './lib/heart.module.css';

const useHeartAnimation = () => {
  useEffect(() => {
    const createHeart = () => {
      const numHearts = 10;
      for (let i = 0; i < numHearts; i++) {
        const Heart = document.createElement("div");
        Heart.className = styles.heart;
        document.body.appendChild(Heart);
  
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = Math.random() * 3 + 5;
  
        Heart.style.left = startX + "px";
        Heart.style.top = startY + "px";
  
        setTimeout(() => {
          Heart.remove();
        }, duration * 1000);
      }
    };
  
    const HeartInterval = setInterval(createHeart, 500);
    
    return () => {
      clearInterval(HeartInterval);
    };
  }, [styles.heart]);
}

export default useHeartAnimation;