import { useState, useEffect } from "react";
import "./PlaySearchPagination.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PlaySearchPagination({
  curPage,
  setCurPage,
  playTotalCnt,
  keyword,
  setPlaySearchResult,
  setAlert,
}) {
  // console.log();
  const handlePageNumberChange = (e, number) => {
    setCurPage(number);

    // fetch(
    //   `https://dailytopia2.shop/api/shows?title=${keyword}&page=${number}&limit=10`
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       setAlert({
    //         title: "오류",
    //         content: "연극 데이터를 가져오는 중 오류가 발생하였습니다.",
    //         open: true,
    //         onclose: () => setAlert(null),
    //         severity: "error",
    //       });
    //     }
    //   })
    //   .then((data) => setPlaySearchResult(data.data))
    //   .catch(() => {
    //     setAlert({
    //       title: "오류",
    //       content: "리뷰 데이터를 받아오는 데 실패했습니다.",
    //       severity: "error",
    //       open: true,
    //       onclose: () => setAlert(null),
    //     });
    //   });
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
