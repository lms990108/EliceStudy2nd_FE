// 마이페이지 화면
import React from "react";
import "./MyPage.scss";

export default function MyPage() {
  return (
    <>
      <main className="mypageContainer">

        {/* 마이페이지 왼쪽 메뉴 영역 */}
        <section className="mypage-left-wrap">
          <div className="left-user-title">
            <span>TEENY<br />BOX</span>
            
            <div className="dotarea">
              <div className="dot1"></div>
              <div className="dot2"></div>
              <div className="dot3"></div>
            </div>

            <p className="usernickname">안녕하세요❣️닉네임 님</p>
          </div>

          {/* 메뉴들 */}
          <div className="left-mypage-menus">
            <ul>
              <span className="left-menutitle">내 정보 관리</span>
              <li><a href="#">회원정보 조회/수정/탈퇴</a></li>
            </ul>

            <ul>
              <span className="left-menutitle">찜한 연극</span>
              <li><a href="#">내가 찜한 연극 LIST</a></li>
            </ul>

            <ul>
              <span className="left-menutitle">MY 리뷰</span>
              <li><a href="#">내가 작성한 연극 리뷰</a></li>
            </ul>

            <ul>
              <span className="left-menutitle">내 게시판 작성글</span>
              <li><a href="#">홍보 게시판</a></li>
              <li><a href="#">자유 게시판</a></li>
              <li><a href="#">내 댓글</a></li>
            </ul>
          </div>


        </section>

        <section className="mypage-right-wrap">
          <div className="menu-title">마이페이지</div>

        </section>
      </main>
    </>
  );
}