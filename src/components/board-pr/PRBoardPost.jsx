import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./PRBoardPost.scss";
import { PostTop } from "../board";

export default function PRBoardPost({ data, totalCommentCount }) {
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
        <PostTop user={data.user_id || { nickname: "asd" }} type={"promotion"} createdAt={data.createdAt} commentsCnt={totalCommentCount || 0} postNumber={data.promotion_number} />
        <img className="post-image" src={data.image_url} alt="홍보 포스터" />
        <h2 className="post-title">{data.title}</h2>
        <hr />
        <div className="post-content">{data.content}</div>
      </div>
    </div>
  );
}
