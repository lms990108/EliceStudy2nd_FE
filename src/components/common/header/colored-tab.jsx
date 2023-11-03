import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
            width: '150px',
            fontSize: '18px',
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
        <Tab value="one" label="공연" />
        <Tab value="two" label="홍보" />
        <Tab value="three" label="게시판" />
      </Tabs>
    </Box>
  );
}
