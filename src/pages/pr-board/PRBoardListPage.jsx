import React, { useEffect, useState } from "react";
import { BoardListHeader } from "../../components/board";
import "./PRBoardListPage.scss";
import PRBoardList from "../../components/board-pr/PRBoardList";
import { UpButton } from "../../components/common/button/UpButton";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { promotionUrl } from "../../apis/apiURLs";
import { CircularProgress } from "@mui/material";
import ServerError from "../../components/common/state/ServerError";
import Empty from "../../components/common/state/Empty";

export function PRBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [scrollRef, inView] = useInView();
  const nav = useNavigate();

  const addBoardList = (newList) => {
    setBoardList((cur) => [...cur, ...newList]);
  };

  const getPage = async () => {
    // 총 개수 받아서 page 넘어가면 api 호출 X
    setState("loading");
    const res = await fetch(`${promotionUrl}?page=${page}&limit=8`);
    const list = await res.json();

    if (res.ok) {
      if (list.length) {
        setNewList(list);
        addBoardList(list);
        setPage(page + 1);
      }
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleFormBtn = () => {
    nav("/promotion/write");
  };

  useEffect(() => {
    getPage();
  }, []);

  useEffect(() => {
    if (inView) {
      getPage();
    }
  }, [inView]);

  const desc = <>소규모 연극을 홍보하는 곳입니다.</>;

  return (
    <div className="pr-board-page page-margin">
      <BoardListHeader header="홍보게시판" desc={desc} onclick={handleFormBtn} />
      {!boardList.length || (
        <>
          <PRBoardList newList={newList} />
          <UpButton />
        </>
      )}
      {state === "loading" ? (
        <div className={`state ${boardList.length || "box"}`}>
          <CircularProgress />
        </div>
      ) : state === "hasError" ? (
        <div className={`state ${boardList.length || "box"}`}>
          <ServerError onClickBtn={() => getPage()} />
        </div>
      ) : boardList.length ? (
        <>
          <div className="scroll-ref" ref={scrollRef}></div>
        </>
      ) : (
        <div className={`state ${boardList.length || "box"}`}>
          <Empty children={<></>} />
        </div>
      )}
    </div>
  );
}
