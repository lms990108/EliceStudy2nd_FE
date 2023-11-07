// 소셜 로그인 및 회원가입 페이지
import React from "react";
import "./SignUp_In.scss";
import SnsButtons from "../../components/user/SnsButtons.jsx";
import "../../components/user/SnsButtons.scss";

export default function SignUp_In() {
  return (
    <>
      <section className="signup-in-container inner">
        <h1 className="signup_title">SIGN UP / LOGIN </h1>
        <p className="signup_description">소셜 로그인 및 이메일 계정으로 가입이 가능합니다.</p>

        <div className="social-buttons">
          <SnsButtons/>
        </div>
        

      </section>
    </>
  );
}