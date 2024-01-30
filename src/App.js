import "./App.scss";
import { Helmet } from "react-helmet";
import { theme } from "./components/common/themes/theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PRBoardListPage, PRBoardDetailPage, PRBoardFormPage, FreeBoardEdit, PRBoardEdit } from "./pages";
import { FreeBoardDetailPage, FreeBoardFormPage, FreeBoardListPage } from "./pages";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import PlayList from "./pages/play-list/PlayList";
import PlayDetail from "./pages/play-detail/PlayDetail";
import SignUpIn from "./pages/user/SignUp_In";
import MyPage from "./pages/mypage/MyPage";
import ScrollToTop from "./utils/ScrollToTop";
import Main from "./pages/main/Main";
import Admin from "./pages/admin/Admin";
import SearchResult from "./pages/search-result/SearchResultPage";
import InputAdditionalInfo from "./pages/user/InputAdditionalInfo";
import KakaoRedirection from "./pages/redirection/KakaoRedirection";
import GoogleRedirection from "./pages/redirection/GoogleRedirection";
import NaverRedirection from "./pages/redirection/NaverRedirection";
import useCheckLogin from "./hooks/authoriaztionHooks/useCheckLogin";

function App() {
  useCheckLogin();

  return (
    <div className="App">
      <Helmet>
        <script type="text/javascript" defer src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
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
                  <Routes>
                    <Route path="/signup-in" element={<SignUpIn />} />
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
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
