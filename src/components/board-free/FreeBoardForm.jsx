import React from "react";
import { PostForm } from "../board";

export function FreeBoardForm({ setInput, handleCancle }) {
  return (
    <>
      <PostForm path="/community" handleCancle={handleCancle} setInput={setInput} />
    </>
  );
}
