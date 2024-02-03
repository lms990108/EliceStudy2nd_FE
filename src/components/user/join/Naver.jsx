import { useState } from "react";
import { NaverRedirection } from "../../../pages/redirection/NaverRedirection";
import { AlertCustom } from "../../../components/common/alert/Alerts";
import Loading from "../../common/state/Loading";
import "./AllLoginBtn.scss";
import naverLogo from "../../../assets/img/user/naver-logo.png";

export default function Naver() {
  const [popup, setPopup] = useState();
  const [alert, setAlert] = useState(null);

  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL;
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  const naverLoginHandler = () => {
    const width = 500;
    const height = 400; // 팝업의 세로 길이 : 500
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const url = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_CALLBACK_URL}&state=${NAVER_CLIENT_SECRET}`;
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
          {alert.title !== "정보 제공 동의 필수" ? <Loading /> : null}
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
      <button onClick={() => naverLoginHandler()} className="all-login-btn">
        <div className="sns-logo-container">
          <img src={naverLogo} alt="naver-logo" id="naver-logo" />
        </div>
        <div className="logo-description">
          <span>네이버 계정으로 로그인</span>
        </div>
        <NaverRedirection
          popup={popup}
          setPopup={setPopup}
          setAlert={setAlert}
        />
      </button>
    </>
  );
}
