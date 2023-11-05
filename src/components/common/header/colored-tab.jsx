import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function ColorTabs() {
  const [value, setValue] = React.useState("one");

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
            width: '130px',
            padding: '0px',
            fontWeight: "350",
            fontSize: '17px',
            letterSpacing: '5px',
            color: "white",
            "&.Mui-selected": {
              color: "#ffb400",
            },
          },
          ".MuiTabs-indicator": {
            backgroundColor: "#ffb400",
          },
        }}
      >
        <Tab value="one" label="공연" component={Link} to="/play-list"/>
        <Tab value="two" label="홍보" component={Link} to="/PR-board"/>
        <Tab value="three" label="게시판" component={Link} to="/free-board"/>
      </Tabs>
    </Box>
  );
}
