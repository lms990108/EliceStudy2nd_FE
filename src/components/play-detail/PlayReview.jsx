import React, { useState, useEffect } from "react";
import "./PlayReview.scss";
import AverageRatingBox from "./play-review-metrials/AverageRatingBox";
import ReviewForm from "./play-review-metrials/ReviewForm";
import ReviewErrorBox from "./play-review-metrials/ReviewErrorBox";
import PlayReviewHeader from "./play-review-metrials/PlayReviewHeader";
import PlayReviewListBox from "./play-review-metrials/PlayReviewListBox";
import PlayReviewContentBox from "./play-review-metrials/PlayReviewContentBox";
import PaginationBox from "./play-review-metrials/PaginationBox";
import { AlertCustom } from "../common/alert/Alerts";
import { Pagination } from "@mui/material";

export default function PlayReview({ showId, isLoggedIn }) {
  // 로딩중 여부
  const [isLoading, setIsLoading] = useState(true);
  // 리뷰 작성창이 열렸는지 여부
  const [isReviewFormOpened, setIsReviewFormOpened] = useState(false);
  // 현재 연극의 리뷰 (페이지네이션 적용)
  const [reviews, setReviews] = useState(null);
  // 리뷰 페이지네이션에서 현재 페이지
  const [curPage, setCurPage] = useState(1);
  // 알림
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetch(
      `https://dailytopia2.shop/api/reviews?showId=${showId}&page=1&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
        setIsLoading(false);
      })
      .catch(() => {
        setAlert({
          title: "오류",
          content: "리뷰 데이터를 받아오는 데 실패했습니다.",
          severity: "error",
          open: true,
          onclose: () => setAlert(null),
        });
      });
  }, []);

  return (
    <>
      {alert && (
        <AlertCustom
          title={alert.title}
          content={alert.content}
          severity={alert.severity}
          open={alert.open}
          onclose={alert.onclose}
        />
      )}
      {!isLoading && (
        <div className="play-review-container">
          <AverageRatingBox
            isLoggedIn={isLoggedIn}
            setIsReviewFormOpened={setIsReviewFormOpened}
            reviews={reviews}
          />
          {isReviewFormOpened ? (
            <ReviewForm
              purpose="작성"
              setIsReviewFormOpened={setIsReviewFormOpened}
              showId={showId}
            />
          ) : null}
          {/* <ReviewForm purpose="수정" contents={{}} /> */}
          <PlayReviewHeader count={reviews.length} />
          <div className="play-review-list">
            {!reviews.length && (
              <div className="play-review-not-exsist">
                리뷰가 존재하지 않습니다.
              </div>
            )}
            {/* {reviews.length && (
            <>
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: true,
                  author: "소유빈",
                  date: "2023-11-02",
                  title: "환상적인 모험: 미지의 세계에서의 뜨거운 여정",
                  isContentExsist: true,
                  isPhotoExsist: true,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: true,
                  isPhotoExsist: true,
                  rating: parseFloat("2.0"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PlayReviewListBox
                reviewInfo={{
                  isAuthorLogined: false,
                  author: "홍길동",
                  date: "2023-11-02",
                  title: "연극 별로임",
                  isContentExsist: false,
                  isPhotoExsist: false,
                  rating: parseFloat("4.5"),
                }}
              />
              <PaginationBox
                reviews={reviews}
                curPage={curPage}
                setCurPage={setCurPage}
                setAlert={setAlert}
                setReviews={setReviews}
              />
            </>
          )} */}
          </div>
        </div>
      )}
    </>
  );
}
