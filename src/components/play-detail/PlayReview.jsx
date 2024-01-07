import React, { useState } from "react";
import "./PlayReview.scss";
import AverageRatingBox from "./play-review-metrials/AverageRatingBox";
import ReviewForm from "./play-review-metrials/ReviewForm";
import ReviewErrorBox from "./play-review-metrials/ReviewErrorBox";
import PlayReviewHeader from "./play-review-metrials/PlayReviewHeader";
import PlayReviewListBox from "./play-review-metrials/PlayReviewListBox";
import PlayReviewContentBox from "./play-review-metrials/PlayReviewContentBox";
import Pagination from "@mui/material/Pagination";

export default function PlayReview({ reviews, isLoggedIn }) {
  const [isReviewFormOpened, setIsReviewFormOpened] = useState(false);

  return (
    <div className="play-review-container">
      <AverageRatingBox
        isLoggedIn={isLoggedIn}
        setIsReviewFormOpened={setIsReviewFormOpened}
      />
      {isReviewFormOpened ? (
        <ReviewForm
          purpose="작성"
          setIsReviewFormOpened={setIsReviewFormOpened}
        />
      ) : null}
      {/* <ReviewForm purpose="수정" contents={{}} /> */}
      <PlayReviewHeader count="15" />
      <div className="play-review-list">
        {/* <div className="play-review-not-exsist">리뷰가 존재하지 않습니다.</div> */}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <Pagination
            count={1}
            color="secondary"
            size={innerWidth >= 481 ? "large" : "small"}
          />
        </div>
      </div>
    </div>
  );
}
