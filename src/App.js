import "./App.css";
import { theme } from "./components/common/themes/theme";
import { ThemeProvider } from "@emotion/react";
import PlayList from "./pages/play-list/PlayList";
import PlayDetail from "./pages/play-detail/PlayDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/play-list" element={<PlayList />} />
          </Routes>
          <Routes>
            <Route path="/play-detail/:playId" element={<PlayDetail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
