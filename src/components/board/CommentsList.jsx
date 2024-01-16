import React from "react";
import { Comment } from "./Comment";
import { Button, Pagination } from "@mui/material";
import "./CommentsList.scss";
import { useNavigate } from "react-router-dom";

export function CommentsList({ comments, path }) {
  const nav = useNavigate();

  const handleClick = () => {
    nav(path);
  };

  return (
    <div className="comments-list-box">
      {console.log(comments)}
      {comments.map((comment) => (
        <Comment data={comment} />
      ))}
      {/* 더보기 버튼 추가 */}
      <Button className="back-btn" color="inherit" variant="contained" onClick={handleClick}>
        목록보기
      </Button>
    </div>
  );
}
