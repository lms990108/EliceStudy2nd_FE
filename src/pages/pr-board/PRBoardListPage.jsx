import React, { createContext, useEffect, useState } from "react";
import { BoardListHeader } from "../../components/board";
import "./PRBoardListPage.scss";
import PRBoardList from "../../components/board-pr/PRBoardList";
import { UpButton } from "../../components/common/button/UpButton";
import { getPRBoardList } from "../../apis/board/prBoard";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { promotionUrl } from "../../apis/apiURLs";

export const PRContext = createContext(getPRBoardList());

export function PRBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [page, setPage] = useState(1);
  const [scrollRef, inView] = useInView();
  const nav = useNavigate();

  const addBoardList = (newList) => {
    setBoardList((cur) => [...cur, ...newList]);
  };

  const getPage = async () => {
    const res = await fetch(`${promotionUrl}?page=${page}`);
    const list = await res.json();
    setNewList(list);
    addBoardList(list);
    setPage(page + 1);
  };

  const handleFormBtn = () => {
    nav("/promotion/write");
  };

  useEffect(() => {
    // const list = getPRBoardList();
    // setBoardList(list);
  }, []);

  useEffect(() => {
    if (inView) {
      getPage();
    }
  }, [inView]);

  const desc = <>소규모 연극을 홍보하는 곳입니다.</>;

  return (
    <div className="pr-board-page page-margin">
      <PRContext.Provider value={boardList}>
        <BoardListHeader header="홍보게시판" desc={desc} onclick={handleFormBtn} />
        <PRBoardList newList={newList} />
        <div className="scroll-ref" ref={scrollRef}></div>
        <UpButton />
      </PRContext.Provider>
    </div>
  );
}
