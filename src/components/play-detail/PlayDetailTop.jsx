import React from "react";
import "./PlayDetailTop.scss";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function PlayDetailTop() {
  return (
    <div className="play-detail-top">
      <div className="play-poster">
        <div className="poster-box">
          <img
            src="https://t-img1.wemep.co.kr/wmp-tproduct/3/046/3000010463/3000010463.jpg?20230828140832"
            alt="굿닥터 포스터"
          />
        </div>
      </div>
      <div className="play-info">
        <h1>연극 &lt;굿닥터&gt;</h1>
        <hr />
        <div>
          <h3>상영기간</h3>
          <p>2023.10.06 - 2023.11.12</p>
        </div>
        <div>
          <h3>예매기간</h3>
          <p>2023.11.01 ~ 2023.11.12</p>
        </div>
        <div>
          <h3>상영장소</h3>
          <p>세종문화회관 S씨어터</p>
        </div>
        <div>
          <h3>관람시간</h3>
          <p>115분</p>
        </div>
        <div>
          <h3>관람등급</h3>
          <p>13세 이상</p>
        </div>
        <div>
          <h3>가격정보</h3>
          <p>R석 - 45,000원</p>
          <p>S석 - 35,000원</p>
        </div>
        <div>
          <h3>평점</h3>
          <p>
            <Rating value={4} readOnly />
          </p>
        </div>
        <div className="buttons">
          <div className="dibs-btn">
            <Button variant="outlined" color="error" size="large">
              <Typography
                fontFamily="Nanum Gothic, sans-serif"
                className="button-text"
              >
                ♥️ 찜하기
              </Typography>
            </Button>
          </div>
          <div className="reserve-btn">
            <Button variant="contained" color="secondary" size="large">
              <Typography
                fontFamily="Nanum Gothic, sans-serif"
                className="button-text"
              >
                예매하러 가기
              </Typography>
            </Button>
          </div>
          <div className="share-btn">
            <ShareIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
}
