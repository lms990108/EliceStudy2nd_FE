// 마이페이지 화면
import React, { useState } from "react";
import "./MyPage.scss";
import MemberInfo from "../../components/mypage/MemberInfo";
import MemberDeletion from "../../components/mypage/MemberDeletion";
import MyPickList from "../../components/mypage/MyPickList";
import MyPlayReview from "../../components/mypage/MyPlayReview";
import MyPRBoard from "../../components/mypage/MyPRBoard";
import MyFreeBoard from "../../components/mypage/MyFreeBoard";
import MyComments from "../../components/mypage/MyComments";

export default function MyPage() {
  const [selectedComponent, setSelectedComponent] = useState("MemberInfo");

  const isSelected = (componentName) => {
    return selectedComponent === componentName ? "selected" : "";
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "MemberInfo":
        return <MemberInfo />;
      case "MemberDeletion":
        return <MemberDeletion />;
      case "MyPickList":
        return <MyPickList />;
      case "MyPlayReview":
        return <MyPlayReview />;
      case "MyPRBoard":
        return <MyPRBoard />;
      case "MyFreeBoard":
        return <MyFreeBoard />;
      case "MyComments":
        return <MyComments />;
      default:
        return <MemberInfo />;
    }
  };

  return (
    <div className="mypage-template">
      <div className="mypage-container">
        <div className="mypage-nav">
          <div className="nav-header">
            <p className="nav-header-text">마이페이지</p>
          </div>
          <div className="nav-body">
            <div className="my-nav-box">
              <h3>내 정보 관리</h3>
              <p className={isSelected("MemberInfo")} onClick={() => setSelectedComponent("MemberInfo")}>
                회원정보 수정
              </p>
              <p className={isSelected("MemberDeletion")} onClick={() => setSelectedComponent("MemberDeletion")}>회원탈퇴</p>
            </div>
            <div className="my-nav-box">
              <h3>찜한 연극</h3>
              <p className={isSelected("MyPickList")} onClick={() => setSelectedComponent("MyPickList")}>
                내가 찜한 연극 LIST
              </p>
            </div>
            <div className="my-nav-box">
              <h3>My 리뷰</h3>
              <p className={isSelected("MyPlayReview")} onClick={() => setSelectedComponent("MyPlayReview")}>
                나의 연극 리뷰
              </p>
            </div>
            <div className="my-nav-box">
              <h3>My 작성글</h3>
              <p className={isSelected("MyPRBoard")} onClick={() => setSelectedComponent("MyPRBoard")}>홍보 게시판</p>
              <p className={isSelected("MyFreeBoard")} onClick={() => setSelectedComponent("MyFreeBoard")}>커뮤니티</p>
              <p className={isSelected("MyComments")} onClick={() => setSelectedComponent("MyComments")}>내 댓글</p>
            </div>
          </div>
        </div>
        <div className="mypage-content-area">{renderComponent()}</div>
      </div>
    </div>
  );
}
