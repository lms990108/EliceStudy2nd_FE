import React from "react";
import "./PlayReviewHeader.scss";

export default function PlayReviewHeader({ count }) {
  return (
    <>
      <div className="play-review-header-container">
        <div className="number-of-plays">
          <span>{count}개</span>의 리뷰
        </div>
      </div>
      <div className="review-header-line"></div>
    </>
  );
}
