import { useRef, useState } from "react";
import "./ProfileImgContainer.scss";
import Button from "@mui/material/Button";

export default function ProfileImgContainer({ selectedImg, setSelectedImg, profileUrl }) {
  const imgInput = useRef(null);

  const handleProfileImgClick = () => {
    imgInput.current.click();
  };

  const handleBasicImgClick = () => {
    setSelectedImg("/basic-profile-img.png");
  };

  const profileImgReset = () => {
    setSelectedImg(profileUrl);
  };

  return (
    <div className="profile-img-container">
      <input type="file" ref={imgInput} onChange={(e) => setSelectedImg(e.target.files[0])} />
      <div className="profile-img" onClick={() => handleProfileImgClick()}>
        {selectedImg === profileUrl ? (
          <img src={profileUrl} alt="기존 프로필 이미지" />
        ) : selectedImg === "/basic-profile-img.png" ? (
          <img src="/basic-profile-img.png" alt="기본 제공 프로필 이미지" />
        ) : (
          <img src={URL.createObjectURL(selectedImg)} alt="사용자가 선택한 프로필 이미지" />
        )}
      </div>
      <Button variant="contained" color="secondary" onClick={() => handleProfileImgClick()} sx={{ marginTop: "10px" }}>
        프로필 사진 변경
      </Button>
      {selectedImg !== profileUrl ? (
        <Button color="ourGray" onClick={() => profileImgReset()}>
          or 소셜 프로필 사용
        </Button>
      ) : (
        <Button color="ourGray" onClick={() => handleBasicImgClick()}>
          or 기본 이미지 사용
        </Button>
      )}
    </div>
  );
}
