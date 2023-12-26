import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AverageRatingBox.scss";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AlertCustom } from "../../common/alert/Alerts";

export default function AverageRatingBox({
  isLoggedIn,
  setIsReviewFormOpened,
}) {
  const navigate = useNavigate();

  // 로그인 필요 알람
  const [needLoginAlert, setNeedLoginAlert] = useState(null);

  const handleReviewBtnClick = () => {
    // 로그인이 되어 있지 않은 경우 로그인 페이지로 이동 알람
    if (!isLoggedIn) {
      setNeedLoginAlert(
        "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?"
      );
    } else {
      // 로그인이 되어 있을 경우 리뷰 작성창이 열림
      setIsReviewFormOpened(true);
    }
  };
  return (
    <>
      {needLoginAlert && (
        <AlertCustom
          title={"로그인 필요"}
          content={needLoginAlert}
          open={Boolean(needLoginAlert)}
          onclose={() => setNeedLoginAlert(null)}
          onclick={() => navigate("/signup-in")}
          severity={"info"}
          checkBtn={"확인"}
          closeBtn={"취소"}
        />
      )}
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
          <Button
            color="inherit"
            state="focused"
            variant="outlined"
            size="large"
            onClick={handleReviewBtnClick}
          >
            <Typography
              fontFamily="Nanum Gothic, sans-serif"
              className="review-button-text"
            >
              관람 후기 작성하기
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
}
