// 소셜 로그인/회원가입 버튼들
import React from "react";
import kakaoimg from "../../assets/img/user/kakaologin.png";
import naverimg from "../../assets/img/user/naverlogin.png";
import googleimg from "../../assets/img/user/googlelogin.png";


// const SocialKakao = () => {
//     const Rest_api_key='7dd7f53300b5daea02a88fe5fbde89ae' //REST API KEY
//     const redirect_uri = 'http://localhost:3000/signup-in' //Redirect URI
//     // oauth 요청 URL
//     const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
//     const handleLogin = ()=>{
//         window.location.href = kakaoURL
//     }
//     return(
//     <>
//     <button onClick={handleLogin}>카카오 로그인</button>
//     </>
//     )
// }
// export default SocialKakao;


export default function SnsButtons() {
  return (
    <>
      <div className="social-buttons">
        <button><img src={ naverimg } alt=" 네이버로그인" /></button>
        <button><img src={ kakaoimg } alt=" 카카오로그인" /></button>
        <button><img src={ googleimg } alt=" 구글로그인" /></button>
      </div>
    </>
  )
}
