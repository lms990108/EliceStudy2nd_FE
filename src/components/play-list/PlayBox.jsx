import React from "react";
import "./PlayBox.scss";
import { useNavigate } from "react-router-dom";

// 연극 리스트 페이지에 띄울 연극 박스 하나 (포스터, 연극 제목, 열리는 장소, 상영 기간, 대표 가격 이렇게 한 세트)
export default function PlayBox({ playInfo, query, setPrevPlayListQuery }) {
  const nav = useNavigate();
  let { playId, imgSrc, title, place, period, price, state } = playInfo;

  return (
    <>
      <div
        className="play-box"
        onClick={() => {
          setPrevPlayListQuery(query);
          nav(`/play/${playId}?tab=detail-info`);
        }}
      >
        <div className="play-img-box">
          {state === "공연완료" && (
            <div className="end-show-design">
              <img src="/banner.png" alt="공연 완료 이미지" />
              <span className="end-show-text">
                연극 <br />
                종료
              </span>
            </div>
          )}
          <img src={imgSrc} alt={`${title} 포스터`} />
        </div>
        <div className="play-title">
          {title.length >= 28 ? `${title.slice(0, 27)}...` : title}
        </div>
        <div className="play-place">
          {place.length >= 17 ? `${place.slice(0, 16)}...` : place}
        </div>
        <div className="play-period">{period}</div>
        <div className="play-price">
          {price.length >= 40 ? `${price.slice(0, 40)}...` : price}
        </div>
      </div>
    </>
  );
}
