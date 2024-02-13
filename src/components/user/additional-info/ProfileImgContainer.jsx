import { useRef, useState } from "react";
import "./ProfileImgContainer.scss";
import Button from "@mui/material/Button";
import { AlertCustom } from "../../common/alert/Alerts";

export default function ProfileImgContainer({
  selectedImg,
  setSelectedImg,
  profileUrl,
  setToDeleteImg,
}) {
  const [alert, setAlert] = useState(null);

  const imgInput = useRef(null);

  const getPresignedUrl = async (file) => {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file?.size > maxSizeInBytes) {
      setAlert({
        severity: "error",
        title: "제한 용량 초과",
        content: "5MB 이하의 사진으로 등록해 주세요.",
        closeBtn: false,
        onclick: () => setAlert(null),
        onclose: () => setAlert(null),
      });

      return;
    }

    try {
      const presignRes = await fetch(
        "https://dailytopia2.shop/api/presigned-urls",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: file.name }),
        }
      );

      if (presignRes.ok) {
        const data = await presignRes.json();
        const { presigned_url, public_url } = data;
        const uploadRes = await fetch(presigned_url, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (uploadRes.ok) {
          setSelectedImg(public_url);
          if (
            alert?.title === "사진 등록 실패" ||
            alert?.title === "제한 용량 초과"
          ) {
            setAlert(null);
          }
        } else {
          setAlert({
            severity: "error",
            title: "사진 등록 실패",
            content: "사진 등록에 실패하였습니다. 다시 시도해 주세요.",
            closeBtn: false,
            onclick: () => setAlert(null),
            onclose: () => setAlert(null),
          });
        }
      } else {
        setAlert({
          severity: "error",
          title: "사진 등록 실패",
          content: "사진 등록에 실패하였습니다. 다시 시도해 주세요.",
          closeBtn: false,
          onclick: () => setAlert(null),
          onclose: () => setAlert(null),
        });
      }
    } catch (err) {
      setAlert({
        severity: "error",
        title: "사진 등록 실패",
        content: "사진 등록에 실패하였습니다. 다시 시도해 주세요.",
        closeBtn: false,
        onclick: () => setAlert(null),
        onclose: () => setAlert(null),
      });
    }
  };

  const handleProfileImgClick = () => {
    imgInput.current.click();
  };

  const handleBasicImgClick = () => {
    if (selectedImg !== profileUrl && selectedImg !== "/default_user_img.svg")
      setToDeleteImg((pre) => [...pre, selectedImg]);
    setSelectedImg("/default_user_img.svg");
  };

  const profileImgReset = () => {
    if (selectedImg !== profileUrl && selectedImg !== "/default_user_img.svg")
      setToDeleteImg((pre) => [...pre, selectedImg]);
    setSelectedImg(profileUrl);
  };

  return (
    <>
      {alert && (
        <AlertCustom
          severity={alert.severity}
          title={alert.title}
          content={alert.content}
          open={Boolean(alert)}
          checkBtn="확인"
          onclick={alert.onclick}
          closeBtn={alert.closeBtn ? "취소" : null}
          onclose={alert.onclose}
          btnCloseHidden={!alert.closeBtn}
        />
      )}
      <div className="profile-img-container">
        <input
          type="file"
          ref={imgInput}
          onChange={(e) => {
            if (
              selectedImg !== profileUrl &&
              selectedImg !== "/default_user_img.svg"
            )
              setToDeleteImg((pre) => [...pre, selectedImg]);
            getPresignedUrl(e.target.files[0]);
          }}
        />
        <div className="profile-img" onClick={() => handleProfileImgClick()}>
          {selectedImg === profileUrl ? (
            <img src={profileUrl} alt="기존 프로필 이미지" />
          ) : selectedImg === "/default_user_img.svg" ? (
            <img src={"/default_user_img.svg"} alt="기본 제공 프로필 이미지" />
          ) : (
            <img src={selectedImg} alt="사용자가 선택한 프로필 이미지" />
          )}
        </div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleProfileImgClick()}
          sx={{ marginTop: "10px" }}
        >
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
        <p style={{ color: "#808080", fontSize: "13px", fontWeight: 400 }}>
          * 사진은 5MB 이하로만 가능합니다.
        </p>
      </div>
    </>
  );
}
