import "./App.scss";
import { useState, useEffect, createContext } from "react";
import { Helmet } from "react-helmet";
import { theme } from "./components/common/themes/theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PRBoardListPage, PRBoardDetailPage, PRBoardFormPage, FreeBoardEdit, PRBoardEdit } from "./pages";
import { FreeBoardDetailPage, FreeBoardFormPage, FreeBoardListPage } from "./pages";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import { PlayList, PlayDetail } from "./pages";
import { SignUp_In, InputAdditionalInfo } from "./pages";
import MyPage from "./pages/mypage/MyPage";
import ScrollToTop from "./utils/ScrollToTop";
import Main from "./pages/main/Main";
import Admin from "./pages/admin/Admin";
import SearchResult from "./pages/search-result/SearchResultPage";
import { KakaoRedirection, GoogleRedirection, NaverRedirection } from "./pages";
import { ForbiddenPage, NotFoundPage, NotFoundRedirect } from "./pages";
import CommonLayout from "./pages/common/CommonLayout";
import LoginAlert from "./components/common/alert/LoginAlert";
import PrivacyPolicy from "./pages/util/PrivacyPolicy";

export const AppContext = createContext();
export const AlertContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  console.log(userData);

  const [prevPlayListQuery, setPrevPlayListQuery] = useState(null);
  console.log(prevPlayListQuery);

  const getUserData = async () => {
    try {
      const res = await fetch(`https://dailytopia2.shop/api/users`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData({ isLoggedIn: true, user: data.user });
      } else if (res.status === 401 || res.status === 403) {
        // 다시 한 번 시도
        try {
          const secondRes = await fetch(`https://dailytopia2.shop/api/users`, {
            credentials: "include",
          });

          if (secondRes.ok) {
            const secondData = await secondRes.json();
            setUserData({ isLoggedIn: true, user: secondData.user });
          } else {
            // 두 번째 시도에서도 오류가 발생하면 isLoggedIn을 false로 설정
            setUserData({ isLoggedIn: false });
          }
        } catch (secondErr) {
          console.error(secondErr);
          // 두 번째 시도 자체가 실패하면 isLoggedIn을 false로 설정
          setUserData({ isLoggedIn: false });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <script type="text/javascript" defer src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            userData,
            setUserData,
            prevPlayListQuery,
            setPrevPlayListQuery,
          }}
        >
          <AlertContext.Provider value={{ openLoginAlert, setOpenLoginAlert }}>
            <BrowserRouter>
              <Routes>
                {/* 에러 페이지 */}
                <Route path="/forbidden" element={<ForbiddenPage />} />
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

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
              <LoginAlert />
            </BrowserRouter>
          </AlertContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
