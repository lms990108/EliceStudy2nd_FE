import { Link } from "react-router-dom";
import naverimg from "../../../assets/img/user/naverlogin.png";

export default function Naver() {
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL;
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  return (
    <Link
      to={`https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_CALLBACK_URL}&state=${NAVER_CLIENT_SECRET}`}
    >
      <button>
        <img className="btnimage" src={naverimg} alt=" 네이버로그인" />
        <p className="last-account">마지막으로 로그인한 계정입니다.</p>
        {/* <- style 확인을 위해 임시로 추가! */}
      </button>
    </Link>
  );
}
