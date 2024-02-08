import React, { useState, useEffect, useRef } from "react";
import "./PlayReview.scss";
import AverageRatingBox from "./play-review-metrials/AverageRatingBox";
import ReviewForm from "./play-review-metrials/ReviewForm";
import PlayReviewHeader from "./play-review-metrials/PlayReviewHeader";
import PlayReviewListBox from "./play-review-metrials/PlayReviewListBox";
import PaginationBox from "./play-review-metrials/PaginationBox";
import { AlertCustom } from "../common/alert/Alerts";
import CircularProgress from "@mui/material/CircularProgress";

export default function PlayReview({
  showId,
  isLoggedIn,
  author,
  averageRate,
  state,
  userId,
}) {
  const scrollRef = useRef(null);

  // 로딩중 여부
  const [isLoading, setIsLoading] = useState(true);
  // 리뷰 작성창이 열렸는지 여부
  const [isReviewFormOpened, setIsReviewFormOpened] = useState(false);
  // 현재 연극의 리뷰 (페이지네이션 적용)
  const [reviews, setReviews] = useState(null);
  // 현재 페이지
  const [curPage, setCurPage] = useState(1);
  // 해당 연극 총 리뷰수
  const [totalCount, setTotalCount] = useState(0);
  // 현재 연극에 현재 로그인되어 있는 유저가 리뷰를 달았는지, 작성한 리뷰 정보에 대한 상태
  const [userReview, setUserReview] = useState(null);
  // 리뷰 정렬 기준
  const [sortStandard, setSortStandard] = useState("recent");
  // 알림
  const [alert, setAlert] = useState(null);

  // 리뷰 가져오기
  const getReviews = () => {
    fetch(
      `https://dailytopia2.shop/api/reviews?showId=${showId}&page=${curPage}&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
        setTotalCount(data.total);
      })
      .catch((err) => {
        setAlert({
          title: "오류",
          content: "리뷰 데이터를 받아오는 데 실패했습니다.",
          severity: "error",
          open: true,
          onclose: () => setAlert(null),
        });
      });
  };

  // 현재 로그인한 유저가 작성한 리뷰 가져오기
  const getUserReview = () => {
    if (userId) {
      fetch(
        `https://dailytopia2.shop/api/reviews?showId=${showId}&userId=${userId}`
      )
        .then((res) => res.json())
        .then((data) => {
          let userReviewData = null;
          if (data.data.length) {
            userReviewData = {
              isUserReviewed: true,
              review: data.data[0],
            };
            setUserReview(userReviewData);
            setIsLoading(false);
          } else {
            userReviewData = {
              isUserReviewed: false,
            };
            setUserReview(userReviewData);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserReview({
        isUserReviewed: false,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
    getUserReview();
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
      <div className="play-review-container">
        {!isLoading && userReview && reviews && (
          <>
            <AverageRatingBox
              isLoggedIn={isLoggedIn}
              setIsReviewFormOpened={setIsReviewFormOpened}
              count={totalCount}
              averageRate={averageRate}
              state={state}
              purpose={userReview.isUserReviewed ? "수정" : "작성"}
            />
            <div ref={scrollRef}></div>
            {isReviewFormOpened ? (
              <ReviewForm
                purpose={userReview.isUserReviewed ? "수정" : "작성"}
                review_id={userReview.review?._id}
                review_title={userReview.review?.title}
                review_author={author}
                review_content={userReview.review?.content}
                review_rate={userReview.review?.rate}
                review_image_urls={userReview.review?.image_urls}
                setIsReviewFormOpened={setIsReviewFormOpened}
                showId={showId}
                getReviews={getReviews}
                getUserReview={getUserReview}
              />
            ) : null}

            <PlayReviewHeader
              count={totalCount}
              sortStandard={sortStandard}
              setSortStandard={setSortStandard}
              setCurPage={setCurPage}
            />

            {reviews.length ? (
              <div className="play-review-list">
                {reviews.map((review) => (
                  <PlayReviewListBox
                    reviewInfo={{
                      isAuthorLogined: author == review.user_nickname,
                      author: review.user_nickname
                        ? review.user_nickname
                        : "작성자",
                      date: review.created_at.split("T")[0],
                      title: review.title,
                      isContentExsist:
                        review.content !== "null" && review.content,
                      isPhotoExsist: Boolean(review.image_urls.length),
                      rating: review.rate,
                      photo: review.image_urls,
                      content: review.content,
                    }}
                    setIsReviewFormOpened={setIsReviewFormOpened}
                    review_id={review._id}
                    scrollRef={scrollRef}
                    getReviews={getReviews}
                    getUserReview={getUserReview}
                    key={review._id}
                  />
                ))}
                <PaginationBox
                  showId={showId}
                  curPage={curPage}
                  setCurPage={setCurPage}
                  setAlert={setAlert}
                  setReviews={setReviews}
                  totalCount={totalCount}
                />
              </div>
            ) : (
              <div className="play-review-not-exsist">
                리뷰가 존재하지 않습니다.
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "30px 0",
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
    </>
  );
}
