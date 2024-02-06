import React, { useEffect, useState } from "react";
import { BoardListHeader } from "../../components/board";
import "./PRBoardListPage.scss";
import PRBoardList from "../../components/board-pr/PRBoardList";
import { UpButton } from "../../components/common/button/UpButton";
import { useInView } from "react-intersection-observer";
import { promotionUrl } from "../../apis/apiURLs";
import { CircularProgress } from "@mui/material";
import ServerError from "../../components/common/state/ServerError";
import Empty from "../../components/common/state/Empty";
import { ArrowBackIosRounded, ArrowForwardIosRounded, SmsOutlined, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";

const MAX_BANNER_INDEX = 3;

export function PRBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [scrollRef, inView] = useInView();
  const [bannerIndex, setBannerIndex] = useState(0);

  const addBoardList = (newList) => {
    setBoardList((cur) => [...cur, ...newList]);
  };

  const getPage = async () => {
    // 총 개수 받아서 page 넘어가면 api 호출 X
    if (totalCnt && boardList.length >= totalCnt) return;
    setState("loading");
    const res = await fetch(`${promotionUrl}?page=${page}&limit=20`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      if (data.totalCount) {
        addBoardList(data.promotions);
        setPage(page + 1);
        setTotalCnt(data.totalCount);
      }
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleClickLeftArrow = () => {
    if (bannerIndex <= 0) {
      setBannerIndex(MAX_BANNER_INDEX);
    } else {
      setBannerIndex((cur) => cur - 1);
    }
  };

  const handleClickRightArrow = () => {
    if (bannerIndex >= MAX_BANNER_INDEX) {
      setBannerIndex(0);
    } else {
      setBannerIndex((cur) => cur + 1);
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  useEffect(() => {
    if (inView) {
      getPage();
    }
  }, [inView]);

  return (
    <div className="pr-board-page page-margin">
      <BoardListHeader header="홍보게시판" />
      <div className="best-box">
        <img className="bg-img" src={boardList[bannerIndex]?.image_url[0] || "https://elice-5th.s3.amazonaws.com/promotions/1706321523702_110302_play_726.jpg"} />
        <div className="bg-mask">
          <div className="contents-container">
            <div className="left-box">
              <div className="sub-title">BEST 홍보글</div>
              <h2 className="title">{boardList[bannerIndex]?.title}</h2>
              <div className="date">
                {boardList[bannerIndex]?.start_date?.split("T")[bannerIndex] || "2024-02-01"} ~ {boardList[bannerIndex]?.end_date?.split("T")[bannerIndex] || "2024-04-12"}
              </div>
              <div className="content">
                <div className="ellipsis">{boardList[bannerIndex]?.content}</div>
              </div>
              <div className="footer">
                <VisibilityOutlined sx={{ fontSize: 20 }} />
                <span>{boardList[bannerIndex]?.views || 0}</span>
                <ThumbUpOutlined sx={{ fontSize: 20 }} />
                <span>{boardList[bannerIndex]?.likes || 0}</span>
                <SmsOutlined sx={{ fontSize: 20 }} />
                <span>{boardList[bannerIndex]?.comments || 0}</span>
              </div>
            </div>
            <img className="poster" src={boardList[bannerIndex]?.image_url[0] || "https://elice-5th.s3.amazonaws.com/promotions/1706321523702_110302_play_726.jpg"} />
          </div>
          <div className="arrow">
            <ArrowBackIosRounded onClick={handleClickLeftArrow} className="pointer" />
            <ArrowForwardIosRounded onClick={handleClickRightArrow} className="pointer" />
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
