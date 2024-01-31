import React from "react";
import "./PlayDetailNav.scss";

export default function PlayDetailNav({ selected, handleClick }) {
  return (
    <div className="play-detail-nav">
      <div
        className={
          selected === "detail-info" ? "selected-play-detail-menu" : null
        }
        onClick={handleClick}
      >
        상세정보
      </div>
      <div
        className={selected === "reviews" ? "selected-play-detail-menu" : null}
        onClick={handleClick}
      >
        관람후기
      </div>
      <div
        className={
          selected === "location-info" ? "selected-play-detail-menu" : null
        }
        onClick={handleClick}
      >
        장소정보
      </div>
    </div>
  );
}
