import { Button } from "@mui/material";
import React from "react";
import "./BoardHeader.scss";

export default function BoardListHeader({ header, desc }) {
  return (
    <div className="board-list-header">
      <h2>{header}</h2>
      <div className="flex-box">
        {desc}
        <Button variant="contained" color="secondary" size="small">
          작성하기
        </Button>
      </div>
      <hr></hr>
    </div>
  );
}
