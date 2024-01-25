import React, { useState, useRef } from "react";
import "./ReviewForm.scss";
import { AlertCustom } from "../../common/alert/Alerts";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReviewErrorBox from "./ReviewErrorBox";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReviewForm({ purpose, setIsReviewFormOpened, showId }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [photo, setPhoto] = useState(null);
  // fixed된 알림을 띄우기 위한 상태
  const [alert, setAlert] = useState(null);
  // 리뷰 필수 기재 항목 검증
  const [reviewValidation, setReviewValidation] = useState(true);

  const fileInput = useRef(null);

  const handleImgUploadBtnClick = () => {
    fileInput.current.click();
  };

  const handleCancelBtnClick = () => {
    setAlert({
      title: "리뷰 작성 취소",
      content: `리뷰 ${purpose}을 취소하시겠습니까? 글 내용은 저장되지 않습니다.`,
      open: true,
      onclose: () => setAlert(null),
      onclick: () => setIsReviewFormOpened(false),
      severity: "warning",
      checkBtn: "확인",
      closeBtn: "취소",
    });
  };

  const handleCompelteBtnClick = () => {
    if (!title || !ratingValue) {
      setReviewValidation(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("rate", ratingValue);
    formData.append("photo", photo);

    console.log(title, content, ratingValue, photo);

    // fetch(`https://dailytopia2.shop/api/reviews/${showId}`, {
    //   credentials: "include",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setAlert({
    //       title: `리뷰 ${purpose} 완료`,
    //       content: `리뷰 ${purpose}이 완료되었습니다.`,
    //       open: true,
    //       onclose: () => {
    //         setAlert(null);
    //         setIsReviewFormOpened(false);
    //       },
    //       onclick: () => setIsReviewFormOpened(false),
    //       severity: "success",
    //       checkBtn: "확인",
    //       btnCloseHidden: true,
    //     });
    //   })
    //   .catch(() => {
    //     setAlert({
    //       title: "리뷰 업로드 실패",
    //       content: "리뷰 업로드에 실패하였습니다.",
    //       open: true,
    //       onclose: () => setAlert(null),
    //       severity: "error",
    //     });
    //   });
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
        {purpose === "작성" && <h2>관람 후기 작성</h2>}
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
          <p>{localStorage.getItem("nickname")}</p>
        </div>
        <div className="review-content-box">
          <h3>후기 내용</h3>
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
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        {photo && (
          <div>
            <img src={URL.createObjectURL(photo)} alt="리뷰 첨부 이미지" />
            <DeleteIcon
              color="ourGrey"
              sx={{
                paddingLeft: "10px",
                cursor: "pointer",
                position: "absolute",
              }}
              onClick={() => setPhoto(null)}
            />
          </div>
        )}
        <div className="review-guide-text">
          <p>- * 표시가 되어 있는 항목은 필수 기재 항목입니다.</p>
          <p>
            - 제목은 띄어쓰기 포함 30자, 내용은 띄어쓰기 포함 500자 제한입니다.
          </p>
          <p>- 사진은 1장만 업로드 가능합니다.</p>
        </div>
        {!reviewValidation && (
          <ReviewErrorBox errorText="제목과 별점은 필수 입력값입니다. 입력 후 다시 제출해 주세요." />
        )}
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
