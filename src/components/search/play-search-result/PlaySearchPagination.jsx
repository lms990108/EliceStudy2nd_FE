import { useState, useEffect } from "react";
import "./PlaySearchPagination.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PlaySearchPagination({
  curPage,
  setCurPage,
  playTotalCnt,
}) {
  const handlePageNumberChange = (e, number) => {
    setCurPage(number);
  };

  return (
    <div className="play-search-pagination">
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(playTotalCnt / 10)}
          color="secondary"
          page={curPage}
          size="large"
          onChange={handlePageNumberChange}
        />
      </Stack>
    </div>
  );
}
