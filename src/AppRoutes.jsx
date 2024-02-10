import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import CommonLayout from "./pages/common/CommonLayout";
import { PRBoardListPage, PRBoardDetailPage, PRBoardFormPage, FreeBoardEdit, PRBoardEdit } from "./pages";
import { FreeBoardDetailPage, FreeBoardFormPage, FreeBoardListPage } from "./pages";
import { PlayList, PlayDetail } from "./pages";
import { SignUp_In, InputAdditionalInfo } from "./pages";
import MyPage from "./pages/mypage/MyPage";
import Main from "./pages/main/Main";
import Admin from "./pages/admin/Admin";
import SearchResult from "./pages/search-result/SearchResultPage";
import { KakaoRedirection, GoogleRedirection, NaverRedirection } from "./pages";
import { ForbiddenPage, NotFoundPage, NotFoundRedirect } from "./pages";
import PrivacyPolicy from "./pages/util/PrivacyPolicy";
import { useEffect, useState } from "react";

let currentPath = "";
let reloard = true;

export default function AppRoutes({ setPrevPlayListQuery }) {
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search" || location.pathname === "/mypages") {
      currentPath = location.pathname + location.search;
      return;
    }
    if (currentPath === location.pathname + location.search && reloard) {
      reloard = false;
      window.location.reload();
    }
    currentPath = location.pathname + location.search;
  }, [location]);

  return (
    <Routes>
      {/* 에러 페이지 */}
      <Route path="/forbidden" element={<ForbiddenPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />

      {/* 로그인 관련 페이지 */}
      <Route path="/user/kakao-login" element={<KakaoRedirection />} />
      <Route path="/user/google-login" element={<GoogleRedirection />} />
      <Route path="/user/naver-login" element={<NaverRedirection />} />

      {/* 나머지 페이지 */}
      <Route
        path="/*"
        element={
          <>
            <Header />
            <ScrollToTop />
            <CommonLayout setPrevPlayListQuery={setPrevPlayListQuery}>
              <Routes>
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/signup-in" element={<SignUp_In />} />
                <Route path="/additional-user-info" element={<InputAdditionalInfo />} />

                <Route path="/mypages" element={<MyPage />} />
                <Route path="/" element={<Main />} />

                <Route path="/admin" element={<Admin />} />

                <Route path="/community" element={<FreeBoardListPage />} />
                <Route path="/community/:postId" element={<FreeBoardDetailPage />} />
                <Route path="/community/write" element={<FreeBoardFormPage />} />
                <Route path="/community/edit/:postId" element={<FreeBoardEdit />} />

                <Route path="/promotion" element={<PRBoardListPage />} />
                <Route path="/promotion/:postId" element={<PRBoardDetailPage />} />
                <Route path="/promotion/write" element={<PRBoardFormPage />} />
                <Route path="/promotion/edit/:postId" element={<PRBoardEdit />} />

                <Route path="/play" element={<PlayList />} />
                <Route path="/play/:playId" element={<PlayDetail />} />

                <Route path="/search" element={<SearchResult />} />
                <Route path="/*" element={<NotFoundRedirect />} />
              </Routes>
            </CommonLayout>
            <Footer />
          </>
        }
      />
    </Routes>
  );
}
