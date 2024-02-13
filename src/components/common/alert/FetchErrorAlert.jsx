import { useContext } from "react";
import { AlertContext } from "../../../App";
import { Backdrop } from "@mui/material";
import { AlertCustom } from "./Alerts";

export default function FetchErrorAlert() {
  const { openFetchErrorAlert, setOpenFetchErrorAlert } = useContext(AlertContext);

  return (
    <Backdrop open={openFetchErrorAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <AlertCustom
        open={openFetchErrorAlert}
        onclose={() => setOpenFetchErrorAlert(false)}
        severity={"error"}
        title={"Failed to fetch:"}
        content={<div style={{ paddingBottom: "22px" }}>{"서버와 접속에 실패하였습니다. 잠시 후 다시 시도해주세요."}</div>}
        onclick={() => setOpenFetchErrorAlert(false)}
        checkBtn={"확인"}
        checkBtnColor={"#fa2828"}
        closeBtn={"취소"}
      />
    </Backdrop>
  );
}
