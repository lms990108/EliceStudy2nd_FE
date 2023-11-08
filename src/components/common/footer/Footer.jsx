import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-layout">
      <div className="footer-container">
        <div className="footer-box1">
          <h3>고객센터 1588 - 1588</h3>
          <p>월-금 10:00-18:00 (주말·공휴일 휴무)</p>
        </div>
        <div className="footer-box2">
          <p>
            상호: curtain call
            <br />
            대표이사: 이민섭
            <br />
            전화: 070-4633-2740
            <br />
            주소: 서울 성동구 아차산로17길 48 성수낙낙 2층
            <br />
            채용문의: tjdwo787@naver.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
