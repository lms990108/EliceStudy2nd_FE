import React from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import "./BoardHeader.scss";
import { useNavigate } from "react-router-dom";

export function BoardListHeader({ header, desc, onclick }) {
  return (
    <div className="board-list-header">
      <div className="content">
        <h2>{header}</h2>
        <div className="flex-box">
          <p>{desc}</p>
          <Button onClick={onclick} variant="contained" color="secondary" sx={{ fontSize: 18 }}>
            작성하기
          </Button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export function BoardSecondHeader({ header, path }) {
  const nav = useNavigate();

  const handleClick = () => {
    nav(path);
  };

  return (
    <div className="board-second-header">
      <div className="click-box pointer" onClick={handleClick}>
        <KeyboardDoubleArrowLeftOutlinedIcon />
        <span className="header-title">{header}</span>
      </div>
      <hr />
    </div>
  );
}
