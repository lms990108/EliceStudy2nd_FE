import "./App.scss";
import { useState, useEffect, createContext } from "react";
import { Helmet } from "react-helmet";
import { theme } from "./components/common/themes/theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  PRBoardListPage,
  PRBoardDetailPage,
  PRBoardFormPage,
  FreeBoardEdit,
  PRBoardEdit,
} from "./pages";
import {
  FreeBoardDetailPage,
  FreeBoardFormPage,
  FreeBoardListPage,
} from "./pages";
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

export const AppContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  console.log(userData);

  useEffect(() => {
    fetch(`https://dailytopia2.shop/api/users/login-status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <Helmet>
        <script
          type="text/javascript"
          defer
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`}
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              {/* 에러 페이지 */}
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path="/not-found" element={<NotFoundPage />} />

              {/* 로그인 관련 페이지 */}
              <Route path="/user/kakao-login" element={<KakaoRedirection />} />
              <Route
                path="/user/google-login"
                element={<GoogleRedirection />}
              />
              <Route path="/user/naver-login" element={<NaverRedirection />} />

              {/* 나머지 페이지 */}
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <ScrollToTop />
                    <Routes>
                      <Route path="/signup-in" element={<SignUp_In />} />
                      <Route
                        path="/additional-user-info"
                        element={<InputAdditionalInfo />}
                      />

                      <Route path="/mypages" element={<MyPage />} />
                      <Route path="/" element={<Main />} />

                      <Route path="/admin" element={<Admin />} />

                      <Route
                        path="/community"
                        element={<FreeBoardListPage />}
                      />
                      <Route
                        path="/community/:postId"
                        element={<FreeBoardDetailPage />}
                      />
                      <Route
                        path="/community/write"
                        element={<FreeBoardFormPage />}
                      />
                      <Route
                        path="/community/edit/:postId"
                        element={<FreeBoardEdit />}
                      />

                      <Route path="/promotion" element={<PRBoardListPage />} />
                      <Route
                        path="/promotion/:postId"
                        element={<PRBoardDetailPage />}
                      />
                      <Route
                        path="/promotion/write"
                        element={<PRBoardFormPage />}
                      />
                      <Route
                        path="/promotion/edit/:postId"
                        element={<PRBoardEdit />}
                      />

                      <Route path="/play" element={<PlayList />} />
                      <Route path="/play/:playId" element={<PlayDetail />} />

                      <Route path="/search" element={<SearchResult />} />
                      <Route path="/*" element={<NotFoundRedirect />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
