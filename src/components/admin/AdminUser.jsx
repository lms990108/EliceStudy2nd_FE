import React from "react";
import "./AdminUser.scss";

const AdminUser = () => {
  return (
    <div className="admin-form-container">
      <div className="admin-form-header">
        <h4 className="header-user-category">아이디</h4>
        <h4 className="header-user-category">닉네임</h4>
        <h4 className="header-user-category">가입경로</h4>
        <h4 className="header-user-category">현재 상태</h4>
        <div className="header-user-category">
          <button className="resign-btn">관리자 권한으로 탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
