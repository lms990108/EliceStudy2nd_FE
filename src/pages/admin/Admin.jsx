import React, { useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminUser from "../../components/admin/AdminUser";
import AdminReview from "../../components/admin/AdminReview";
import AdminPR from "../../components/admin/AdminPR";
import AdminPRComments from "../../components/admin/AdminPRComments";
import AdminFree from "../../components/admin/AdminFree";
import AdminFreeComments from "../../components/admin/AdminFreeComments";
import "./Admin.scss";

const Admin = () => {
  // 현재 활성화된 메뉴 상태를 추적하기 위한 state
  const [activeComponent, setActiveComponent] = useState("회원");

  // 활성화된 컴포넌트를 렌더링하기 위한 함수
  const renderComponent = () => {
    switch (activeComponent) {
      case "회원":
        return <AdminUser />;
      case "후기":
        return <AdminReview />;
        case "홍보":
        return <AdminPR />;
        case "pr":
        return <AdminPRComments />;
        case "게시판":
        return <AdminFree />;
        case "free":
        return <AdminFreeComments />;
      // 다른 메뉴에 대한 케이스도 추가할 수 있습니다.
      default:
        return <AdminUser />;
    }
  };

  return (
    <div className="admin-user-layout">
      {/* AdminNav 컴포넌트에 activeComponent 상태를 변경하는 함수를 props로 전달합니다. */}
      <AdminNav setActiveComponent={setActiveComponent} />
      {/* 조건에 따라 다른 컴포넌트를 렌더링합니다. */}
      {renderComponent()}
    </div>
  );
};

export default Admin;