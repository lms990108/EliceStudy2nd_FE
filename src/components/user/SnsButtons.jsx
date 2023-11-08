// 소셜 로그인/회원가입 버튼들
import React from "react";
import kakaoimg from "../../assets/img/user/kakaologin.png";
import naverimg from "../../assets/img/user/naverlogin.png";
import googleimg from "../../assets/img/user/googlelogin.png";



export default function SnsButtons() {


  return (
    <>
      <div className="socialButtons">
         
        <div className="btnbox">
          <button>
            <img className="btnimage" src={naverimg} alt=" 네이버로그인" />
            <p className="last-account">마지막으로 로그인한 계정입니다.</p> {/* <- style 확인을 위해 임시로 추가! */}
          </button>
        </div>
        <div className="btnbox">
          <button>
            <img className="btnimage" src={kakaoimg} alt=" 카카오로그인" />
          </button>
        </div>
        <div className="btnbox">
          <button>
            <img className='btnimage' src={googleimg} alt=" 구글로그인" />
          </button>
        </div>
        
      </div>
    </>
  )
}
