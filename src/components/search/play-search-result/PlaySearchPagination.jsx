import { useState, useEffect } from "react";
import "./PlaySearchPagination.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PlaySearchPagination({
  playSearchResultCnt,
  playSearchResult,
  setPaginationPlaySearch,
}) {
  // 현재 페이지 숫자를 나타내기 위한 상태
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageNumberChange = (e, number) => {
    setPaginationPlaySearch(
      playSearchResult.slice(10 * number - 10, 10 * number)
    );
    setCurrentPage(number);
  };

  // 정렬 조건이 변할 때 1로 되돌아오는 코드 추가
  useEffect(() => {
    setCurrentPage(1);
  }, [playSearchResult]);

  return (
    <div className="play-search-pagination">
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(playSearchResultCnt / 10)}
          color="secondary"
          page={currentPage}
          size="large"
          onChange={handlePageNumberChange}
        />
      </Stack>
    </div>
  );
}
