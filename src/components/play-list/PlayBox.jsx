import React from "react";
import "./PlayBox.scss";
import { Link } from "react-router-dom";

// 연극 리스트 페이지에 띄울 연극 박스 하나 (포스터, 연극 제목, 열리는 장소, 상영 기간, 대표 가격 이렇게 한 세트)
export default function PlayBox({ playInfo }) {
  const { playId, imgSrc, title, place, period, price } = playInfo;
  return (
    <>
      <div className="play-box">
        <Link
          to={`/play/${playId}`}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <div className="play-img-box">
            <img src={imgSrc} alt={`${title} 포스터`} />
          </div>
          <div className="play-title">{title}</div>
          <div className="play-place">{place}</div>
          <div className="play-period">{period}</div>
          <div className="play-price">{price}원</div>
        </Link>
      </div>
    </>
  );
}
