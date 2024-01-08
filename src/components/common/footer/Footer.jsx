import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

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
            주소 : 서울 성동구 아차산로17길 48 성수낙낙 2층
            <br />
            전화 : 070-4633-2740
            <br />
            문의 : tjdwo787@naver.com
          </p>
        </div>
        <div className="footer-box3">
          <Link to="/">
            <img
              className="footer-logo"
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="logo-image"
              component={Link}
              to="/Main"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
