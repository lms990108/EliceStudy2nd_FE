import React from "react";
import "./AverageRatingBox.scss";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function AverageRatingBox() {
  return (
    <div className="average-rating-box">
      <div className="star-and-rating">
        <h2>평균 평점</h2>
        <Rating value={4} readOnly size="large" />
        <span className="rating">4.0 / 5</span>
        <p className="rating-addtional-text">
          * 아래의 관람 후기들을 바탕으로 한 평균 평점입니다.
        </p>
      </div>
      <div className="review-button">
        <Button color="inherit" state="focused" variant="outlined" size="large">
          <Typography
            fontFamily="Nanum Gothic, sans-serif"
            className="review-button-text"
          >
            관람 후기 작성하기
          </Typography>
        </Button>
      </div>
    </div>
  );
}
