import React, { useEffect, useState } from "react";
import FreeBoardPost from "../../components/board-free/FreeBoardPost";
import "./FreeBoardDetailPage.scss";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import { useLocation, useNavigate } from "react-router-dom";
import { addComment, getComments } from "../../apis/comments/comments";
import { getPRBoardList } from "../../apis/board/prBoard";

export function FreeBoardDetailPage() {
  const { state, pathname } = useLocation();
  const getPost = state?.post;
  const getPath = pathname?.split("/");
  const [post, setPost] = useState(getPost);
  const [comments, setComments] = useState([]);
  const nav = useNavigate();

  const handleRefresh = () => {
    const commentsList = getComments(); //api 호출
    console.log(commentsList);
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
    <div className="free-board-detail page-margin-bottom">
      <BoardSecondHeader header="자유게시판" onclick={() => nav("/community")} />
      <div className="body">
        <FreeBoardPost data={post} />
        <BoardNav point={`${post.comments}`} text="의 댓글" onclick={handleRefresh} />
        <CommentForm create={createComment} />
        <CommentsList comments={comments} path="/community" />
      </div>
    </div>
  );
}
