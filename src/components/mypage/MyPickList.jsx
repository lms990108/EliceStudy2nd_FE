/* 마이페이지 - 찜한 연극 LIST */
import React from "react";
import "./MyPickList.scss";
import Button from "@mui/material/Button";
import MyPagePagination from "./pagination/MyPagePagination";

function MyPickList() {
  return (
    <>
      <div className="my-pick-list-container">
        <div className="my-pick-list-header">
          <h1>찜한 연극 LIST</h1>
          <Button
            variant="contained"
            color="orange"
            sx={{ width: "80px", height: "40px", color: "white"}}
          >
            <h4>삭제</h4>
          </Button>
        </div>
        <div className="my-pick-list-content-container">
          <div className="my-pick-list-content"></div>
          <div className="my-pick-list-content"></div>
          <div className="my-pick-list-content"></div>
          <div className="my-pick-list-content"></div>
          <div className="my-pick-list-content"></div>
          <div className="my-pick-list-content"></div>
        </div>
        <MyPagePagination />
      </div>
    </>
  );
}

export default MyPickList;
