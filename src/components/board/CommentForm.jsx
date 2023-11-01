import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import "./CommentForm.scss";

export default function CommentForm() {
  return (
    <div className="comment-form-box">
      <div className="flex-box">
        <AccountCircleIcon sx={{ fontSize: 36 }} />
        <textarea placeholder="댓글을 작성하세요."></textarea>
      </div>
      <Button color="secondary" variant="contained" size="small" className="btn">
        댓글쓰기
      </Button>
    </div>
  );
}
