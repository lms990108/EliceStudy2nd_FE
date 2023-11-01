import React from "react";
import FreeBoardPost from "../../components/free-board-detail/FreeBoardPost";
import "./FreeBoardDetailPage.scss";
import BoardSecondHeader from "../../components/board/BoardSecondHeader";
import BoardNav from "../../components/board/BoardNav";
import CommentForm from "../../components/board/CommentForm";
import CommentsList from "../../components/board/CommentsList";

export default function FreeBoardDetailPage() {
  return (
    <div className="free-board-detail">
      <BoardSecondHeader header="자유게시판" />
      <FreeBoardPost />
      <BoardNav point="4개" text="의 댓글" />
      <CommentForm />
      <CommentsList />
    </div>
  );
}
