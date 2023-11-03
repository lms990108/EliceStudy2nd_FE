import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    secondary: {
      main: "#FFB400",
      contrastText: "#FFFFFF",
    },
    ourGrey: {
      main: "#BCBCBC",
    },
  },
  typography: {
    fontFamily: "Noto Sans KR",
  },
});
