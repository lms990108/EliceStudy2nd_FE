import React from "react";
import "./PlayReviewContentBox.scss";
import Button from "@mui/material/Button";

export default function PlayReviewContentBox({ reviewContentInfo }) {
  const { photoSrc, content, isAuthorLogined } = reviewContentInfo;

  return (
    <div className="play-review-content-container">
      {content ? <p className="play-review-content">{content}</p> : null}
      {photoSrc ? <img src={photoSrc} className="play-review-photo" /> : null}
      <div className="play-review-modify-btn">
        {isAuthorLogined && <Button variant="outlined">수정하기</Button>}
      </div>
    </div>
  );
}
