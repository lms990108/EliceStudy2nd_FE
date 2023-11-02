import React, { useEffect, useState } from "react";
import PRBoardPost from "../../components/board-pr/PRBoardPost";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import "./PRBoardDetailPage.scss";
import { useLocation } from "react-router-dom";
import { getPRBoardList } from "../../apis/board/prBoard";
import { getComments } from "../../apis/comments/comments";

export function PRBoardDetailPage() {
  const { state, pathname } = useLocation();
  const getPost = state?.post;
  const getPath = pathname?.split("/");
  const [post, setPost] = useState(getPost);
  const [comments, setComments] = useState([]);

  const handleRefresh = () => {
    const commentsList = getComments(); //api 호출
    setComments(commentsList);
  };

  useEffect(() => {
    const postId = getPath[getPath.length - 1];
    console.log(postId);
    const foundPost = getPRBoardList().filter((post) => post._id == postId)[0];
    console.log(foundPost);
    setPost(getPost || foundPost);
  }, []);

  useEffect(() => {
    const commentsList = getComments();
    setComments(commentsList);
  }, [post]);

  return (
    <div className="pr-board-detail-page">
      {console.log(post)}
      <BoardSecondHeader header="홍보게시판" path="/pr-board" />
      <div className="body">
        <PRBoardPost data={post} />
        <BoardNav point="4개" text="의 댓글" onclick={handleRefresh} />
        <CommentForm />
        <CommentsList comments={comments} path="/pr-board" />
      </div>
    </div>
  );
}
