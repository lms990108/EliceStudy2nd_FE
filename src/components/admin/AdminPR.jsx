import React from "react";
import "./AdminPR.scss";

const AdminPR = () => {
  return (
    <div className="admin-form-container">
      <div className="admin-form-header">
      <h4 className="header-pr-category">제목</h4>
        <h4 className="header-pr-category">닉네임</h4>
        <h4 className="header-pr-category">작성시간</h4>
        <div className="header-pr-category">
        <button className="resign-btn">관리자 권한으로 삭제</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPR;
