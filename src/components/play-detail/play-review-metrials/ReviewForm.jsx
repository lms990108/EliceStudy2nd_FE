import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.scss";
import { AlertCustom } from "../../common/alert/Alerts";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReviewErrorBox from "./ReviewErrorBox";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReviewForm({
  purpose,
  review_id,
  review_title,
  review_author,
  review_content,
  review_rate,
  review_image_urls,
  setIsReviewFormOpened,
  showId,
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(review_title || "");
  const [content, setContent] = useState(
    review_content === "null" ? "" : review_content ? review_content : ""
  );
  const [ratingValue, setRatingValue] = useState(review_rate || 0);
  const [photo, setPhoto] = useState(
    review_image_urls?.length ? review_image_urls : []
  );
  console.log(photo);
  // fixed된 알림을 띄우기 위한 상태
  const [alert, setAlert] = useState(null);
  // // 리뷰 필수 기재 항목 검증
  // const [reviewValidation, setReviewValidation] = useState(true);
  // 리뷰 에러 box에 담을 에러 문구
  const [reviewErrorText, setReviewErrorText] = useState("");

  const fileInput = useRef(null);

  const handleImgUploadBtnClick = () => {
    fileInput.current.click();
  };

  const handleCancelBtnClick = () => {
    setAlert({
      title: `리뷰 ${purpose} 취소`,
      content: `리뷰 ${purpose}을 취소하시겠습니까? ${purpose}한 글 내용은 저장되지 않습니다.`,
      open: true,
      onclose: () => setAlert(null),
      onclick: () => setIsReviewFormOpened(false),
      severity: "warning",
      checkBtn: "확인",
      closeBtn: "취소",
    });
  };

  const handleDeletePhoto = (itemIdx) => {
    setPhoto((prev) => {
      const newArray = [...prev];
      newArray.splice(itemIdx, 1);
      return newArray;
    });
  };

  const handleImageSelect = (image) => {
    if (photo.length === 3) {
      setReviewErrorText("사진은 최대 3장만 업로드 가능합니다.");
    } else if (!image) {
      return;
    } else {
      setPhoto((prev) => [...prev, image]);
    }
  };

  // 리뷰 작성 or 수정 완료 후 제출 시
  const handleCompelteBtnClick = () => {
    if (!title || !ratingValue || !content) {
      // setReviewValidation(false);
      setReviewErrorText(
        "제목, 별점, 내용은 필수 입력값입니다. 입력 후 다시 제출해 주세요."
      );
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("rate", ratingValue);
    formData.append("review_images", photo);

    formData.forEach(function (value, key) {
      console.log(key + ", " + value);
    });

    if (purpose === "작성") postReview(formData);
    else if (purpose === "수정") patchReview(formData);
  };

  // 리뷰 '작성' 시의 fetch
  const postReview = (formData) => {
    fetch(`https://dailytopia2.shop/api/reviews/${showId}`, {
      credentials: "include",
      body: formData,
      method: "POST",
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setAlert({
            title: `리뷰 ${purpose} 완료`,
            content: `리뷰 ${purpose}이 완료되었습니다.`,
            open: true,
            onclose: () => {
              setAlert(null);
              setIsReviewFormOpened(false);
              location.reload();
            },
            onclick: () => {
              setIsReviewFormOpened(false);
              location.reload();
            },
            severity: "success",
            checkBtn: "확인",
            btnCloseHidden: true,
          });
        } else if (res.status === 401 || res.status === 403) {
          setAlert({
            title: "로그인 필요",
            content:
              "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?",
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
        } else if (res.status === 413) {
          setAlert({
            title: "리뷰 업로드 실패",
            content:
              "파일 크기가 제한을 초과하였습니다. 파일 용량을 확인해 주세요.",
            open: true,
            onclose: () => setAlert(null),
            severity: "error",
          });
        } else {
          setAlert({
            title: "리뷰 업로드 실패",
            content: "리뷰 업로드에 실패하였습니다.",
            open: true,
            onclose: () => setAlert(null),
            severity: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          title: "리뷰 업로드 실패",
          content: "리뷰 업로드에 실패하였습니다.",
          open: true,
          onclose: () => setAlert(null),
          severity: "error",
        });
      });
  };

  // 리뷰 '수정' 시의 fetch
  const patchReview = (formData) => {
    fetch(`https://dailytopia2.shop/api/reviews/${review_id}`, {
      credentials: "include",
      body: formData,
      method: "PATCH",
    })
      .then((res) => {
        if (res.ok) {
          setAlert({
            title: `리뷰 ${purpose} 완료`,
            content: `리뷰 ${purpose}이 완료되었습니다.`,
            open: true,
            onclose: () => {
              setAlert(null);
              setIsReviewFormOpened(false);
              location.reload();
            },
            onclick: () => {
              setIsReviewFormOpened(false);
              location.reload();
            },
            severity: "success",
            checkBtn: "확인",
            btnCloseHidden: true,
          });
        } else if (res.status === 401 || res.status === 403) {
          setAlert({
            title: "로그인 필요",
            content:
              "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?",
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
        } else if (res.status === 413) {
          setAlert({
            title: "리뷰 업로드 실패",
            content:
              "파일 크기가 제한을 초과하였습니다. 파일 용량을 확인해 주세요.",
            open: true,
            onclose: () => setAlert(null),
            severity: "error",
          });
        } else {
          setAlert({
            title: "리뷰 업로드 실패",
            content: "리뷰 업로드에 실패하였습니다.",
            open: true,
            onclose: () => setAlert(null),
            severity: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          title: "리뷰 업로드 실패",
          content: "리뷰 업로드에 실패하였습니다.",
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
      {/* <ReviewErrorBox errorText="제목과 별점은 필수 입력값입니다." /> */}
      <form className="review-form-container">
        <h2>관람 후기 {purpose}</h2>
        <div className="review-title-box">
          <h3>* 제목</h3>
          <TextField
            variant="standard"
            minRows="false"
            maxRows="true"
            rows="8"
            InputProps={{ placeholder: "제목을 입력해주세요." }}
            sx={{ width: 550 }}
            inputProps={{ maxLength: 30 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="review-author-box">
          <h3>작성자</h3>
          <p>{review_author}</p>
        </div>
        <div className="review-content-box">
          <h3>* 후기 내용</h3>
          <TextField
            variant="outlined"
            multiline
            rows={10}
            InputProps={{ placeholder: "내용을 입력해주세요." }}
            sx={{ width: 1000, height: 280 }}
            inputProps={{ maxLength: 500 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="review-rating-box">
          <h3>* 별점</h3>
          <Rating
            name="simple-controlled"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            precision={0.5}
          />
        </div>
        <div className="reivew-photo-upload-box">
          <h3>사진 첨부</h3>
          <Button
            className="file-upload-btn"
            color="darkGray"
            variant="outlined"
            size="small"
            startIcon={<DriveFolderUploadIcon />}
            onClick={() => handleImgUploadBtnClick()}
          >
            <label htmlFor="image">파일 찾기</label>
          </Button>
          <input
            type="file"
            className="file-input"
            ref={fileInput}
            onChange={(e) => handleImageSelect(e.target.files[0])}
            accept=".png, .jpg, .jpeg"
          />
        </div>
        <div style={{ display: "flex" }}>
          {photo.length
            ? photo.map((item, idx) => (
                <div key={idx}>
                  <img
                    src={
                      typeof item === "string"
                        ? item
                        : URL.createObjectURL(item)
                    }
                    alt="리뷰 첨부 이미지"
                  />
                  <DeleteIcon
                    color="ourGray"
                    sx={{
                      cursor: "pointer",
                      paddingLeft: "10px",
                      position: "relative",
                      bottom: "120px",
                      paddingRight: "30px",
                    }}
                    onClick={() => handleDeletePhoto(idx)}
                  />
                </div>
              ))
            : null}
        </div>
        <div className="review-guide-text">
          <p>- * 표시가 되어 있는 항목은 필수 기재 항목입니다.</p>
          <p>
            - 제목은 띄어쓰기 포함 30자, 내용은 띄어쓰기 포함 500자 제한입니다.
          </p>
          <p>- 사진은 3장까지 업로드 가능합니다.</p>
        </div>
        {reviewErrorText && <ReviewErrorBox errorText={reviewErrorText} />}
        <div className="play-review-btn">
          <Button
            variant="contained"
            className="play-review-btn"
            onClick={() => handleCompelteBtnClick()}
          >
            {purpose} 완료
          </Button>
          <Button
            variant="outlined"
            color="error"
            className="play-review-btn"
            onClick={() => handleCancelBtnClick()}
          >
            {purpose} 취소
          </Button>
        </div>
      </form>
    </>
  );
}
