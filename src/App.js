import "./App.scss";
import { theme } from "./components/common/themes/theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PRBoardListPage, PRBoardDetailPage, PRBoardFormPage } from "./pages";
import { FreeBoardDetailPage, FreeBoardFormPage, FreeBoardListPage } from "./pages";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import PlayList from "./pages/play-list/PlayList";
import PlayDetail from "./pages/play-detail/PlayDetail";
import SignUpIn from "./pages/user/SignUp_In";
import MyPage from "./pages/mypage/MyPage";
import ScrollToTop from "./utils/ScrollToTop";
import Main from "./pages/main/Main";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/signup-in" element={<SignUpIn />} />
            <Route path="/mypages" element={<MyPage/>} />
            <Route path="/" element={<Main />} />

            <Route path="/community" element={<FreeBoardListPage />} />
            <Route path="/community/:postId" element={<FreeBoardDetailPage />} />
            <Route path="/community/create-form" element={<FreeBoardFormPage />} />

            <Route path="/promotion" element={<PRBoardListPage />} />
            <Route path="/promotion/:postId" element={<PRBoardDetailPage />} />
            <Route path="/promotion/create-form" element={<PRBoardFormPage />} />

            <Route path="/play" element={<PlayList />} />
            <Route path="/play/:playId" element={<PlayDetail />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
