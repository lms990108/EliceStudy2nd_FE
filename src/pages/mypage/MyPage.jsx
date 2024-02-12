// 마이페이지 화면
import React, { useContext, useEffect, useState } from "react";
import "./MyPage.scss";
import MemberInfo from "../../components/mypage/MemberInfo";
import MemberDeletion from "../../components/mypage/MemberDeletion";
import MyPickList from "../../components/mypage/MyPickList";
import MyPlayReview from "../../components/mypage/MyPlayReview";
import MyPRBoard from "../../components/mypage/MyPRBoard";
import MyFreeBoard from "../../components/mypage/MyFreeBoard";
import MyComments from "../../components/mypage/MyComments";
import { useNavigate } from "react-router";
import { AppContext } from "../../App";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { userUrl } from "../../apis/apiURLs";

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedComponent, setSelectedComponent] = useState(searchParams.get("tab") || "MemberInfo");
  const { userData, setUserData } = useContext(AppContext);
  const nav = useNavigate();

  const isSelected = (componentName) => {
    return selectedComponent === componentName ? "selected" : "";
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "MemberInfo":
        return <MemberInfo user={userData.user} setUserData={setUserData} />;
      case "MemberDeletion":
        return <MemberDeletion user={userData.user} setUserData={setUserData} />;
      case "MyPickList":
        return <MyPickList user={userData.user} setUserData={setUserData} />;
      case "MyPlayReview":
        return <MyPlayReview user={userData.user} setUserData={setUserData} />;
      case "MyPRBoard":
        return <MyPRBoard user={userData.user} setUserData={setUserData} />;
      case "MyFreeBoard":
        return <MyFreeBoard user={userData.user} setUserData={setUserData} />;
      case "MyComments":
        return <MyComments />;
      default:
        return <MemberInfo />;
    }
  };

  const isLoggedIn = async () => {
    const loginRes = await fetch(`${userUrl}`, { credentials: "include" });
    if (loginRes.ok) {
      const data = await loginRes.json();
      setUserData({ isLoggedIn: true, user: data.user });
    } else {
      setUserData({ isLoggedIn: false });
      return nav(`/signup-in`);
    }
  };

  useEffect(() => {
    console.log(userData);
    if (userData && !userData.isLoggedIn) {
      isLoggedIn();
    }
  }, [userData]);

  useEffect(() => {
    console.log(searchParams.get("tab"));
    searchParams.set("tab", selectedComponent);
    setSearchParams(searchParams);
  }, [selectedComponent]);

  useEffect(() => {
    console.log(searchParams.get("tab"));
    setSelectedComponent(searchParams.get("tab") || "MemberInfo");
  }, [searchParams]);

  return (
    <>
      {userData ? (
        <div className="mypage-template page-margin">
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
                  <p className={isSelected("MemberDeletion")} onClick={() => setSelectedComponent("MemberDeletion")}>
                    회원탈퇴
                  </p>
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
                  <p className={isSelected("MyPRBoard")} onClick={() => setSelectedComponent("MyPRBoard")}>
                    홍보 게시판
                  </p>
                  <p className={isSelected("MyFreeBoard")} onClick={() => setSelectedComponent("MyFreeBoard")}>
                    커뮤니티
                  </p>
                  <p className={isSelected("MyComments")} onClick={() => setSelectedComponent("MyComments")}>
                    내 댓글
                  </p>
                </div>
              </div>
            </div>
            <div className="mypage-content-area">{renderComponent()}</div>
          </div>
        </div>
      ) : (
        <CircularProgress className="mypage-progress" color="inherit" />
      )}
    </>
  );
}
