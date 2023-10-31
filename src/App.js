import { ThemeProvider } from "@mui/material";
import "./App.scss";
import { theme } from "./components/common/themes/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FreeBoardListPage from "./pages/free-board-list/FreeBoardListPage";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/free-board" element={<FreeBoardListPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
