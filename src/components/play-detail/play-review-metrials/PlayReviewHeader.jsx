import React from "react";
import "./PlayReviewHeader.scss";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function PlayReviewHeader({
  count,
  sortStandard,
  setSortStandard,
  setCurPage,
}) {
  return (
    <>
      <div className="play-review-header-container">
        <div className="number-of-plays">
          <span>{count}개</span>의 리뷰
        </div>
        <div className="sort">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={sortStandard}
              onChange={(e) => {
                setSortStandard(e.target.value);
                setCurPage(1);
              }}
              displayEmpty
            >
              <MenuItem value="recent">최신순</MenuItem>
              <MenuItem value="rate">높은 평점순</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="review-header-line"></div>
    </>
  );
}
