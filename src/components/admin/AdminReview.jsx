import React from "react";
import "./AdminReview.scss";

const AdminReview = () => {
  return (
    <div className="admin-form-container">
      <div className="admin-form-header">
        <h4 className="header-review-category">제목</h4>
        <h4 className="header-review-category">닉네임</h4>
        <h4 className="header-review-category">연극 제목</h4>
        <h4 className="header-review-category">별점</h4>
        <h4 className="header-review-category">작성시간</h4>
        <div className="header-review-category">
          <button className="delete-btn">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default AdminReview;
