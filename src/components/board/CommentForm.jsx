import React, { useContext, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import "./CommentForm.scss";
import moment from "moment";
import { AppContext } from "../../App";

export function CommentForm({ createComment }) {
  const [inputComment, setInputComment] = useState("");
  const { userData } = useContext(AppContext);

  const handleClick = (e) => {
    if (!inputComment) return;
    createComment(inputComment.trim());
    setInputComment("");
  };
  // 로그인 확인 로직 추가

  return (
    <div id="commentForm" className="comment-form-box">
      <div className="flex-box">
        <img className="user-profile-img" src={userData?.user?.profile_url || "https://elice-5th.s3.amazonaws.com/promotions/1706717302540_KakaoTalk_20240131_164754169_05.jpg"} />
        <textarea id="comment" value={inputComment} onChange={(e) => setInputComment(e.target.value)} placeholder="댓글을 작성하세요."></textarea>
      </div>
      <Button onClick={handleClick} color="secondary" variant="contained" size="small" className="btn">
        댓글쓰기
      </Button>
    </div>
  );
}
