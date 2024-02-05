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
import { ArrowBackIosNewRounded, ArrowBackIosRounded, ArrowForwardIosRounded, SmsOutlined, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";

export function PRBoardListPage() {
  const [boardList, setBoardList] = useState([]);
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
    console.log(list);

    if (res.ok) {
      if (list.length) {
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
      <BoardListHeader header="홍보게시판" onclick={handleFormBtn} />
      <div className="best-box">
        <img className="bg-img" src="https://elice-5th.s3.amazonaws.com/promotions/1706321523702_110302_play_726.jpg" />
        <div className="bg-mask">
          <div className="contents-container">
            <div className="left-box">
              <div className="sub-title">BEST 홍보글</div>
              <h2 className="title">{boardList[0]?.title}</h2>
              <div className="date">
                {boardList[0]?.start_date.split("T")[0]} ~ {boardList[0]?.end_date.split("T")[0]}
              </div>
              <div className="content">{boardList[0]?.content}</div>
              <div className="footer">
                <VisibilityOutlined sx={{ fontSize: 20 }} />
                <span>{boardList[0]?.views || 0}</span>
                <ThumbUpOutlined sx={{ fontSize: 20 }} />
                <span>{boardList[0]?.likes || 0}</span>
                <SmsOutlined sx={{ fontSize: 20 }} />
                <span>{boardList[0]?.comments || 0}</span>
              </div>
            </div>
            <img className="poster" src="https://elice-5th.s3.amazonaws.com/promotions/1706321523702_110302_play_726.jpg" />
          </div>
          <div className="arrow">
            <ArrowBackIosRounded className="pointer" />
            <ArrowForwardIosRounded className="pointer" />
          </div>
        </div>
      </div>
      {!boardList.length || (
        <>
          <PRBoardList newList={boardList} />
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
