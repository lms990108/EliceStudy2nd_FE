import React from "react";
import "./PlayReviewContentBox.scss";
import Button from "@mui/material/Button";

export default function PlayReviewContentBox({
  reviewContentInfo,
  setIsReviewFormOpened,
  scrollRef,
}) {
  const { photoSrc, content, isAuthorLogined } = reviewContentInfo;

  const handleModifyBtnClick = () => {
    setIsReviewFormOpened(true);

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="play-review-content-container">
      {content ? (
        <p className="play-review-content">
          {!content || content === "null" ? "" : content}
        </p>
      ) : null}
      {photoSrc.length
        ? photoSrc.map((src, idx) => (
            <img src={src} className="play-review-photo" key={idx} />
          ))
        : null}
      <div className="play-review-modify-btn">
        {isAuthorLogined && (
          <Button variant="outlined" onClick={() => handleModifyBtnClick()}>
            수정하기
          </Button>
        )}
      </div>
    </div>
  );
}
