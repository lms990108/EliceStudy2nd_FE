import React from "react";
import { PostForm } from "../board";

export function PRBoardForm({ setInput, handleCancle }) {
  return (
    <>
      <PostForm tags={true} image={true} path="/pr-board" setInput={setInput} handleCancle={handleCancle} />
    </>
  );
}
