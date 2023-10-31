import React from "react";
import "./PlayDetailNav.scss";

export default function PlayDetailNav() {
  return (
    <div className="play-detail-nav">
      <div className="detail-info">상세정보</div>
      <div className="review">관람후기</div>
      <div className="location-info">장소정보</div>
    </div>
  );
}
