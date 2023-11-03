import React from "react";
import { BoardSecondHeader } from "../../components/board";
import { FreeBoardForm } from "../../components/board-free/FreeBoardForm";
import "./FreeBoardFormPage.scss";

export function FreeBoardFormPage() {
  return (
    <div className="free-board-form-page">
      <BoardSecondHeader header="자유게시판" />
      <div className="body">
        <FreeBoardForm />
      </div>
    </div>
  );
}
