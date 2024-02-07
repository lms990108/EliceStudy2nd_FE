import { useContext } from "react";
import { useNavigate } from "react-router-dom/dist";
import { AlertContext } from "../../../App";
import { Alert, AlertTitle, Backdrop, Button, Snackbar } from "@mui/material";

export default function LoginAlertBack() {
  const { openLoginAlertBack, setOpenLoginAlertBack } = useContext(AlertContext);
  const nav = useNavigate();

  return (
    <Backdrop open={openLoginAlertBack} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Snackbar
        open={openLoginAlertBack}
        onClose={() => {
          setOpenLoginAlertBack(false);
          nav(-1);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="outlined"
          sx={{ width: 500, backgroundColor: "white", "& > :last-child": { alignItems: "flex-end" } }}
          severity="info"
          action={
            <>
              <Button
                className="alert-button"
                aria-label="check"
                size="small"
                sx={{ minWidth: 48, color: "#03a9f4", "&:hover": { textDecoration: "underline" } }}
                onClick={() => {
                  nav("/signup-in", { from: window.location.href });
                  setOpenLoginAlertBack(false);
                }}
              >
                확인
              </Button>

              <Button
                className="alert-button"
                aria-label="close"
                size="small"
                onClick={() => {
                  setOpenLoginAlertBack(false);
                  nav(-1);
                }}
                sx={{ minWidth: 48, color: "inherit", "&:hover": { textDecoration: "underline" } }}
              >
                취소
              </Button>
            </>
          }
        >
          <AlertTitle>"teenybox.com 내용:"</AlertTitle>
          <div style={{ paddingBottom: "22px" }}>로그인이 필요한 서비스입니다. 로그인 하시겠습니까?</div>
        </Alert>
      </Snackbar>
    </Backdrop>
  );
}
