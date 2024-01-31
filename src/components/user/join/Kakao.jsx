import kakaoimg from "../../../assets/img/user/kakaologin.png";
import { useState } from "react";
import { KakaoRedirection } from "../../../pages/redirection/KakaoRedirection";
import { AlertCustom } from "../../../components/common/alert/Alerts";
import Loading from "../../../components/common/loading/Loading";

export default function Kakao() {
  const [popup, setPopup] = useState();
  const [alert, setAlert] = useState(null);

  const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

  const kakaoLoginHandler = () => {
    const width = 500;
    const height = 400; // 팝업의 세로 길이 : 500
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
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
      <button onClick={() => kakaoLoginHandler()}>
        <img className="btnimage" src={kakaoimg} alt=" 카카오로그인" />
        <KakaoRedirection
          popup={popup}
          setPopup={setPopup}
          setAlert={setAlert}
        />
      </button>
    </>
  );
}
