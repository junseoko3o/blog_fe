import { Button, Input, List } from "antd"
import { useCommentList } from "hooks/useComment/commentList/useCommentList";
import { useCommentUpdate } from "hooks/useComment/commentUpdate/useCommentUpdate";
import { useState } from "react";
import { useParams } from "react-router";
import { useCommentDelete } from "hooks/useComment/commentDelete/useCommentDelete";
import { useCommentInfo } from "hooks/useComment/commentInfo/useCommentInfo";
import moment from 'moment';
import styles from './lib/commentList.module.css';
import CommentPost from "components/CommentPost/CommentPost";

const CommentList = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);
  const { user, commentList } = useCommentList(contentId);
  const [editingIndex, setEditingIndex] = useState(-1);
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
  }

 
  return (
    <>
      <CommentPost />
      <List
        dataSource={commentList}
        header={`${commentList.length} ${commentList.length === 1 ? 'Comment' : 'Comments'}`}
        itemLayout="horizontal"
        renderItem={(comment) => (
          <List.Item>
            <div key={comment.id} className={styles.div}>
              {editingIndex === comment.id ? (
                <>
                  {user.id === comment.created_user_id && (
                    <>
                      <Input
                        type="text"
                        id="comment"
                        name="comment"
                        value={updateComment}
                        onChange={e => setUpdateComment(e.target.value)} 
                      />
                      <Button
                        type="primary"
                        className={styles.updateButton}
                        onClick={() => handledUpdateSave(comment.id)}
                      >
                        Save
                      </Button>
                      <Button
                        type="primary"
                        className={styles.deleteButton}
                        onClick={() => handleUpdateClick(-1)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className={styles.comment}>{comment.comment}</p>
                  <p className={styles.info}>작성자: {comment.user_name} 작성시간: {moment(comment.updated_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                  {user.id === comment.created_user_id && (
                    <>
                      <Button
                        type="primary" 
                        className={styles.updateButton}
                        onClick={() => handleUpdateClick(comment.id)}
                      >
                        Update
                      </Button>
                      <Button
                        type="primary"
                        className={styles.deleteButton}
                        onClick={()=> handledDelete(comment.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </List.Item>
        )}  
      />
    </>
  )
}
export default CommentList;