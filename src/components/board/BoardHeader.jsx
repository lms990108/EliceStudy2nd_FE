import React from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import "./BoardHeader.scss";

export function BoardListHeader({ header, desc }) {
  return (
    <div className="board-list-header">
      <h2>{header}</h2>
      <div className="flex-box">
        <p>{desc}</p>
        <Button variant="contained" color="secondary" sx={{ fontSize: 16 }}>
          작성하기
        </Button>
      </div>
      <hr></hr>
    </div>
  );
}

export function BoardSecondHeader({ header }) {
  return (
    <div className="board-second-header">
      <KeyboardDoubleArrowLeftOutlinedIcon className="pointer" />
      <span className="header-title pointer">{header}</span>
      <hr />
    </div>
  );
}
