import React from "react";
import LoopIcon from "@mui/icons-material/Loop";
import "./BoardNav.scss";

export function BoardNav({ point, text, onclick }) {
  return (
    <div className="nav-box">
      <div>
        <span className="point">{point}</span>
        <span>{text}</span>
      </div>
      <LoopIcon onClick={onclick} color="secondary" className="refresh pointer" />
    </div>
  );
}
