import * as React from "react";
import { useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function ColorTabs() {
  const [value, setValue] = React.useState(null);
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
        setValue(null); // 다른 경로에 있을 때는 아무 탭도 선택되지 않도록
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
            fontWeight: "300",
            fontSize: "17px",
            letterSpacing: "5px",
            color: "white",
            "&.Mui-selected": {
              color: "#ffb400",
            },
            "&:hover": {
              fontSize: "18px",
              fontWeight: "400",
            },
          },
          ".MuiTabs-indicator": {
            backgroundColor: "#ffb400",
          },
        }}
      >
        <Tab
          value="one"
          label="공연"
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
          label="게시판"
          component={Link}
          to="/community"
          disableRipple
        />
      </Tabs>
    </Box>
  );
}
