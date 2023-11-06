// 소셜 로그인/회원가입 버튼들
import React from "react";
import kakaoimg from "../../assets/img/user/kakaologin.png";
import naverimg from "../../assets/img/user/naverlogin.png";
import googleimg from "../../assets/img/user/googlelogin.png";



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
