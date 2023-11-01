import React from "react";
import { BoardSecondHeader } from "../../components/board";
import { PRBoardForm } from "../../components/board-pr/PRBoardForm";
import "./PRBoardFormPage.scss";

export function PRBoardFormPage() {
  return (
    <div className="pr-board-form-page">
      <BoardSecondHeader header="홍보게시판" />
      <div className="body">
        <PRBoardForm />
      </div>
    </div>
  );
}
