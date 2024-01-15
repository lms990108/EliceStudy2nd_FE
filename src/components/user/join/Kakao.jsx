import kakaoimg from "../../../assets/img/user/kakaologin.png";

export default function Kakao() {
  const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

  const kakaoLoginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
  };

  return (
    <button onClick={() => kakaoLoginHandler()}>
      <img className="btnimage" src={kakaoimg} alt=" 카카오로그인" />
    </button>
  );
}
