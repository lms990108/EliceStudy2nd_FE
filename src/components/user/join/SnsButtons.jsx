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
        {localStorage.getItem("social_provider") && (
          <div className="last-account">
            마지막으로 로그인한 계정은&nbsp;
            <span
              style={{
                color:
                  localStorage.getItem("social_provider") === "naver"
                    ? "#3eaf0e"
                    : localStorage.getItem("social_provider") === "kakao"
                    ? "#FFC939"
                    : "#147bb7",
              }}
            >
              {localStorage.getItem("social_provider")}
            </span>
            &nbsp;입니다.
          </div>
        )}
      </div>
    </>
  );
}
