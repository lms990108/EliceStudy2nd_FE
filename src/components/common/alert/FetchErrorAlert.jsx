import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom/dist";
import { AlertContext } from "../../../App";
import { Backdrop } from "@mui/material";
import { AlertCustom } from "./Alerts";

export default function FetchErrorAlert({ title, content }) {
  const { openFetchErrorAlert, setOpenFetchErrorAlert } = useContext(AlertContext);
  const currentURL = useLocation();
  const nav = useNavigate();

  return (
    <Backdrop open={openFetchErrorAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <AlertCustom
        open={openFetchErrorAlert}
        onclose={() => setOpenFetchErrorAlert(false)}
        severity={"error"}
        title={title || "Internal Server Error:"}
        content={<div style={{ paddingBottom: "22px" }}>{content || "서버와 접속에 실패하였습니다. 잠시 후 다시 시도해주세요."}</div>}
        onclick={() => nav("/signup-in", { state: { from: `${currentURL.pathname}${currentURL.search}` } })}
        checkBtn={"확인"}
        checkBtnColor={"#fa2828"}
        closeBtn={"취소"}
      />
    </Backdrop>
  );
}
