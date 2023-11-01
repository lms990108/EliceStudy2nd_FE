import React from "react";
import PRBoardPost from "../../components/board-pr/PRBoardPost";
import { BoardSecondHeader, BoardNav, CommentForm, CommentsList } from "../../components/board";
import "./PRBoardDetailPage.scss";

export function PRBoardDetailPage() {
  return (
    <div className="pr-board-detail-page">
      <BoardSecondHeader header="홍보게시판" />
      <div className="body">
        <PRBoardPost />
        <BoardNav point="4개" text="의 댓글" />
        <CommentForm />
        <CommentsList />
      </div>
    </div>
  );
}
