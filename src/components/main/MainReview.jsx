import React from "react";
import "./MainReview.scss"

const MainReview = () => {
  return (
    <div className="main-review-container">
      <div className="review-box"></div>
      <div className="review-box"></div>
      <div className="review-box"></div>
      <div className="review-title-box">
        <h2 className="review-h2"><span class="review-h2-1">따끈따끈</span> 실시간 후기</h2>
        <p className="review-p">생생한 후기를 들려드릴게요✨</p>
      </div>
    </div>
  );
};

export default MainReview;
