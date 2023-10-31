import React from "react";
import LoopIcon from "@mui/icons-material/Loop";
import "./BoardNav.scss";

export default function BoardNav({ point, text }) {
  return (
    <div className="nav-box">
      <div>
        <span className="point">{point}</span>
        <span>{text}</span>
      </div>
      <LoopIcon color="secondary" className="refresh" />
    </div>
  );
}
