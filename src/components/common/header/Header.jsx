import React, { useState, useEffect, useContext } from "react";
import "./Header.scss";
import ColorTabs from "./colored-tab";
import SearchModal from "./SearchModal";
import { AlertCustom } from "../alert/Alerts";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { AppContext } from "../../../App";

const Header = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [open, setOpen] = useState(false); // Alert 창 열림 여부 상태 추가
  const { userData, setUserData } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      const response = await fetch(`https://dailytopia2.shop/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        // 사용자 정보 삭제 후 페이지 새로고침
        setUserData(null);
        setOpen(true);
      } else {
        console.error("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 요청 에러:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const onShowModal = () => {
    setSearchModalOpen(true); //검색 모달 열기
  };

  const onCloseModal = () => {
    setSearchModalOpen(false); // 검색 모달 닫기
  };

  return (
    <>
      <AlertCustom
        open={open}
        onclose={handleClose}
        title="로그아웃"
        content={<div>정상적으로 로그아웃 되었습니다.</div>}
        time={1500}
        severity="success"
        width={450}
        color="secondary"
      />
      <div className="header-container">
        <div className="header-box">
          <div className="vertical-box1">
            {userData && userData.isLoggedIn ? (
              <>
                <div className="header-login-btn-box">
                  <Link to="/mypages" style={{ textDecoration: "none" }}>
                    <div className="header-login-btn">
                      <Tooltip title="마이 페이지" arrow>
                        <AccountCircleIcon className="header-icon" />
                      </Tooltip>
                    </div>
                  </Link>
                </div>
                {userData.user.role === "admin" && (
                  <div className="header-login-btn-box">
                    <Link to="/admin" style={{ textDecoration: "none" }}>
                      <div className="header-login-btn">
                        <Tooltip title="관리자 페이지" arrow>
                          <AdminPanelSettingsOutlinedIcon className="header-icon" />
                        </Tooltip>
                      </div>
                    </Link>
                  </div>
                )}
                <div className="header-login-btn-box">
                  <div className="header-login-btn">
                    <Tooltip title="로그아웃" arrow>
                      <LogoutOutlinedIcon className="header-icon" onClick={handleLogout} />
                    </Tooltip>
                  </div>
                </div>
              </>
            ) : (
              <div className="header-login-btn-box">
                <Link to="/signup-in" style={{ textDecoration: "none" }}>
                  <div className="header-login-btn">
                    <Tooltip title="로그인" arrow>
                      <LoginIcon className="header-icon" />
                    </Tooltip>
                  </div>
                </Link>
              </div>
            )}
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