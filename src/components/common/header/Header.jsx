import React from "react";
import "./Header.scss";
import ColorTabs from "./colored-tab";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-box">
        <div className="vertical-box1">
          <div className="header-login-btn-box">
            <p className="header-login-btn">로그인 / 회원가입</p>
          </div>
        </div>
        <div className="vertical-box2">
          <div>
            <h1>
              <span className="highlight">T</span>eeny
              <span className="highlight">B</span>ox
            </h1>
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
