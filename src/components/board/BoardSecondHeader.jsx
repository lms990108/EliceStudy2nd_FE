import React from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import "./BoardSecondHeader.scss";

export default function BoardSecondHeader({ header }) {
  return (
    <div className="board-second-header">
      <KeyboardDoubleArrowLeftOutlinedIcon className="pointer" />
      <span className="header-title pointer">{header}</span>
      <hr />
    </div>
  );
}
