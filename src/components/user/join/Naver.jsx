import { useState } from "react";
import naverimg from "../../../assets/img/user/naverlogin.png";
import { NaverRedirection } from "../../../pages/redirection/NaverRedirection";
import { AlertCustom } from "../../../components/common/alert/Alerts";
import Loading from "../../../components/common/loading/Loading";

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
      <button onClick={() => naverLoginHandler()}>
        <img className="btnimage" src={naverimg} alt=" 네이버로그인" />
        <NaverRedirection
          popup={popup}
          setPopup={setPopup}
          setAlert={setAlert}
        />
      </button>
    </>
  );
}
