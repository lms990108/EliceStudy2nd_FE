import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./PostTop.scss";
import { AlertCustom, AlertTest } from "../common/alert/Alerts";

export function PostTop({ user, time, commentsCnt }) {
  const [open, setOpen] = useState(false);

  const handleScrollTo = () => {
    const location = document.querySelector("#commentForm").offsetTop;
    window.scrollTo({ top: location, behavior: "smooth" });
  };

  const handleCopy = () => {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = window.document.location.href;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setOpen(true);
  };

  return (
    <div className="board-post-top">
      <AccountCircleIcon sx={{ fontSize: 50 }} />
      <div className="flex-box">
        <div className="user-id">{user}</div>
        <div className="date">{time}</div>
      </div>
      <div className="icons">
        <ShareOutlinedIcon className="share-icon pointer" onClick={handleCopy} />
        <div className="comments-icon pointer" onClick={handleScrollTo}>
          <SmsOutlinedIcon />
          <span>{commentsCnt}</span>
        </div>
      </div>

      <AlertCustom open={open} onclose={() => setOpen(false)} title={"URL이 복사되었습니다!"} content={window.location.href} time={1500} />
    </div>
  );
}
