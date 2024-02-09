import { useState, useEffect } from "react";
import { GoogleRedirection } from "../../../pages/redirection/GoogleRedirection";
import { AlertCustom } from "../../../components/common/alert/Alerts";
import Loading from "../../common/state/Loading";
import "./AllLoginBtn.scss";
import googleLogo from "../../../assets/img/user/google-logo.png";

export default function Google() {
  const [popup, setPopup] = useState();
  const [alert, setAlert] = useState(null);

  const GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const googleLoginHandler = () => {
    const width = 500;
    const height = 400; // 팝업의 세로 길이 : 500
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URL}`;
    const popup = window.open(
      url,
      "로그인 중...",
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setPopup(popup);
  };

  return (
    <>
      {alert && (
        <>
          {alert.title === "정보 제공 동의 필수" ? null : alert.title ===
            "로그인 성공" ? (
            <Loading isLogin={true} />
          ) : (
            <Loading />
          )}
          <AlertCustom
            open={true}
            title={alert.title}
            content={alert.content}
            severity={alert.severity}
            btnCloseHidden={true}
            onclose={alert.onclose}
            onclick={alert.onclick}
            checkBtn={alert.checkBtn}
          />
        </>
      )}
      <button onClick={() => googleLoginHandler()} className="all-login-btn">
        <div className="sns-logo-container">
          <img src={googleLogo} alt="google-logo" id="google-logo" />
        </div>
        <div className="logo-description">
          <span>구글 계정으로 로그인</span>
        </div>
        <GoogleRedirection
          popup={popup}
          setPopup={setPopup}
          setAlert={setAlert}
        />
      </button>
    </>
  );
}
