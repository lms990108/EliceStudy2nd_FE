import React, { useState } from "react";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import "./AdminNav.scss";

const AdminNav = ({ setActiveComponent }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  const handleMenuClick = (menu) => {
    // 선택된 메인 메뉴 변경
    setActiveMenu(menu);
    // 메인 메뉴를 클릭할 때 항상 서브 메뉴 상태 초기화
    setActiveSub(null);
    // setActiveComponent 함수를 호출하여 Admin 컴포넌트의 상태를 변경
    setActiveComponent(menu);
  };

  const handleSubMenuClick = (subMenu) => {
    // 서브 메뉴 클릭 시에는 메인 메뉴 상태를 변경하지 않음
    setActiveSub(subMenu);
  };

  const getClassName = (menu) => {
    // 서브 메뉴가 활성화되지 않았을 때만 메인 메뉴에 'active' 클래스를 적용
    return `admin-nav-box ${activeMenu === menu && !activeSub ? "active" : ""}`;
  };

  const getSubClassName = (subMenu) => {
    return `${subMenu === "pr" ? "pr-comments-box" : "free-comments-box"} ${
      activeSub === subMenu ? "active" : ""
    }`;
  };

  return (
    <div className="admin-nav-container">
      <div className="admin-nav-header">관리자</div>
      <div
        className={getClassName("회원")}
        onClick={() => handleMenuClick("회원")}
      >
        회원
      </div>
      <div
        className={getClassName("홍보")}
        onClick={() => handleMenuClick("홍보")}
      >
        홍보
      </div>
      {activeMenu === "홍보" && (
        <div
          className={getSubClassName("pr")}
          onClick={() => handleSubMenuClick("pr")}
        >
       <SubdirectoryArrowRightIcon style={{ fontSize: '13px' }} /> 댓글
        </div>
      )}
      <div
        className={getClassName("게시판")}
        onClick={() => handleMenuClick("게시판")}
      >
        게시판
      </div>
      {activeMenu === "게시판" && (
        <div
          className={getSubClassName("free")}
          onClick={() => handleSubMenuClick("free")}
        >
        <SubdirectoryArrowRightIcon style={{ fontSize: '13px' }} /> 댓글
        </div>
      )}
      <div
        className={getClassName("후기")}
        onClick={() => handleMenuClick("후기")}
      >
        후기
      </div>
    </div>
  );
};

export default AdminNav;
