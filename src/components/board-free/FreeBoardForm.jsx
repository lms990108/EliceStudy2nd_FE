import React from "react";
import { PostForm } from "../board";

export function FreeBoardForm({ setInput, handleCancle }) {
  return (
    <>
      <PostForm path="/free-board" handleCancle={handleCancle} setInput={setInput} />
    </>
  );
}
