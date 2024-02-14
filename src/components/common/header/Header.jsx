import React, { useState, useContext, useEffect } from "react";
import "./Header.scss";
import SearchModal from "./SearchModal";
import { AlertCustom } from "../alert/Alerts";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../../App";

const Header = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [open, setOpen] = useState(false); // Alert 창 열림 여부 상태 추가
  const [activeTab, setActiveTab] = useState("");
  const { userData, setUserData } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    // 페이지 URL에 따라 activeTab 상태를 변경
    if (location.pathname === "/play") {
      setActiveTab("play");
    } else if (location.pathname === "/promotion") {
      setActiveTab("promotion");
    } else if (location.pathname === "/community") {
      setActiveTab("community");
    } else {
      setActiveTab("");
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `https://dailytopia2.shop/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
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
        time={1000}
        severity="success"
        width={450}
        color="secondary"
      />
      <div className="header-container">
        <div className="header-box">
          <div className="vertical-box1">
            <Link to="/">
              <img
                className="logo"
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="logo-image"
                component={Link}
                to="/Main"
              ></img>
            </Link>
            {userData && userData.isLoggedIn ? (
              <div className="header-icon-box">
                <Link
                  to="/mypages"
                  style={{ textDecoration: "none" }}
                  className="header-login-btn-box"
                >
                  <AccountCircleIcon className="header-icon" />
                  <p className="header-icon-text">마이페이지</p>
                </Link>
                {userData.user.role === "admin" && (
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none" }}
                    className="header-login-btn-box"
                  >
                    <AdminPanelSettingsOutlinedIcon className="header-icon" />
                    <p className="header-icon-text">관리자페이지</p>
                  </Link>
                )}
                <div className="header-login-btn-box" onClick={handleLogout}>
                  <LockOpenOutlinedIcon className="header-icon" />
                  <p className="header-icon-text">로그아웃</p>
                </div>
              </div>
            ) : (
              <Link
                to="/signup-in"
                style={{ textDecoration: "none" }}
                className="header-login-btn-box"
              >
                <LockOutlinedIcon className="header-icon" />
                <p className="header-icon-text">로그인</p>
              </Link>
            )}
          </div>
          <div className="vertical-box2">
            <div className="header-tab-box">
              <div className="header-tab-box">
                <div className="header-tab">
                  <Link
                    to="/play"
                    className={`header-tab-text1 ${
                      activeTab === "play" && "active"
                    }`}
                  >
                    연극
                  </Link>
                </div>
                <div className="header-tab">
                  <Link
                    to="/promotion"
                    className={`header-tab-text1 ${
                      activeTab === "promotion" && "active"
                    }`}
                  >
                    홍보
                  </Link>
                </div>
                <div className="header-tab">
                  <Link
                    to="/community"
                    className={`header-tab-text2 ${
                      activeTab === "community" && "active"
                    }`}
                  >
                    커뮤니티
                  </Link>
                </div>
              </div>
            </div>
            <div className="search-container">
              <div className="header-search-btn" onClick={onShowModal}></div>
              <SearchRoundedIcon
                className="search-icon"
                onClick={onShowModal}
              />
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
