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
  const [page, setPage] = useState(0);
  const [scrollRef, inView] = useInView();
  const nav = useNavigate();

  const addBoardList = (newList) => {
    setBoardList((cur) => [...cur, ...newList]);
  };

  const getPage = async () => {
    const res = await fetch(`${promotionUrl}`);
    const list = await res.json();
    setNewList(list);
    addBoardList(list);
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

  const desc = (
    <>
      소규모 연극을 홍보하는 곳입니다.
      <br />
      모든 연극인을 응원합니다.
      <br />
      누구나 작성할 수 있습니다.
    </>
  );

  return (
    <div className="pr-board-page page-margin">
      <PRContext.Provider value={boardList}>
        <BoardListHeader
          header="홍보게시판"
          desc={desc}
          onclick={handleFormBtn}
        />
        <PRBoardList newList={newList} />
        <div className="scroll-ref" ref={scrollRef}></div>
        <UpButton />
      </PRContext.Provider>
    </div>
  );
}
