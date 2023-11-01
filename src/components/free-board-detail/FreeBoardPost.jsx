import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./FreeBoardPost.scss";

export default function FreeBoardPost() {
  return (
    <div className="free-board-post">
      <div className="top">
        <AccountCircleIcon sx={{ fontSize: 50 }} />
        <div className="flex-box">
          <div className="user-id">user123</div>
          <div className="date">2023-10-31</div>
        </div>
        <div className="icons">
          <ShareOutlinedIcon className="share-icon pointer" />
          <SmsOutlinedIcon />
          <span>3</span>
        </div>
      </div>
      <h2 className="title">title</h2>
      <div>
        sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다sodslkfslfkefkjsd내용입니다
      </div>
    </div>
  );
}
