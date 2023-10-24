import { useState } from "react";
import { useParams } from "react-router";
import moment from 'moment';
import CommentPost from "components/CommentPost/CommentPost";
import useCommentList from "hooks/useComment/commentList";
import useCommentUpdate from "hooks/useComment/commentUpdate";
import useCommentDelete from "hooks/useComment/commentDelete";
import styles from './lib/commentList.module.css';
import { Button } from "antd";

const CommentList = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { user, commentList } = useCommentList(contentId);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [visibleComments, setVisibleComments] = useState(3);
  const { updateComment, setUpdateComment, hadledUpdateComment } = useCommentUpdate(contentId);
  const { handledDelete } = useCommentDelete();

  const handleUpdateClick = (index: number) => {
    setEditingIndex(index);
    if (index !== -1) {
      const commentToEdit = commentList.find(comment => comment.id === index);
      setUpdateComment(commentToEdit?.comment || '');
    } else {
      setUpdateComment('');
    }
  };

  const handledUpdateSave = async (commentId: number) => {
    await hadledUpdateComment(commentId);
    setEditingIndex(-1);
  };

  const handleLoadMoreClick = () => {
    setVisibleComments(prevVisibleComments => prevVisibleComments + 3);
  };

  return (
    <>
      <CommentPost />
      <div className={styles.commentList}>
        {commentList.slice(0, visibleComments).map(comment => (
          <div key={comment.id} className={styles.commentItem}>
            {editingIndex === comment.id ? (
              <>
                {user.id === comment.created_user_id && (
                  <>
                    <input
                      type="text"
                      id="comment"
                      name="comment"
                      value={updateComment}
                      onChange={e => setUpdateComment(e.target.value)} 
                    />
                    <Button
                      className={styles.updateButtonn}
                      onClick={() => handledUpdateSave(comment.id)}
                    >
                      Save
                    </Button>
                    <Button
                      className={styles.cancelButton}
                      onClick={() => handleUpdateClick(-1)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <p className={styles.commentText}>{comment.comment}</p>
                <p className={styles.info}>작성자: {comment.user_name} 작성시간: {moment(comment.updated_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                {user.id === comment.created_user_id && (
                  <div className={styles.buttonContainer}>
                    <Button
                      className={styles.updateButton}
                      onClick={() => handleUpdateClick(comment.id)}
                    >
                      Update
                    </Button>
                    <Button
                      className={styles.deleteButton}
                      onClick={() => handledDelete(comment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {visibleComments < commentList.length && visibleComments >= 3 && (
          <Button className={styles.loadMoreButton} onClick={handleLoadMoreClick}>
            Load More
          </Button>
        )}
      </div>
    </>
  );
};

export default CommentList;
