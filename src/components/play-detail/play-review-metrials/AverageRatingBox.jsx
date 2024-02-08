import React, { useContext } from "react";
import "./AverageRatingBox.scss";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AlertCustom } from "../../common/alert/Alerts";
import Tooltip from "@mui/material/Tooltip";
import { AlertContext } from "../../../App";

export default function AverageRatingBox({
  isLoggedIn,
  setIsReviewFormOpened,
  count,
  averageRate,
  state,
  purpose,
}) {
  // 로그인 필요 알람
  const { openLoginAlert, setOpenLoginAlert } = useContext(AlertContext);

  const handleReviewBtnClick = () => {
    // 로그인이 되어 있지 않은 경우 로그인 페이지로 이동 알람
    if (!isLoggedIn) {
      setOpenLoginAlert(true);
    } else {
      // 로그인이 되어 있을 경우 리뷰 작성창이 열림
      setIsReviewFormOpened(true);
    }
  };
  return (
    <>
      {openLoginAlert && (
        <AlertCustom
          title={alert.title}
          content={alert.content}
          open={alert.open}
          onclose={alert.onclose}
          severity={alert.severity}
        />
      )}
      <div className="average-rating-box">
        <div className="star-and-rating">
          <h2>평균 평점</h2>
          <Rating
            value={count ? averageRate : 0}
            readOnly
            size="large"
            precision={0.5}
          />
          <span className="rating">
            {count ? `${averageRate.toFixed(1)} ` : "0.0 "}
          </span>
          <p className="rating-addtional-text">
            * 아래의 관람 후기들을 바탕으로 한 평균 평점입니다.
          </p>
        </div>
        {state === "공연예정" ? (
          <Tooltip
            title="공연 예정인 연극에는 리뷰를 작성할 수 없습니다."
            arrow
          >
            <div className="review-button">
              <Button
                color="inherit"
                state="focused"
                variant="outlined"
                disabled
              >
                <Typography>관람 후기 작성하기</Typography>
              </Button>
            </div>
          </Tooltip>
        ) : (
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
                관람 후기 {purpose}하기
              </Typography>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
