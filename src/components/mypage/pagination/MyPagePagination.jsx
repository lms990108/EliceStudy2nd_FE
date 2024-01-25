import React, { useState, useEffect } from "react";
import "./MyPagePagination.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function MyPagePagination({
  innerWidth,
  playsCount,
  Plays,
  setPaginationPlays,
}) {
  // 현재 페이지 숫자를 나타내기 위한 상태
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageNumberChange = (e, number) => {
    setPaginationPlays(Plays.slice(6 * number - 6, 6 * number));
    setCurrentPage(number);
  };

  return (
    <div className="play-list-pagenation">
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(playsCount / 6)}
          color="secondary"
          page={currentPage}
          size={innerWidth >= 481 ? "large" : "small"}
          onChange={handlePageNumberChange}
        />
      </Stack>
    </div>
  );
}
