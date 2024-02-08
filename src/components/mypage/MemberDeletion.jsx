import React, { useState } from "react";
import "./MemberDeletion.scss";
import Button from "@mui/material/Button";
import { AlertCustom } from "../common/alert/Alerts";
import { userUrl } from "../../apis/apiURLs";
import { useNavigate } from "react-router";
import { Backdrop } from "@mui/material";

function MemberDeletion() {
  const [openAlert, setOpenAlert] = useState(false);
  const nav = useNavigate();

  const handleDelete = async () => {
    const res = await fetch(`${userUrl}`, { method: "DELETE", credentials: "include" });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      nav(`/`);
    }
  };

  return (
    <>
      <div className="member-deletion-container">
        <div className="header">
          <h1>회원탈퇴</h1>
        </div>
        <div className="member-deletion-text-box">
          <p>이용에 불편을 드려서 죄송합니다.</p>
          <p className="member-deletion-red-text">회원 탈퇴시 회원정보는 삭제되며 복구가 불가능합니다.</p>
        </div>
        <Button onClick={() => setOpenAlert(true)} variant="contained" color="red" sx={{ width: "180px", height: "48px" }}>
          <h4>티니박스 서비스 탈퇴</h4>
        </Button>
      </div>
      <Backdrop open={openAlert} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AlertCustom
          severity="error"
          open={openAlert}
          onclose={() => setOpenAlert(false)}
          onclick={() => handleDelete()}
          checkBtn={"확인"}
          closeBtn={"취소"}
          title={"teenybox.com 내용:"}
          content={"정말 탈퇴하시겠습니까? 탈퇴시 회원정보는 삭제되며 복구가 불가능합니다."}
        />
      </Backdrop>
    </>
  );
}

export default MemberDeletion;
