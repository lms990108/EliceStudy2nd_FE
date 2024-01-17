import { useState } from "react";
import naverimg from "../../../assets/img/user/naverlogin.png";
import NaverRedirection from "../../../pages/redirection/NaverRedirection";

export default function Naver() {
  const [popup, setPopup] = useState();

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
    <button onClick={() => naverLoginHandler()}>
      <img className="btnimage" src={naverimg} alt=" 네이버로그인" />
      <NaverRedirection popup={popup} setPopup={setPopup} />
      <p className="last-account">마지막으로 로그인한 계정입니다.</p>
      {/* <- style 확인을 위해 임시로 추가! */}
    </button>
  );
}
