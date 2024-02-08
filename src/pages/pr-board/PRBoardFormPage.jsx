import React, { useContext, useEffect, useState } from "react";
import { BoardSecondHeader } from "../../components/board";
import { PRBoardForm } from "../../components/board-pr/PRBoardForm";
import "./PRBoardFormPage.scss";
import { AlertCustom } from "../../components/common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/authoriaztionHooks/useGetUser";
import { AlertContext, AppContext } from "../../App";
import { Backdrop } from "@mui/material";

export function PRBoardFormPage() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  const nav = useNavigate();
  const user = useGetUser();
  const { setOpenLoginAlertBack } = useContext(AlertContext);
  const { userData } = useContext(AppContext);

  const handleCancle = (e) => {
    if (input) setOpen(true);
    else nav("/promotion");
  };

  useEffect(() => {
    if (userData?.user?.isLoggedIn) {
      setOpenLoginAlertBack(true);
    }
  }, [userData]);

  return (
    <div className="pr-board-form-page page-margin">
      <div className="body">
        <PRBoardForm setInput={(boolean) => setInput(boolean)} handleCancle={handleCancle} />
      </div>

      <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AlertCustom
          open={open}
          onclose={() => setOpen(false)}
          onclick={() => nav("/promotion")}
          closeBtn={"취소"}
          checkBtn={"확인"}
          checkBtnColor={"#ff9800"}
          severity={"warning"}
          title={"teenybox.com 내용:"}
          content={
            <>
              작성을 취소하시겠습니까?
              <br />
              작성 중인 내용은 저장되지 않습니다.
            </>
          }
        />
      </Backdrop>
    </div>
  );
}
