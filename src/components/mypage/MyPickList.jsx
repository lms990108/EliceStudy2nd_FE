/* 마이페이지 - 찜한 연극 LIST */
import React from "react";
import "./MyPickList.scss";

function MyPickList() {
  return (
    <>
      <div className="my-pick-list-container">
        <h1>찜한 연극 LIST</h1>
        <div className="my-pick-list-content-container">
            <div className="my-pick-list-content"></div>
            <div className="my-pick-list-content"></div>
            <div className="my-pick-list-content"></div>
            <div className="my-pick-list-content"></div>
            <div className="my-pick-list-content"></div>
            <div className="my-pick-list-content"></div>
        </div>
      </div>
    </>
  );
}

export default MyPickList;
