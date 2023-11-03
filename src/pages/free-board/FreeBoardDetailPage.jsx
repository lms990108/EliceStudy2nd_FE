import React from "react";
import FreeBoardPost from "../../components/board-free/FreeBoardPost";
import "./FreeBoardDetailPage.scss";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";

export function FreeBoardDetailPage() {
  return (
    <div className="free-board-detail">
      <BoardSecondHeader header="자유게시판" />
      <div className="body">
        <FreeBoardPost />
        <BoardNav point="4개" text="의 댓글" />
        <CommentForm />
        <CommentsList />
      </div>
    </div>
  );
}
