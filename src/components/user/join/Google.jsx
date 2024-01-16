import googleimg from "../../../assets/img/user/googlelogin.png";

export default function Google() {
  const GOOGLE_REDIRECT_URL = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const googleLoginHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${GOOGLE_REDIRECT_URL}`;
  };

  return (
    <button onClick={() => googleLoginHandler()}>
      <img className="btnimage" src={googleimg} alt=" 구글로그인" />
    </button>
  );
}
