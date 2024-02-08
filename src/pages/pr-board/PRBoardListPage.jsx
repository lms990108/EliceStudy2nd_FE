import React, { useEffect, useState } from "react";
import { BoardListHeader } from "../../components/board";
import "./PRBoardListPage.scss";
import PRBoardList from "../../components/board-pr/PRBoardList";
import { UpButton } from "../../components/common/button/UpButton";
import { useInView } from "react-intersection-observer";
import { promotionUrl } from "../../apis/apiURLs";
import { Button, CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import ServerError from "../../components/common/state/ServerError";
import Empty from "../../components/common/state/Empty";
import { ArrowBackIosRounded, ArrowForwardIosRounded, SmsOutlined, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom/dist";

const MAX_BANNER_INDEX = 3;

export function PRBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [scrollRef, inView] = useInView();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [sort, setSort] = useState("promotion_number desc");
  const nav = useNavigate();

  const addBoardList = (newList) => {
    setBoardList((cur) => [...cur, ...newList]);
  };

  const getPage = async () => {
    setState("loading");
    const [by, order] = sort.split(" ");
    const res = await fetch(`${promotionUrl}?page=${page}&limit=20&sortBy=${by}&sortOrder=${order}`);
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

  const handleClickDivision = (e) => {
    setSelected(e.target.id);
  };

  const handleFormBtn = () => {
    nav("/promotion/write");
  };

  useEffect(() => {
    if (inView) {
      // 총 개수 받아서 page 넘어가면 api 호출 X
      if (totalCnt && boardList.length >= totalCnt) return;
      getPage();
    }
  }, [inView]);

  useEffect(() => {
    getPage();
  }, [sort, selected]);

  return (
    <div className="pr-board-page page-margin">
      <BoardListHeader header="홍보게시판" />
      {!boardList.length || (
        <div className="best-box">
          <img className="bg-img" src={boardList[bannerIndex]?.image_url[0] || "https://elice-5th.s3.amazonaws.com/promotions%252F1707380134216_teeny-box-icon.png"} />
          <div className="bg-mask">
            <div className="contents-container">
              <div className="left-box">
                <div className="sub-title">인기 소규모 연극</div>
                <h2 className="title">{boardList[bannerIndex]?.play_title}</h2>
                <div className="date">
                  {boardList[bannerIndex]?.start_date?.split("T")[bannerIndex]} ~ {boardList[bannerIndex]?.end_date?.split("T")[bannerIndex]}
                </div>
                <div className="content">
                  <div className="ellipsis">{boardList[bannerIndex]?.title}</div>
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
              <img className="poster" src={boardList[bannerIndex]?.image_url[0] || "https://elice-5th.s3.amazonaws.com/promotions%252F1707380134216_teeny-box-icon.png"} />
            </div>
          </div>
          <ArrowBackIosRounded className="arrow-left pointer" onClick={handleClickLeftArrow} />
          <ArrowForwardIosRounded className="arrow-right pointer" onClick={handleClickRightArrow} />
        </div>
      )}
      <div className="header flex-box">
        <div className="division flex-box">
          <div id="" className={selected === "" ? "selected" : ""} onClick={handleClickDivision}>
            전체보기
          </div>
          <div id="play" className={selected === "play" ? "selected" : ""} onClick={handleClickDivision}>
            연극
          </div>
          <div id="athor" className={selected === "athor" ? "selected" : ""} onClick={handleClickDivision}>
            기타
          </div>
        </div>
        <div className="buttons">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} displayEmpty>
              <MenuItem value="promotion_number desc">최신순</MenuItem>
              <MenuItem value="likes desc">추천순</MenuItem>
              <MenuItem value="views desc">조회순</MenuItem>
              <MenuItem value="promotion_number asc">오래된순</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleFormBtn} variant="contained" size="small" color="secondary" disableElevation>
            작성하기
          </Button>
        </div>
      </div>
      {state === "loading" ? (
        <div className={`state box`}>
          <CircularProgress />
        </div>
      ) : state === "hasError" ? (
        <div className={`state box`}>
          <ServerError onClickBtn={() => getPage()} />
        </div>
      ) : boardList.length ? (
        <>
          <PRBoardList newList={boardList} />
          <UpButton />
          <div className="scroll-ref" ref={scrollRef}></div>
        </>
      ) : (
        <div className={`state box`}>
          <Empty children={<></>} />
        </div>
      )}
    </div>
  );
}
