import "./App.scss";
import { theme } from "./components/common/themes/theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PRBoardListPage, PRBoardDetailPage, PRBoardFormPage } from "./pages";
import { FreeBoardDetailPage, FreeBoardFormPage, FreeBoardListPage } from "./pages";
import Header from "./components/common/header/Header";
import PlayList from "./pages/play-list/PlayList";
import PlayDetail from "./pages/play-detail/PlayDetail";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/free-board" element={<FreeBoardListPage />} />
            <Route path="/free-board/:postId" element={<FreeBoardDetailPage />} />
            <Route path="/free-board/create-form" element={<FreeBoardFormPage />} />

            <Route path="/PR-board" element={<PRBoardListPage />} />
            <Route path="/PR-board/:postId" element={<PRBoardDetailPage />} />
            <Route path="/PR-board/create-form" element={<PRBoardFormPage />} />

            <Route path="/play-list" element={<PlayList />} />
            <Route path="/play-detail/:playId" element={<PlayDetail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
