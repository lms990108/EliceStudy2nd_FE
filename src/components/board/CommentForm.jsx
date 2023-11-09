import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import "./CommentForm.scss";
import moment from "moment";

export function CommentForm({ create }) {
  const [inputComment, setInputComment] = useState("");

  const handleClick = (e) => {
    if (!inputComment) return;
    const comment = {
      _id: 4,
      user: "test",
      time: moment().format(),
      content: inputComment,
    };
    create(comment);
    setInputComment("");
  };

  return (
    <div id="commentForm" className="comment-form-box">
      <div className="flex-box">
        <AccountCircleIcon sx={{ fontSize: 36 }} />
        <textarea id="comment" value={inputComment} onChange={(e) => setInputComment(e.target.value)} placeholder="댓글을 작성하세요."></textarea>
      </div>
      <Button onClick={handleClick} color="secondary" variant="contained" size="small" className="btn">
        댓글쓰기
      </Button>
    </div>
  );
}
