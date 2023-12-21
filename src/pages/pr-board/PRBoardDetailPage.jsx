import React, { useEffect, useState } from "react";
import PRBoardPost from "../../components/board-pr/PRBoardPost";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import "./PRBoardDetailPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getPRBoardList } from "../../apis/board/prBoard";
import { addComment, getComments } from "../../apis/comments/comments";

export function PRBoardDetailPage() {
  const { state, pathname } = useLocation();
  const getPost = state?.post;
  const getPath = pathname?.split("/");
  const [post, setPost] = useState(getPost);
  const [comments, setComments] = useState([]);
  const nav = useNavigate();

  const handleRefresh = () => {
    const commentsList = getComments(); //api 호출
    setComments([...commentsList]);
  };

  const createComment = (comment) => {
    addComment(comment);
    handleRefresh();
  };

  useEffect(() => {
    const postId = getPath[getPath.length - 1];
    const foundPost = getPRBoardList().filter((post) => post._id == postId)[0];
    setPost(getPost || foundPost);
  }, []);

  useEffect(() => {
    const commentsList = getComments();
    setComments(commentsList);
  }, [post]);

  return (
    <div className="pr-board-detail-page page-margin-bottom">
      <BoardSecondHeader header="홍보게시판" onclick={() => nav("/promotion")} />
      <div className="body">
        <PRBoardPost data={post} />
        <BoardNav point={`${post.comments}`} text="의 댓글" onclick={handleRefresh} />
        <CommentForm create={createComment} />
        <CommentsList comments={comments} path="/promotion" />
      </div>
    </div>
  );
}
