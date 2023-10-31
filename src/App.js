import { ThemeProvider } from "@mui/material";
import "./App.scss";
import { theme } from "./components/common/themes/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FreeBoardListPage from "./pages/free-board-list/FreeBoardListPage";
import PRBoardListPage from "./pages/pr-board-list/PRBoardListPage";
import FreeBoardDetail from "./components/free-board-detail/FreeBoardDetail";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/free-board" element={<FreeBoardListPage />} />
            <Route path="/free-board/detail" element={<FreeBoardDetail />} />
            <Route path="/PR-board" element={<PRBoardListPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
