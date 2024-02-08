import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom/dist";
import { AlertContext } from "../../../App";
import { Backdrop } from "@mui/material";
import { AlertCustom } from "./Alerts";

export default function LoginAlert() {
  const { openLoginAlert, setOpenLoginAlert } = useContext(AlertContext);
  const currentURL = useLocation();
  const nav = useNavigate();

  return (
    <Backdrop open={openLoginAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <AlertCustom
        open={openLoginAlert}
        onclose={() => setOpenLoginAlert(false)}
        severity={"info"}
        title={"teenybox.com 내용:"}
        content={<div style={{ paddingBottom: "22px" }}>로그인이 필요한 서비스입니다. 로그인 하시겠습니까?</div>}
        onclick={() => nav("/signup-in", { state: { from: `${currentURL.pathname}${currentURL.search}` } })}
        checkBtn={"확인"}
        checkBtnColor={"#03a9f4"}
        closeBtn={"취소"}
      />
    </Backdrop>
  );
}
