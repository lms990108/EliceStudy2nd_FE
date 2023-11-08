import React from "react";
import "./Header.scss";
import ColorTabs from "./colored-tab";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-box">
        <div className="vertical-box1">
          <div className="header-login-btn-box">
            <Link to="/mypages" style={{ textDecoration: 'none' }}>
              <p className="header-login-btn">마이페이지</p>
            </Link>
          </div>
          <div className="header-login-btn-box">
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <p className="header-login-btn">관리자 페이지</p>
            </Link>
          </div>
          <div className="header-login-btn-box">
            <Link to="/signup-in" style={{ textDecoration: 'none' }}>
              <p className="header-login-btn">로그인 / 회원가입</p>
            </Link>
          </div>
        </div>
        <div className="vertical-box2">
          <div>
            <Link to="/">
              <img
                className="logo"
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="logo-image"
                component={Link}
                to="/Main"
              ></img>
            </Link>
          </div>
        </div>
        <div className="vertical-box3">
          <div>
            <ColorTabs />
          </div>
          <div className="search-container">
            <input className="header-search-input" />
            <SearchRoundedIcon className="search-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
