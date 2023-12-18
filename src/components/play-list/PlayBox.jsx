import React from "react";
import "./PlayBox.scss";
import { Link } from "react-router-dom";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

// 연극 리스트 페이지에 띄울 연극 박스 하나 (포스터, 연극 제목, 열리는 장소, 상영 기간, 대표 가격 이렇게 한 세트)
export default function PlayBox({ playInfo }) {
  let { playId, imgSrc, title, place, period, price } = playInfo;

  // 가격이 전석 가격이 아닐 경우 평균 가격으로 기재하기 (전석 가격은 그대로 전석 얼마 이렇게 기재)
  if (price.includes(", ")) {
    const splitPrice = price.split(", ").map((price) => {
      // 숫자가 아닌 것들을 모두 찾아 빈 문자열로 대체하는 로직
      const regex = /[^0-9]/g;
      if (price.includes("층")) {
        price = price.replace(regex, "");
        price = price.substr(1);
      }
      price = price.replace(regex, "");
      return parseInt(price);
    });
    // 평균 가격 구하기
    const averagePrice = Math.floor(
      splitPrice.reduce((acc, cur) => acc + cur) / splitPrice.length
    );
    // 평균 가격으로 가격 바꾸기
    price = `평균 ${averagePrice.toLocaleString()}원`;
  }

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
          <div className="play-price">{price}</div>
        </Link>
      </div>
    </>
  );
}
