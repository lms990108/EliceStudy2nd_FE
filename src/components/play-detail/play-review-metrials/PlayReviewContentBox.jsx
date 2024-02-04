import { useState } from "react";
import "./PlayReviewContentBox.scss";
import Button from "@mui/material/Button";
import ImageExpandModal from "../../../components/common/modal/ImageExpandModal";

export default function PlayReviewContentBox({
  reviewContentInfo,
  setIsReviewFormOpened,
  scrollRef,
}) {
  const { photoSrc, content, isAuthorLogined } = reviewContentInfo;

  const [clickedPhoto, setClickedPhoto] = useState(null);

  const handleModifyBtnClick = () => {
    setIsReviewFormOpened(true);

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReviewPhotoClick = (src) => {
    setClickedPhoto(src);
  };

  return (
    <div className="play-review-content-container">
      {clickedPhoto && (
        <ImageExpandModal
          imgSrc={clickedPhoto}
          setClickedPhoto={setClickedPhoto}
        />
      )}
      {content ? (
        <p className="play-review-content">
          {!content || content === "null" ? "" : content}
        </p>
      ) : null}
      {photoSrc.length
        ? photoSrc.map((src, idx) => (
            <img
              src={src}
              className="play-review-photo"
              key={idx}
              onClick={() => handleReviewPhotoClick(src)}
            />
          ))
        : null}
      <div className="play-review-modify-btn">
        {isAuthorLogined && (
          <Button variant="outlined" onClick={() => handleModifyBtnClick()}>
            수정하기
          </Button>
        )}
      </div>
    </div>
  );
}
