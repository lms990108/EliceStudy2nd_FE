import "./App.scss";
import { useState, useEffect, createContext } from "react";
import { Helmet } from "react-helmet";
import { theme } from "./components/common/themes/theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, useLocation } from "react-router-dom";
import LoginAlert from "./components/common/alert/LoginAlert";
import LoginAlertBack from "./components/common/alert/LoginAlertBack";
import AppRoutes from "./AppRoutes";
import FetchErrorAlert from "./components/common/alert/FetchErrorAlert";

export const AppContext = createContext();
export const AlertContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [openLoginAlertBack, setOpenLoginAlertBack] = useState(false);
  const [openFetchErrorAlert, setOpenFetchErrorAlert] = useState(false);
  const [prevPlayListQuery, setPrevPlayListQuery] = useState(null);

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
      } else {
        setUserData({ isLoggedIn: false });
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
        <script
          type="text/javascript"
          defer
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`}
        />
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
          <AlertContext.Provider
            value={{
              openLoginAlert,
              setOpenLoginAlert,
              openLoginAlertBack,
              setOpenLoginAlertBack,
              openFetchErrorAlert,
              setOpenFetchErrorAlert,
            }}
          >
            <BrowserRouter>
              <AppRoutes setPrevPlayListQuery={setPrevPlayListQuery} />
              <LoginAlert />
              <LoginAlertBack />
              <FetchErrorAlert />
            </BrowserRouter>
          </AlertContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
