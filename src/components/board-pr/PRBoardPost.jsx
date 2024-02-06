import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./PRBoardPost.scss";
import { PostTop } from "../board";

export default function PRBoardPost({ data, totalCommentCount }) {
  return (
    <div className="pr-board-post">
      <div className="top-container">
        <div className="left-box">
          <PostTop
            user={data.user_id || { nickname: "asd" }}
            type={"promotion"}
            createdAt={data.createdAt}
            commentsCnt={totalCommentCount || 0}
            postNumber={data.promotion_number}
          />
          <h2 className="title">{data.title}</h2>
        </div>
        <img className="main-img" src={data.image_url} alt="홍보 포스터" />
      </div>
      <div className="content">
        {data.content?.split("\n").map((text) => (
          <p>{text || " "}</p>
        ))}
      </div>
      {data.tags && data.tags.length !== 0 && (
        <div className="tags">
          {data.tags.map((tag, idx) => (
            <div key={idx}># {tag}</div>
          ))}
        </div>
      )}
    </div>
  );
}
