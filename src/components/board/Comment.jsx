import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Comment.scss";

export function Comment({ data }) {
  const [open, setOpen] = useState(false);
  const [seeMoreOpen, setSeeMoreOpen] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleSeeMore = (e) => {
    const textBox = e.target.closest(".text");
    textBox.classList.toggle("close");
    setSeeMoreOpen((cur) => !cur);
    console.log(textBox.clientHeight);
  };

  useEffect(() => {
    const textBox = document.querySelector(`#comment${data._id} .text`);
    if (parseInt(textBox.clientHeight) > 72) {
      console.log("?");
      setDisable(false);
    }
  }, []);

  return (
    <div className="comment-box" id={`comment${data._id}`}>
      <div className="top">
        <AccountCircleIcon sx={{ fontSize: 34 }} />
        <div className="flex-box">
          <div className="user-id">{data.user}</div>
          <div className="time">{data.time}</div>
        </div>
        {/* <div className="buttons">
          <button>수정</button>
          <button>삭제</button>
        </div> */}
      </div>
      <div className="content pre-wrap">
        <span className={`text ${disable || "close"}`}>
          {data.content}
          <span className="see-more-btn pointer" onClick={handleSeeMore}>
            {disable || (seeMoreOpen ? "▴접기" : "▾더보기")}
          </span>
        </span>
      </div>
    </div>
  );
}
