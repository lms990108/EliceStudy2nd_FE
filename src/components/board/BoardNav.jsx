import React, { useState } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import "./BoardNav.scss";

export function BoardNav({ point, text, onclick }) {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(true);
    setTimeout(() => setToggle(false), 500);
    onclick();
  };
  return (
    <div className="nav-box">
      <div>
        <span className="point">{point}</span>
        <span>{text}</span>
      </div>
      <LoopIcon onClick={handleClick} color="secondary" className={`refresh pointer ${toggle && "start"}`} />
    </div>
  );
}
