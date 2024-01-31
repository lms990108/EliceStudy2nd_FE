import * as React from "react";
import { useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function ColorTabs() {
  const [value, setValue] = React.useState("zero");
  const location = useLocation(); // 현재 경로 가져오기

  React.useEffect(() => {
    // 경로에 따라 탭 상태 업데이트
    switch (location.pathname) {
      case "/play":
        setValue("one");
        break;
      case "/promotion":
        setValue("two");
        break;
      case "/community":
        setValue("three");
        break;
      default:
        setValue("zero"); // 다른 경로에 있을 때는 아무 탭도 선택되지 않도록
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{
          ".MuiTab-root": {
            width: "120px",
            padding: "0px",
            fontWeight: "500",
            fontSize: "18px",
            letterSpacing: "4px",
            color: "white",
            "&.Mui-selected": {
              color: "#ffb400",
            },
            "&:hover": {
              fontSize: "19px",
              fontWeight: "600",
            },
          },
          ".MuiTabs-indicator": {
            backgroundColor: "#ffb400",
          },
        }}
      >
        <Tab
          value="zero"
          disableRipple
          sx={{
            width: "0 !important", // 탭의 너비를 0으로 설정
            minWidth: 0, // 최소 너비 제거
          }}
        />
        <Tab
          value="one"
          label="연극"
          component={Link}
          to="/play"
          disableRipple
        />
        <Tab
          value="two"
          label="홍보"
          component={Link}
          to="/promotion"
          disableRipple
        />
        <Tab
          value="three"
          label="커뮤니티"
          component={Link}
          to="/community"
          disableRipple
        />
      </Tabs>
    </Box>
  );
}
