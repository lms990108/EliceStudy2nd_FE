import React from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import "./BoardHeader.scss";

export function BoardListHeader({ header, desc, onclick }) {
  return (
    <div className="board-list-header">
      <div className="content flex-box">
        <div>
          <h2>{header}</h2>
          <p>{desc}</p>
        </div>
        <Button onClick={onclick} variant="contained" color="secondary" sx={{ fontSize: 18 }}>
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
