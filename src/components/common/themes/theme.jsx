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
    darkGray: {
      main: "#898989",
    },
  },
  typography: {
    fontFamily: "Noto Sans KR",
  },
});
