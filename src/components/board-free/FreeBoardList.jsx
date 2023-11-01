import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import "./FreeBoardList.scss";

export default function FreeBoardList({ boardList }) {
  return (
    <div className="free-board-list-box">
      {boardList.map((post) => (
        <div className="content-box">
          <div className="flex-box top">
            <div className="user">
              <AccountCircleIcon sx={{ fontSize: 24 }} />
              <span>{post.user_id}</span>
            </div>
            <div className="time">{post.time}</div>
          </div>
          <div>
            <div className="title">{post.title}</div>
          </div>
          <div className="flex-box bottom">
            <div className="content">{post.content}</div>
            <div className="comments">
              <SmsOutlinedIcon sx={{ fontSize: 16 }} />
              <span>{post.coments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
