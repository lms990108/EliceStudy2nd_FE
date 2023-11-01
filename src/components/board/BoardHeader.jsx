import { Button } from "@mui/material";
import React from "react";
import "./BoardHeader.scss";

export default function BoardListHeader({ header, desc }) {
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
