import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import "./BoardHeader.scss";
import { AlertCustom } from "../common/alert/Alerts";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

export function BoardListHeader({ header, desc, onclick }) {
  const { userData } = useContext(AppContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (userData.isLoggedIn) {
      onclick();
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="board-list-header">
      <AlertCustom
        severity={"warning"}
        open={open}
        onclose={() => setOpen(false)}
        onclick={() => nav("/signup-in")}
        title={"회원전용 기능입니다. 로그인 하시겠습니까?"}
        checkBtn={"확인"}
        closeBtn={"취소"}
      />
      <div className="content flex-box">
        <div>
          <h2>{header}</h2>
          <p>{desc}</p>
        </div>
        <Button onClick={handleClick} variant="contained" color="secondary" sx={{ fontSize: 18 }}>
          작성하기
        </Button>
      </div>
      <hr></hr>
    </div>
  );
}

export function BoardSecondHeader({ header, onclick }) {
  return (
    <div className="board-second-header">
      <div className="click-box pointer" onClick={onclick}>
        <KeyboardDoubleArrowLeftOutlinedIcon />
        <span className="header-title">{header}</span>
      </div>
      <hr />
    </div>
  );
}
