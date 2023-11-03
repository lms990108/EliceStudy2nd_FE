import React, { useState } from "react";
import "./PlayReviewListBox.scss";
import "../../common/themes/theme";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlayReviewContentBox from "./PlayReviewContentBox";

export default function PlayReviewListBox({ reviewInfo }) {
  const {
    isAuthorLogined,
    author,
    date,
    title,
    isContentExsist,
    isPhotoExsist,
    rating,
  } = reviewInfo;

  const [expended, setExpended] = useState(false);

  return (
    <>
      <div className="play-review-list-box">
        <div className="review-author-and-date">
          <p>
            {isAuthorLogined ? "(MY)" : ""} {author}
          </p>
          <p>{date}</p>
        </div>
        <div className="play-review-title">
          {isPhotoExsist ? <CameraAltIcon /> : ""} {title}
        </div>
        <div className="play-review-accordion">
          {(isContentExsist || isPhotoExsist) && !expended && (
            <KeyboardArrowDownIcon
              className="play-review-detail-arrow"
              color="ourGrey"
              fontSize="large"
              onClick={() => {
                setExpended(!expended);
              }}
            />
          )}
          {(isContentExsist || isPhotoExsist) && expended && (
            <KeyboardArrowUpIcon
              className="play-review-detail-arrow"
              color="ourGrey"
              fontSize="large"
              onClick={() => {
                setExpended(!expended);
              }}
            />
          )}
        </div>
        <div className="play-review-rating">
          <Rating name="read-only" value={rating} precision={0.5} readOnly />
        </div>
        <div className="play-review-remove">
          {isAuthorLogined ? (
            <DeleteIcon className="play-review-delete-icon" color="ourGrey" />
          ) : null}
        </div>
      </div>
      {(isContentExsist || isPhotoExsist) && expended ? (
        <PlayReviewContentBox
          reviewContentInfo={{
            photoSrc:
              "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc62jaK%2FbtrR6FXheGZ%2F5hRmAFuxAopQCmEZ5C1TE1%2Fimg.jpg",
            content:
              "코로나로 공연 전 정말 사람이 없었어요. 공연 시작 10분전 입실해 보니 관객이 저희 포함 딱 5명이라 정말 당황했어요. 그래도 금요일 저녁인데... 영업시간 제한도 1시간 연장됐는데...하지만 배우님들 정말 열연해 주셨고 처음의 부담스런 분위기도 잊고 재밌게 관람하고 왔어요. 스토리가 있고 생각 못한 반전이 있었어요.관객5명 배우3명 배우분들도 정말 기운빠지고 힘드셨을텐데 한결같이 열연하시던 모습과 그 열정에 박수 보내드려요.",
            isAuthorLogined,
          }}
        />
      ) : null}
    </>
  );
}
