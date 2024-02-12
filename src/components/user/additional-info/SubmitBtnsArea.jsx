import { useState } from "react";
import "./SubmitBtnsArea.scss";
import Button from "@mui/material/Button";
import { AlertCustom } from "../../common/alert/Alerts";
import { useNavigate } from "react-router-dom";

export default function SubmitBtnsArea({ additionalUserInfo }) {
  const navigate = useNavigate();
  const {
    id,
    nicknameInfo,
    selectedImg,
    selectedRegion,
    socialProvider,
    toDeleteImg,
  } = additionalUserInfo;

  const [alert, setAlert] = useState(null);

  const submitAdditionUserInfo = () => {
    if (!nicknameInfo.isDuplicationChecked) {
      setAlert({
        severity: "error",
        title: "닉네임 중복 확인 미완료",
        content: "닉네임 중복 확인을 마친 후 제출해 주세요.",
        closeBtn: false,
        onclick: () => setAlert(null),
        onclose: () => setAlert(null),
      });
      return;
    }

    // 회원가입 로직
    const body = {
      user_id: String(id),
      social_provider: socialProvider,
      nickname: nicknameInfo.nickname,
      interested_area: selectedRegion,
      profile_url: selectedImg,
      imageUrlsToDelete: toDeleteImg,
    };

    fetch("https://dailytopia2.shop/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          setAlert({
            severity: "success",
            title: "회원가입 완료",
            content:
              "축하합니다! TEENY BOX 회원가입이 완료되었습니다. 로그인 페이지로 이동합니다☺️",
            closeBtn: false,
            onclick: () => navigate("/signup-in"),
            onclose: () => navigate("/signup-in"),
          });
        }
      })
      .catch((err) => {
        setAlert({
          severity: "error",
          title: "회원가입 실패",
          content: "TEENY BOX 회원가입에 실패하였습니다.",
          closeBtn: false,
          onclick: () => setAlert(null),
          onclose: () => setAlert(null),
        });
      });
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
      <div className="submit-btns-area">
        <Button
          variant="contained"
          sx={{ marginRight: "15px" }}
          onClick={() => submitAdditionUserInfo()}
        >
          제출
        </Button>
      </div>
    </>
  );
}
