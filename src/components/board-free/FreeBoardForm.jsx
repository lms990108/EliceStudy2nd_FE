import React from "react";
import { PostForm } from "../board";

export function FreeBoardForm() {
  return (
    <>
      <PostForm tags={false} image={false} />
    </>
  );
}
