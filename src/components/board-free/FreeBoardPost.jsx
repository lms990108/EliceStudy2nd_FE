import React, { useEffect, useState } from "react";
import "./FreeBoardPost.scss";
import { PostTop } from "../board";

export default function FreeBoardPost({ data }) {
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost(data);
  });

  return (
    <div className="free-board-post">
      <PostTop user={post.user} time={post.time} commentsCnt={post.comments} />
      <h2 className="title">{post.title}</h2>
      <div>{post.content}</div>
    </div>
  );
}
