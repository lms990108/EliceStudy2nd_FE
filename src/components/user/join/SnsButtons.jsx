// 소셜 로그인/회원가입 버튼들
import React from "react";
import Naver from "./Naver";
import Kakao from "./Kakao";
import Google from "./Google";
import "./SnsButtons.scss";

export default function SnsButtons() {
  return (
    <>
      <div className="socialButtons">
        <div className="btnbox">
          <Naver />
        </div>
        <div className="btnbox">
          <Kakao />
        </div>
        <div className="btnbox">
          <Google />
        </div>
      </div>
    </>
  );
}
