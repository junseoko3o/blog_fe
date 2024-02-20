import { useParams } from "react-router";

const CommentHeartList = () => {
  const { id } = useParams() as { id: string };
  const contentId = parseInt(id);

  return (
    <>
    </>
  );
};

export default CommentHeartList;
