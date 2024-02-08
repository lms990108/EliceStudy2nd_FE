import React from "react";
import "./PlayReviewHeader.scss";

export default function PlayReviewHeader({
  count,
  sortStandard,
  setSortStandard,
  setCurPage,
}) {
  return (
    <>
      <div className="play-review-header-container">
        <div className="number-of-plays">
          <span>{count}개</span>의 리뷰
        </div>
        <div className="play-review-sort">
          <select
            onChange={(e) => {
              setSortStandard(e.target.value);
              setCurPage(1);
            }}
            value={sortStandard}
          >
            <option value="recent">최신순</option>
            <option value="rate">높은 평점순</option>
          </select>
        </div>
      </div>
      <div className="review-header-line"></div>
    </>
  );
}
