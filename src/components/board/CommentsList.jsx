import React from "react";
import Comment from "./Comment";
import { Button, Pagination } from "@mui/material";
import "./CommentsList.scss";

export default function CommentsList() {
  const comments = [
    {
      user: "user123",
      time: "2023-10-31 11:32:09",
      content: "우왕 기대돼요! 댓글이에요",
    },
    {
      user: "user123",
      time: "2023-10-31 11:32:09",
      content: "우왕 기대돼요! 댓글이에요",
    },
    {
      user: "user123",
      time: "2023-10-31 11:32:09",
      content:
        "우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. 우왕 기대돼요! 댓글이에요. ",
    },
  ];
  return (
    <div className="comments-list-box">
      {comments.map((comment) => (
        <Comment data={comment} />
      ))}
      <div className="pagination">
        <Pagination />
      </div>
      <Button className="back-btn" color="inherit" variant="contained">
        목록보기
      </Button>
    </div>
  );
}
