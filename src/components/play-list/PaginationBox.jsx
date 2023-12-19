import React, { useState, useEffect } from "react";
import "./PaginationBox.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationBox({
  innerWidth,
  playsCount,
  conditionPlays,
  setPaginationPlays,
  selectedRegion,
  sortStandard,
}) {
  // 현재 페이지 숫자를 나타내기 위한 상태
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageNumberChange = (e, number) => {
    setPaginationPlays(conditionPlays.slice(24 * number - 24, 24 * number));
    setCurrentPage(number);
  };

  // 지역, 조건 검색, 정렬 기준이 변할 때 페이지는 1로 다시 리셋되어야 함.
  useEffect(() => {
    setCurrentPage(1);
  }, [conditionPlays, selectedRegion, sortStandard]);

  return (
    <div className="play-list-pagenation">
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(playsCount / 24)}
          color="secondary"
          page={currentPage}
          size={innerWidth >= 481 ? "large" : "small"}
          onChange={handlePageNumberChange}
        />
      </Stack>
    </div>
  );
}
