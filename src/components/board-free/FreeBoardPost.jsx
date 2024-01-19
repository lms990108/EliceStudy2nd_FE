import React from "react";
import "./FreeBoardPost.scss";
import { PostTop } from "../board";

export default function FreeBoardPost({ data }) {
  return (
    <div className="free-board-post">
      <PostTop user={data.user_id || { nickname: "test nick" }} type={"community"} time={data.createdAt} commentsCnt={data.comments.length} />
      <h2 className="title">{data.title}</h2>
      <div>{data.content}</div>
    </div>
  );
}
