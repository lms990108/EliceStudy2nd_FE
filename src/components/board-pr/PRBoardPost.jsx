import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./PRBoardPost.scss";
import { PostTop } from "../board";
import { useLocation } from "react-router-dom";

export default function PRBoardPost({ data }) {
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost(data);
  });

  return (
    <div className="pr-board-post-box">
      <div className="post-header">
        <span className="dot">
          <CircleIcon sx={{ color: "rgba(255, 255, 255, 1)", fontSize: "30px" }} />
        </span>
        <span className="dot">
          <CircleIcon sx={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "30px" }} />
        </span>
        <span className="dot">
          <CircleIcon sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "30px" }} />
        </span>
      </div>
      <div className="post-content-box">
        <PostTop user={post.user} time={post.time} commentsCnt={post.comments} />
        <img className="post-image" src={post.img} alt="홍보 포스터" />
        <h2 className="post-title">{post.title}</h2>
        <hr />
        <div className="post-content">{post.content}</div>
      </div>
    </div>
  );
}
