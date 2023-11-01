import { ThemeProvider } from "@mui/material";
import "./App.scss";
import { theme } from "./components/common/themes/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FreeBoardListPage from "./pages/free-board-list/FreeBoardListPage";
import PRBoardListPage from "./pages/pr-board-list/PRBoardListPage";
import FreeBoardDetailPage from "./pages/free-board-detail/FreeBoardDetailPage";
import Header from "./components/common/header/Header";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/free-board" element={<FreeBoardListPage />} />
            <Route path="/free-board/detail" element={<FreeBoardDetailPage />} />
            <Route path="/PR-board" element={<PRBoardListPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
