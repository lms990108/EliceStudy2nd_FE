import React, { useEffect, useState } from "react";
import "./FreeBoardPost.scss";
import { PostTop } from "../board";
import { postUrl } from "../../apis/apiURLs";

export default function FreeBoardPost({ data }) {
  useEffect(() => {
    console.log(data);
  });

  return (
    <div className="free-board-post">
      <PostTop user={data.user_id || { nickname: "test nick" }} time={data.createdAt} commentsCnt={data.comments.length} />
      <h2 className="title">{data.title}</h2>
      <div>{data.content}</div>
    </div>
  );
}
