import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    secondary: {
      main: "#FFB400",
      contrastText: "#FFFFFF",
    },
    silver: {
      main: "#dedede",
      contrastText: "#575757",
    },
    ourGray: {
      main: "#BCBCBC",
      contrastText: "#303030",
    },
    darkGray: {
      main: "#898989",
      contrastText: "#FFFFFF",
    },
    moreDarkGray: {
      main: "#282828",
      contrastText: "#FFFFFF",
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
