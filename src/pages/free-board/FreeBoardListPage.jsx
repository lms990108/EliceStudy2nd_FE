import React, { useEffect, useState } from "react";
import { BoardListHeader, BoardNav } from "../../components/board";
import FreeBoardList from "../../components/board-free/FreeBoardList";
import "./FreeBoardListPage.scss";
import { Button, CircularProgress, Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postUrl } from "../../apis/apiURLs";
import ServerError from "../../components/common/state/ServerError";
import Empty from "../../components/common/state/Empty";
import { Loop, SwapVert } from "@mui/icons-material";

export function FreeBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [toggle, setToggle] = useState(false);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = () => {
    setToggle(true);
    setTimeout(() => setToggle(false), 500);
    getPage();
  };

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

  return (
    <div className="free-board-page page-margin">
      <div className="free-board-left-container">
        <BoardListHeader header="커뮤니티" onclick={handleFormBtn} />
        <div className="header flex-box">
          <div className="left">
            <span className="point">160</span>개의 글
            <Loop onClick={handleClick} color="secondary" className={`refresh pointer ${toggle && "start"}`} />
          </div>
          <div className="buttons">
            <Button variant="outlined" size="small" color="darkGray" startIcon={<SwapVert />}>
              최신순
            </Button>
            <Button variant="contained" size="small" color="secondary" disableElevation>
              작성하기
            </Button>
          </div>
        </div>
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
      <div className="free-board-right-container">
        <div className="right-box">
          <h4>최근 본 글</h4>
          <ul>
            <li>연극 보러 갈 사람?</li>
            <li>소규모 연극 신입 부원 구합니다!</li>
            <li>서울대 연극 동아리 &lt;배고픈 사람들&gt; 후기</li>
            <li>꽃 찾으러 왔단다라는 연극 아시나용</li>
            <li>요즘 하는 재밌는 연극 추천좀</li>
          </ul>
        </div>

        <div className="right-box">
          <h4>인기 글</h4>
          <ul>
            <li>1. 연극 보러 갈 사람?</li>
            <li>2. 소규모 연극 신입 부원 구합니다!</li>
            <li>3. 서울대 연극 동아리 &lt;배고픈 사람들&gt; 후기</li>
            <li>4. 꽃 찾으러 왔단다라는 연극 아시나용</li>
            <li>5. 요즘 하는 재밌는 연극 추천좀</li>
          </ul>
        </div>

        <div className="right-box">
          <h4>인기 태그</h4>
          <ol>
            <li>#연극 보러 갈 사람?</li>
            <li>#소규모 연극</li>
            <li>#동아리</li>
            <li>#추천</li>
            <li>#옥탑방 고양이</li>
          </ol>
        </div>

        <div className="right-box">
          <h4>최근 댓글</h4>
          <ul>
            <li>연극 보러 갈 사람?</li>
            <li>소규모 연극 신입 부원 구합니다!</li>
            <li>서울대 연극 동아리 &lt;배고픈 사람들&gt; 후기</li>
            <li>꽃 찾으러 왔단다라는 연극 아시나용</li>
            <li>요즘 하는 재밌는 연극 추천좀</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
