import React, { useState } from "react";
import "./PlayReviewListBox.scss";
import "../../common/themes/theme";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Rating from "@mui/material/Rating";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlayReviewContentBox from "./PlayReviewContentBox";
import { AlertCustom } from "../../common/alert/Alerts";

export default function PlayReviewListBox({ reviewInfo, setIsReviewFormOpened, review_id, scrollRef }) {
  const { isAuthorLogined, author, date, title, isContentExsist, isPhotoExsist, rating, photo, content } = reviewInfo;

  const [expended, setExpended] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleDeleteBtnClick = () => {
    setAlert({
      title: `리뷰 삭제`,
      content: `리뷰를 정말 삭제하시겠습니까?`,
      open: true,
      onclose: () => setAlert(null),
      onclick: () => deleteReview(review_id),
      severity: "warning",
      checkBtn: "확인",
      closeBtn: "취소",
    });
  };

  const deleteReview = (review_id) => {
    console.log(review_id);
    fetch(`https://dailytopia2.shop/api/reviews/${review_id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAlert({
            title: `삭제 성공`,
            content: `리뷰 삭제에 성공하였습니다.`,
            open: true,
            onclose: () => {
              setAlert(null);
              location.reload();
            },
            onclick: () => {
              setAlert(null);
              location.reload();
            },
            severity: "success",
            checkBtn: "확인",
            btnCloseHidden: true,
          });
        } else if (res.status === 401 || res.status === 403) {
          setAlert({
            title: "로그인 필요",
            content: "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?",
            open: true,
            onclose: () => setAlert(null),
            onclick: () =>
              navigate("/signup-in", {
                state: { from: `${location.pathname}${location.search}` },
              }),
            severity: "warning",
            checkBtn: "확인",
            closeBtn: "취소",
          });
        } else {
          setAlert({
            title: `삭제 실패`,
            content: `리뷰 삭제에 실패하였습니다.`,
            open: true,
            onclose: () => setAlert(null),
            severity: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          title: `삭제 실패`,
          content: `리뷰 삭제에 실패하였습니다.`,
          open: true,
          onclose: () => setAlert(null),
          severity: "error",
        });
      });
  };

  return (
    <>
      {alert && (
        <AlertCustom
          title={alert.title}
          content={alert.content}
          open={alert.open}
          onclose={alert.onclose}
          onclick={alert.onclick}
          severity={alert.severity}
          checkBtn={alert.checkBtn}
          closeBtn={alert.closeBtn}
          btnCloseHidden={alert.btnCloseHidden}
        />
      )}
      <div className="play-review-list-box">
        <div className="review-author-and-date">
          <p>
            {isAuthorLogined ? "(MY)" : ""}
            {author.length >= 10 ? `${author.slice(0, 9)}...` : author}
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
              color="ourGray"
              fontSize="large"
              onClick={() => {
                setExpended(!expended);
              }}
            />
          )}
          {(isContentExsist || isPhotoExsist) && expended && (
            <KeyboardArrowUpIcon
              className="play-review-detail-arrow"
              color="ourGray"
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
          {isAuthorLogined ? <DeleteIcon className="play-review-delete-icon" color="ourGray" onClick={() => handleDeleteBtnClick()} /> : null}
        </div>
      </div>
      {(isContentExsist || isPhotoExsist) && expended ? (
        <PlayReviewContentBox
          reviewContentInfo={{
            photoSrc: photo,
            content: content,
            isAuthorLogined,
          }}
          setIsReviewFormOpened={setIsReviewFormOpened}
          scrollRef={scrollRef}
        />
      ) : null}
    </>
  );
}
