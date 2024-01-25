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
    moreDarkGray: {
      main: "#282828",
    },
    facebookBlue: {
      main: "#3b5998",
    },
    twitterBlue: {
      main: "#00acee",
    },
    dibsRed: {
      main: "#CF2F11",
    },
    red: {
      main: "#fa2828",
    },
    orange: {
      main: "#ff7f00",
    },
  },
  typography: {
    fontFamily: "Noto Sans KR",
  },
});
