import React, { useState } from "react";
import "./PlayReview.scss";
import AverageRatingBox from "./play-review-metrials/AverageRatingBox";
import ReviewForm from "./play-review-metrials/ReviewForm";
import ReviewErrorBox from "./play-review-metrials/ReviewErrorBox";
import PlayReviewHeader from "./play-review-metrials/PlayReviewHeader";
import PlayReviewListBox from "./play-review-metrials/PlayReviewListBox";
import PlayReviewContentBox from "./play-review-metrials/PlayReviewContentBox";
import PagenationBox from "../play-list/PaginationBox";

export default function PlayReview() {
  return (
    <div className="play-review-container">
      <AverageRatingBox />
      <ReviewForm purpose="작성" />
      <ReviewErrorBox errorText="제목과 별점은 필수 입력값입니다." />
      <ReviewForm purpose="수정" contents={{}} />
      <ReviewErrorBox errorText="제목과 별점은 필수 입력값입니다." />
      <PlayReviewHeader count="15" />
      <div className="play-review-list">
        {/* <div className="play-review-not-exsist">리뷰가 존재하지 않습니다.</div> */}
        <PlayReviewListBox
          reviewInfo={{
            isAuthorLogined: true,
            author: "소유빈",
            date: "2023-11-02",
            title: "연극 너무너무 재미있었어요~",
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
        <PagenationBox />
      </div>
    </div>
  );
}
