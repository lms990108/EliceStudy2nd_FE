import React, { useState } from "react";
import { BoardSecondHeader } from "../../components/board";
import { FreeBoardForm } from "../../components/board-free/FreeBoardForm";
import "./FreeBoardFormPage.scss";
import { useNavigate } from "react-router-dom";
import { AlertCustom } from "../../components/common/alert/Alerts";

export function FreeBoardFormPage() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  const nav = useNavigate();

  const handleCancle = (e) => {
    if (input) setOpen(true);
    else nav("/community");
  };

  return (
    <div className="free-board-form-page page-margin-bottom">
      {console.log(input)}
      <BoardSecondHeader header="자유게시판" onclick={handleCancle} />
      <div className="body">
        <FreeBoardForm setInput={(boolean) => setInput(boolean)} handleCancle={handleCancle} />
      </div>

      <AlertCustom
        open={open}
        onclose={() => setOpen(false)}
        onclick={() => nav("/community")}
        closeBtn={"취소"}
        checkBtn={"확인"}
        checkBtnColor={"red"}
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
