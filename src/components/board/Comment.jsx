import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Comment.scss";

export function Comment({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="comment-box">
      <div className="top">
        <AccountCircleIcon sx={{ fontSize: 34 }} />
        <div className="flex-box">
          <div className="user-id">{data.user}</div>
          <div className="time">{data.time}</div>
        </div>
        <div className="buttons">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
      <div className="content pre-wrap">
        <span>{data.content} </span>
      </div>
      더보기
    </div>
  );
}
