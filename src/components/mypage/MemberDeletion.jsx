import React from "react";
import "./MemberDeletion.scss";
import Button from "@mui/material/Button";

function MemberDeletion() {
  return (
    <>
      <div className="member-deletion-container">
        <h1>회원탈퇴</h1>
        <div className="member-deletion-text-box">
          <p>이용에 불편을 드려서 죄송합니다.</p>
          <p className="member-deletion-red-text">
            회원 탈퇴시 회원정보는 삭제되며 복구가 불가능합니다.
          </p>
        </div>
        <Button
          variant="contained"
          color="red"
          sx={{ width: "180px", height: "48px" }}
        >
          <h4>티니박스 서비스 탈퇴</h4>
        </Button>
      </div>
    </>
  );
}

export default MemberDeletion;
