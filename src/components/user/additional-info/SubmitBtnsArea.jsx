import { useState } from "react";
import "./SubmitBtnsArea.scss";
import Button from "@mui/material/Button";
import { AlertCustom } from "../../common/alert/Alerts";
import { useNavigate } from "react-router-dom";

export default function SubmitBtnsArea({ additionalUserInfo }) {
  const navigate = useNavigate();
  const { id, nicknameInfo, selectedImg, selectedRegion, socialProvider } =
    additionalUserInfo;
  const [alert, setAlert] = useState(null);
  console.log(selectedImg);

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
    const formData = new FormData();
    formData.append("profile_url", selectedImg);
    formData.append("user_id", String(id));
    formData.append("social_provider", socialProvider);
    formData.append("nickname", nicknameInfo.nickname);
    formData.append("interested_area", selectedRegion);

    fetch("https://dailytopia2.shop/api/users", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        console.log(res.body);
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
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
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
