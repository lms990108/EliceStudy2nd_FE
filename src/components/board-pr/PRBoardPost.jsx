import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./PRBoardPost.scss";
import { PostTop } from "../board";
import { useLocation } from "react-router-dom";

export default function PRBoardPost({ data }) {
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
        <PostTop user={data.user_id ? { nickname: data.user_id } : { nickname: "asd" }} type={"promotion"} time={data.createdAt} commentsCnt={0} />
        <img className="post-image" src={data.poster_url} alt="홍보 포스터" />
        <h2 className="post-title">{data.title}</h2>
        <hr />
        <div className="post-content">{data.content}</div>
      </div>
    </div>
  );
}
