import React, { useEffect, useState } from "react";
import { BoardListHeader } from "../../components/board";
import "./PRBoardListPage.scss";
import PRBoardList from "../../components/board-pr/PRBoardList";
import { UpButton } from "../../components/common/button/UpButton";
import { getPRBoardList } from "../../apis/board/prBoard";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

export function PRBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(0);
  const [scrollRef, inView] = useInView();
  const nav = useNavigate();

  const getPage = () => {
    const list = getPRBoardList();
    setBoardList((cur) => [...cur, ...list]);
  };

  const handleFormBtn = () => {
    nav("/pr-board/create-form");
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
      <BoardListHeader header="홍보게시판" desc={desc} onclick={handleFormBtn} />
      <PRBoardList boardList={boardList} />
      <div className="scroll-ref" ref={scrollRef}></div>
      <UpButton />
    </div>
  );
}
