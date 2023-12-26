import React, { useState } from "react";
import "./Header.scss";
import ColorTabs from "./colored-tab";
import SearchModal from "./SearchModal";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";

const Header = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const onShowModal = () => {
    setSearchModalOpen(true); //검색 모달 열기
  };

  const onCloseModal = () => {
    setSearchModalOpen(false); // 검색 모달 닫기
  };

  return (
    <>
      <div className="header-container">
        <div className="header-box">
          <div className="vertical-box1">
            <div className="header-login-btn-box">
              <Link to="/mypages" style={{ textDecoration: "none" }}>
                <p className="header-login-btn">
                  <AccountCircleIcon />
                </p>
              </Link>
            </div>
            <div className="header-login-btn-box">
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <p className="header-login-btn">
                  <AdminPanelSettingsOutlinedIcon />
                </p>
              </Link>
            </div>
            <div className="header-login-btn-box">
              <Link to="/signup-in" style={{ textDecoration: "none" }}>
                <p className="header-login-btn">
                  <VpnKeyIcon />
                </p>
              </Link>
            </div>
            <div className="header-login-btn-box">
              <p className="header-login-btn">
                <LogoutOutlinedIcon />
              </p>
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
              <div className="header-search-btn" onClick={onShowModal}>
                <p className="search-text"></p>
              </div>
              <SearchRoundedIcon className="search-icon" />
            </div>
          </div>
        </div>
      </div>
      {/* 모달 */}
      {searchModalOpen && <SearchModal onCloseModal={onCloseModal} />}
    </>
  );
};

export default Header;
