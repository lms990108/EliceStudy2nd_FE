import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./CommentForm.scss";
import { AlertContext, AppContext } from "../../App";
import default_user_img from "../../assets/img/default_user_img.svg";

export function CommentForm({ createComment }) {
  const [inputComment, setInputComment] = useState("");
  const { userData } = useContext(AppContext);
  const { setOpenLoginAlert } = useContext(AlertContext);

  const handleClick = (e) => {
    if (!userData.user?._id) {
      setOpenLoginAlert(true);
    }
    if (!inputComment) {
      document.querySelector("#comment").focus();
    }
    createComment(inputComment.trim());
    setInputComment("");
  };

  return (
    <div id="commentForm" className="comment-form-box">
      <div className="flex-box">
        <img className="user-profile-img" src={userData?.user?.profile_url || default_user_img} onError={(e) => (e.target.src = default_user_img)} />
        <textarea id="comment" value={inputComment} onChange={(e) => setInputComment(e.target.value)} placeholder="댓글을 작성하세요."></textarea>
      </div>
      <Button onClick={handleClick} color="secondary" variant="contained" size="small" className="btn">
        댓글쓰기
      </Button>
    </div>
  );
}
