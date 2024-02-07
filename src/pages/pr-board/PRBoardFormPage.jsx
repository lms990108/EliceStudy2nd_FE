import React, { useState } from "react";
import { BoardSecondHeader } from "../../components/board";
import { PRBoardForm } from "../../components/board-pr/PRBoardForm";
import "./PRBoardFormPage.scss";
import { AlertCustom } from "../../components/common/alert/Alerts";
import { useNavigate } from "react-router-dom";

export function PRBoardFormPage() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  const nav = useNavigate();

  const handleCancle = (e) => {
    if (input) setOpen(true);
    else nav("/promotion");
  };

  return (
    <div className="pr-board-form-page page-margin">
      <div className="body">
        <PRBoardForm setInput={(boolean) => setInput(boolean)} handleCancle={handleCancle} />
      </div>

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
    </div>
  );
}
