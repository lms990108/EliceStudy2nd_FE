import React, { useEffect, useState } from "react";
import { BoardListHeader, BoardNav } from "../../components/board";
import FreeBoardList from "../../components/board-free/FreeBoardList";
import "./FreeBoardListPage.scss";
import { CircularProgress, Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postUrl } from "../../apis/apiURLs";
import ServerError from "../../components/common/state/ServerError";
import Empty from "../../components/common/state/Empty";

export function FreeBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const getPage = async () => {
    setState("loading");
    const query_page = Number(searchParams.get("page")) || 1;
    const res = await fetch(`${postUrl}?page=${query_page}&limit=10`);
    const list = await res.json();

    if (res.ok) {
      setBoardList(list);
      setPage(query_page);
      setState("hasValue");
    } else {
      setState("hasError");
    }
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

  const desc = <p>연극 및 다양한 공연에 대해 이야기 하는 곳입니다.</p>;

  return (
    <div className="free-board-page page-margin">
      <BoardListHeader header="커뮤니티" desc={desc} onclick={handleFormBtn} />
      <div className="main">
        {state === "loading" ? (
          <div className="state">
            <CircularProgress />
          </div>
        ) : state === "hasError" ? (
          <div className="state">
            <ServerError onClickBtn={() => getPage()} />
          </div>
        ) : boardList.length ? (
          <>
            <BoardNav point="620개" text="의 글 목록" onclick={getPage} />
            <FreeBoardList boardList={boardList} />
            <div className="pagination">
              <Pagination page={page} onChange={handleChange} count={Math.ceil(boardList.length / 10)} color="secondary" siblingCount={2} />
            </div>
          </>
        ) : (
          <div className="state">
            <Empty children={<></>} />
          </div>
        )}
      </div>
    </div>
  );
}
