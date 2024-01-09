import { useState } from "react";
import "./PlaySearchContentBox.scss";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function PlaySearchContentBox({
  imgSrc,
  location,
  title,
  startDate,
  endDate,
  price,
  state,
}) {
  // 공연이 종료되어 예매가 불가해 disabled된 버튼에 마우스가 위치해 있는지 여부
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  // 가격이 전석 가격이 아닐 경우 최저 가격으로 기재하기 (전석 가격은 그대로 전석 얼마 이렇게 기재)
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
    // 최저 가격 구하기
    const minPrice = Math.min(...splitPrice);
    console.log(minPrice);
    // 최저 가격으로 가격 바꾸기
    price = `최저 ${minPrice.toLocaleString()}원`;
  }

  return (
    <div className="play-search-content-box">
      <div className="play-img-container">
        <img src={imgSrc} />
      </div>
      <div className="play-info">
        <h3>{title}</h3>
        <p>
          {location.length >= 30 ? `${location.slice(0, 28)}...` : location}
        </p>
        <p>
          {startDate.split("T")[0]} ~ {endDate.split("T")[0]}
        </p>
        <h3>{price}</h3>
      </div>
      <div className="reservation-btn">
        {state !== "공연완료" ? (
          <a
            href={`https://tickets.interpark.com/contents/search?keyword=${title}&start=0&rows=20`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="contained" color="secondary" size="large">
              <Typography fontFamily="Nanum Gothic, sans-serif">
                예매하러 가기
              </Typography>
            </Button>
          </a>
        ) : (
          <>
            <div
              onMouseOver={() => setIsDisabledBtn(true)}
              onMouseOut={() => setIsDisabledBtn(false)}
            >
              <Button variant="contained" disabled>
                <Typography
                  fontFamily="Nanum Gothic, sans-serif"
                  className="button-text"
                >
                  예매하러 가기
                </Typography>
              </Button>
              <span
                style={
                  isDisabledBtn
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
                className="end-show-tooltip"
              >
                본 연극은 종료되어 예매 링크가 제공되지 않습니다.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
