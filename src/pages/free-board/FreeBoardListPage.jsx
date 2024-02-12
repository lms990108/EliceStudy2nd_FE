import React, { useEffect, useState } from "react";
import { BoardListHeader, BoardNav } from "../../components/board";
import FreeBoardList from "../../components/board-free/FreeBoardList";
import "./FreeBoardListPage.scss";
import { Button, CircularProgress, Pagination, FormControl, MenuItem, Select } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postUrl } from "../../apis/apiURLs";
import ServerError from "../../components/common/state/ServerError";
import Empty from "../../components/common/state/Empty";
import { Loop, SwapVert } from "@mui/icons-material";
import { BoardRightContainer } from "../../components/board/BoardRightContainer";
import { set } from "date-fns";

export function FreeBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [toggle, setToggle] = useState(false);
  const [sort, setSort] = useState("post_number desc");
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    setToggle(true);
    setTimeout(() => setToggle(false), 500);
    getPage();
  };

  const getPage = async () => {
    setState("loading");
    try {
      const [by, order] = sort.split(" ");
      const res = await fetch(`${postUrl}?page=${page}&limit=10&sortBy=${by}&sortOrder=${order}`);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setBoardList(data.posts);
        setTotalCnt(data.totalCount);
        setState("hasValue");
      } else {
        setState("hasError");
      }
    } catch (err) {
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

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    getPage();
  }, [sort]);

  return (
    <div className="free-board-page page-margin">
      <div className="free-board-left-container">
        <BoardListHeader header="커뮤니티" />
        <div className="header flex-box">
          <div className="left">
            <span className="point">{totalCnt.toLocaleString("ko-KR")}</span>개의 글
            <Loop onClick={handleClick} color="secondary" className={`refresh pointer ${toggle && "start"}`} />
          </div>
          <div className="buttons">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select value={sort} onChange={(e) => setSort(e.target.value)} displayEmpty>
                <MenuItem value="post_number desc">최신순</MenuItem>
                <MenuItem value="likes desc">추천순</MenuItem>
                <MenuItem value="views desc">조회순</MenuItem>
                <MenuItem value="post_number asc">오래된순</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleFormBtn} variant="contained" size="small" color="secondary" disableElevation>
              작성하기
            </Button>
          </div>
        </div>
        <div className="main">
          {state === "loading" ? (
            <div className="state">
              <CircularProgress color="secondary" className="progress" />
            </div>
          ) : state === "hasError" ? (
            <div className="state">
              <ServerError onClickBtn={() => getPage()} />
            </div>
          ) : boardList.length ? (
            <>
              <FreeBoardList boardList={boardList} />
              <div className="pagination">
                <Pagination page={page} onChange={handleChange} count={Math.ceil(totalCnt / 10)} color="secondary" siblingCount={2} />
              </div>
            </>
          ) : (
            <div className="state">
              <Empty children={<></>} />
            </div>
          )}
        </div>
      </div>
      <BoardRightContainer />
    </div>
  );
}
