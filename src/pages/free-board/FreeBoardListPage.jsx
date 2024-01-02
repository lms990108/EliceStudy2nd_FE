import React, { useEffect, useState } from "react";
import { BoardListHeader, BoardNav } from "../../components/board";
import FreeBoardList from "../../components/board-free/FreeBoardList";
import "./FreeBoardListPage.scss";
import { Pagination } from "@mui/material";
import { getFreeBoardList } from "../../apis/board/freeBoard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postUrl } from "../../apis/apiURLs";

export function FreeBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const getPage = async () => {
    const query_page = Number(searchParams.get("page")) || 1;
    const res = await fetch(`${postUrl}?page=${query_page}&limit=10`);
    const list = await res.json();
    setBoardList(list);
    setPage(query_page);
  };

  const handleChange = (e, value) => {
    setPage(value);
    nav(`?page=${value}`);
  };

  const handleFormBtn = () => {
    nav("/community/write");
  };

  useEffect(() => {
    getPage();
  }, [page]);

  const desc = (
    <p>
      연극 및 다양한 공연에 대해 이야기 하는 곳입니다. <br /> 누구나 작성할 수 있으며,
      <br /> 비방 및 욕설, 음란물은 작성 불가합니다.
    </p>
  );

  return (
    <div className="free-board-page page-margin">
      <BoardListHeader header="자유게시판" desc={desc} onclick={handleFormBtn} />
      <BoardNav point="620개" text="의 글 목록" onclick={getPage} />
      <FreeBoardList boardList={boardList} />
      <div className="pagination">
        <Pagination page={page} onChange={handleChange} count={20} color="secondary" siblingCount={2} />
      </div>
    </div>
  );
}
