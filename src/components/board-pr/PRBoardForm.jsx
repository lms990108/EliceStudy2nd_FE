import React from "react";
import { PostForm } from "../board";

export function PRBoardForm({ setInput, handleCancle }) {
  return (
    <>
      <PostForm tags={true} image={true} path="/promotion" setInput={setInput} handleCancle={handleCancle} />
    </>
  );
}
