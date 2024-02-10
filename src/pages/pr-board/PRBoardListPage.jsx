import React, { Children, useEffect, useState } from "react";
import { BoardListHeader } from "../../components/board";
import "./PRBoardListPage.scss";
import PRBoardList from "../../components/board-pr/PRBoardList";
import { UpButton } from "../../components/common/button/UpButton";
import { useInView } from "react-intersection-observer";
import { promotionUrl } from "../../apis/apiURLs";
import { Button, CircularProgress, FormControl, MenuItem, Select, Skeleton } from "@mui/material";
import ServerError from "../../components/common/state/ServerError";
import Empty from "../../components/common/state/Empty";
import { ArrowBackIosRounded, ArrowForwardIosRounded, SmsOutlined, ThumbUpOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom/dist";
import getBestPromotionPlay from "../../utils/getBestPromotionPlay";
import TimeFormat from "../../components/common/time/TimeFormat";

export function PRBoardListPage() {
  const [boardList, setBoardList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("loading");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("promotion_number desc");

  const [bannerList, setBannerList] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  const [scrollRef, inView] = useInView();
  const nav = useNavigate();

  const getBannerList = async () => {
    let newList = await getBestPromotionPlay();
    setBannerList(newList.slice(0, 5));
  };

  const addBoardList = (newList) => {
    setBoardList((cur) => [...cur, ...newList]);
  };

  const getPage = async (curPage, method) => {
    setState("loading");
    const [by, order] = sort.split(" ");
    console.log(by, order);
    const res = await fetch(`${promotionUrl}?page=${curPage || page}&limit=20&sortBy=${by}&sortOrder=${order}&category=${category}`);
    const data = await res.json();
    console.log(res, data);

    if (res.ok) {
      if (data.totalCount) {
        method === "add" ? addBoardList(data.promotions) : setBoardList(data.promotions);
        setPage(curPage + 1);
        setTotalCnt(data.totalCount);
      }
      setState("hasValue");
    } else {
      setState("hasError");
    }
  };

  const handleClickLeftArrow = () => {
    if (bannerIndex <= 0) {
      setBannerIndex(bannerList.length - 1);
    } else {
      setBannerIndex((cur) => cur - 1);
    }
  };

  const handleClickRightArrow = () => {
    if (bannerIndex >= bannerList.length - 1) {
      setBannerIndex(0);
    } else {
      setBannerIndex((cur) => cur + 1);
    }
    const div = document.querySelector(".best-box .contents-container");
    div.style.animation = "fadein 3s";
  };

  const handleClickDivision = (e) => {
    setCategory(e.target.id);
  };

  const handleFormBtn = () => {
    nav("/promotion/write");
  };

  useEffect(() => {
    if (inView) {
      // 총 개수 받아서 page 넘어가면 api 호출 X
      if (totalCnt && boardList.length >= totalCnt) return;
      getPage(page, add);
    }
  }, [inView]);

  useEffect(() => {
    getPage(1);
  }, [sort, category]);

  useEffect(() => {
    getBannerList();
  }, []);

  return (
    <div className="pr-board-page page-margin">
      <BoardListHeader header="홍보게시판" />
      {bannerList.length ? (
        <div className="best-box ">
          <img className="bg-img" src={bannerList[bannerIndex]?.image_url[0] || "https://elice-5th.s3.amazonaws.com/promotions%252F1707380134216_teeny-box-icon.png"} />
          <div className="bg-mask">
            {Children.toArray(
              bannerList.map((post, idx) => (
                <div className={`absolute ${bannerIndex === idx && "visible"}`}>
                  <div className={"contents-container"}>
                    <div className="left-box">
                      <div className="sub-title">인기 소규모 연극</div>
                      <h2 className="title">
                        <Link to={`/promotion/${bannerList[bannerIndex].promotion_number}`}>{bannerList[bannerIndex]?.play_title}</Link>
                      </h2>
                      <div className="ellipsis">
                        <Link to={`/promotion/${bannerList[bannerIndex].promotion_number}`}>{bannerList[bannerIndex]?.title}</Link>
                      </div>

                      <div className="content">
                        {bannerList[bannerIndex].start_date && bannerList[bannerIndex].end_date && (
                          <div className="date">
                            <span className="lable">공연기간</span>
                            {bannerList[bannerIndex].start_date && <TimeFormat time={bannerList[bannerIndex].start_date} />}
                            {" ~ "}
                            {bannerList[bannerIndex].end_date && <TimeFormat time={bannerList[bannerIndex].end_date} />}
                          </div>
                        )}
                        {bannerList[bannerIndex].location && (
                          <div>
                            <span className="lable">장소</span>
                            {bannerList[bannerIndex].location}
                          </div>
                        )}
                        {bannerList[bannerIndex].host && (
                          <div>
                            <span className="lable">주최</span>
                            {bannerList[bannerIndex].host}
                          </div>
                        )}
                        {!bannerList[bannerIndex].runtime || (
                          <div>
                            <span className="lable">런타임</span>
                            {bannerList[bannerIndex].runtime} 분
                          </div>
                        )}
                      </div>
                      <div className="footer">
                        <VisibilityOutlined sx={{ fontSize: 20 }} />
                        <span>{bannerList[bannerIndex]?.views || 0}</span>
                        <ThumbUpOutlined sx={{ fontSize: 20 }} />
                        <span>{bannerList[bannerIndex]?.likes || 0}</span>
                        <SmsOutlined sx={{ fontSize: 20 }} />
                        <span>{bannerList[bannerIndex]?.comments || 0}</span>
                      </div>
                    </div>
                    <Link to={`/promotion/${bannerList[bannerIndex].promotion_number}`}>
                      <img className="poster" src={bannerList[bannerIndex]?.image_url[0] || "https://elice-5th.s3.amazonaws.com/promotions%252F1707380134216_teeny-box-icon.png"} />
                    </Link>
                  </div>
                </div>
              ))
            )}
            <ArrowBackIosRounded className="arrow-left pointer" onClick={handleClickLeftArrow} />
            <ArrowForwardIosRounded className="arrow-right pointer" onClick={handleClickRightArrow} />
          </div>
        </div>
      ) : (
        <Skeleton variant="rectangular" width={1110} height={420} sx={{ borderRadius: "6px", marginBottom: "60px" }} />
      )}
      <div className="header flex-box">
        <div className="division flex-box">
          <div id="" className={category === "" ? "selected" : ""} onClick={handleClickDivision}>
            전체보기
          </div>
          <div id="연극" className={category === "연극" ? "selected" : ""} onClick={handleClickDivision}>
            연극
          </div>
          <div id="기타" className={category === "기타" ? "selected" : ""} onClick={handleClickDivision}>
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
          <CircularProgress color="secondary" />
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
