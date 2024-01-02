import React from "react";
import "./PlayDetailTop.scss";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

export default function PlayDetailTop({
  age,
  start_date,
  end_date,
  location,
  poster,
  price,
  runtime,
  state,
  title,
  reviews,
}) {
  return (
    <div className="play-detail-top-container">
      <div className="play-detail-top">
        <div className="play-poster">
          <div className="poster-box">
            <img src={poster} alt={`${title} 포스터`} />
          </div>
        </div>
        <div className="play-info">
          <h1>연극 &lt;{title}&gt;</h1>
          <hr />
          <div>
            <h3>상영기간</h3>
            <p>{`${start_date.split("T")[0]} ~ ${end_date.split("T")[0]}`}</p>
          </div>
          {/* <div>
            <h3>예매기간</h3>
            <p>2023.11.01 ~ 2023.11.12</p>
          </div> */}
          <div>
            <h3>상영장소</h3>
            <p>{location}</p>
          </div>
          <div>
            <h3>관람시간</h3>
            <p>{runtime}</p>
          </div>
          <div>
            <h3>관람등급</h3>
            <p>{age}</p>
          </div>
          <div>
            <h3>가격정보</h3>
            <p>{price}</p>
            {/* <p>R석 - 45,000원</p>
            <p>S석 - 35,000원</p> */}
          </div>
          <div>
            <h3>평점</h3>
            {/* {!reviews.length ? (
              <p> */}
            <Rating value={0} readOnly />
            {/* </p>
            ) : (
              <p>
                <Rating value={4} readOnly />
              </p>
            )} */}
          </div>
        </div>
      </div>
      <div className="play-detail-buttons">
        <div className="share-btn">
          <ShareIcon fontSize="medium" />
          <p>공유하기</p>
        </div>
        <div className="another-btn">
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
        </div>
      </div>
    </div>
  );
}
