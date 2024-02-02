import React, { useState, useEffect } from "react";
import "./PaginationBox.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationBox({
  innerWidth,
  playsCount,
  selectedRegion,
  sortStandard,
  setCurPage,
  curPage,
}) {
  const handlePageNumberChange = (e, number) => {
    setCurPage(number);
  };

  // 지역, 조건 검색, 정렬 기준이 변할 때 페이지는 1로 다시 리셋되어야 함.
  useEffect(() => {
    setCurPage(1);
  }, [selectedRegion, sortStandard]);

  return (
    <div className="play-list-pagenation">
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(playsCount / 24)}
          color="secondary"
          page={curPage}
          size={innerWidth >= 481 ? "large" : "small"}
          onChange={handlePageNumberChange}
        />
      </Stack>
    </div>
  );
}
