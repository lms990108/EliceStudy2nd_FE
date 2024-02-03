import { useState, useEffect, useRef } from "react";
import "./PlayList.scss";
import ConditionSearch from "../../components/play-list/ConditionSearch";
import PlayListHeader from "../../components/play-list/PlayListHeader";
import PlayBox from "../../components/play-list/PlayBox";
import PaginationBox from "../../components/play-list/PaginationBox";
import RegionSelectBar from "../../components/play-list/RegionSelectBar";
import { AlertCustom } from "../../../src/components/common/alert/Alerts";
import Loading from "../../components/common/state/Loading";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import MovieIcon from "@mui/icons-material/Movie";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// 지역, 상태별, 가격별, 정렬 기준, 캘린더 여부 띄워야 함!
export function PlayList() {
  // 달력에서 날짜 선택 시 스크롤을 내리기 위한 ref
  const scrollRef = useRef(null);

  // 로딩중 여부
  const [isLoading, setIsLoading] = useState(true);
  // 전체 연극들
  const [plays, setPlays] = useState([]);
  // 선택된 지역
  const [selectedRegion, setSelectedRegion] = useState(["전체"]);
  // 선택된 정렬 기준 (최신순, 낮은 가격순, 종료 임박순, 인기순)
  const [sortStandard, setSortStandard] = useState("recent");
  // 현재 페이지
  const [curPage, setCurPage] = useState(1);
  // 가져와지는 총 연극 개수
  const [playTotalCnt, setPlayTotalCnt] = useState(0);
  // 현재 화면 너비에 따라 다르게 UI가 보여져야 하므로 innerWidth 상태도 정의
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  // fetch시 에러 상태 저장
  const [error, setError] = useState("");
  // 에러 발생 시 창을 띄우기 위한 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 화면에 띄울 조건 검색 텍스트
  const conditionTexts = [
    {
      division: "상태별",
      options: ["전체", "공연중", "공연예정", "공연완료"],
    },
    { division: "날짜별" },
    { division: "가격별" },
  ];

  // 조건 검색 상태 정의
  const [conditions, setConditions] = useState({
    가격별: [0, 100000],
    상태별: ["전체"],
    날짜별: null,
  });

  console.log(conditions);

  // 지역이 바뀌면 조건검색 부분 초기화
  useEffect(() => {
    setConditions({ 가격별: [0, 100000], 상태별: ["전체"] });
  }, [selectedRegion]);

  // 연극 데이터 받아오기
  useEffect(() => {
    const regionQuery =
      selectedRegion[0] === "전체"
        ? ""
        : selectedRegion.length === 1
        ? `region=${selectedRegion}&`
        : selectedRegion
            .map((region) => `region=${region}&`)
            .reduce((acc, cur) => acc + cur);

    const stateQuery =
      conditions["상태별"][0] === "전체"
        ? ""
        : conditions["상태별"].length === 1
        ? `state=${conditions["상태별"][0]}&`
        : conditions["상태별"]
            .map((state) => `state=${state}&`)
            .reduce((acc, cur) => acc + cur);

    const lowPriceQuery =
      conditions["가격별"][0] === 0
        ? ""
        : `lowPrice=${conditions["가격별"][0]}&`;

    const highPriceQuery =
      conditions["가격별"][1] === 100000
        ? ""
        : `highPrice=${conditions["가격별"][1]}&`;

    const dateQuery = conditions["날짜별"]
      ? `date=${conditions["날짜별"]}&`
      : "";

    console.log(
      `https://dailytopia2.shop/api/shows?${regionQuery}${stateQuery}${lowPriceQuery}${highPriceQuery}order=${sortStandard}&date=${dateQuery}&page=${curPage}&limit=24`
    );

    fetch(
      `https://dailytopia2.shop/api/shows?${regionQuery}${stateQuery}${lowPriceQuery}${highPriceQuery}order=${sortStandard}&date=${dateQuery}&page=${curPage}&limit=24`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setError("연극 목록을 가져오는 데 실패하였습니다.");
        }
      })
      .then((data) => {
        setIsLoading(true);
        setPlays(data.data);
        setPlayTotalCnt(data.total);
        setIsLoading(false);
      })
      .catch(() => {
        setError("연극 목록을 가져오는 데 실패하였습니다.");
        setIsAlertOpen(true);
        setIsLoading(false);
      });
  }, [selectedRegion, sortStandard, curPage, conditions]);

  // 지역이 바뀌면 클릭되어 있는 날짜 상태를 null로 다시 초기화하기 + 정렬 기준 초기화 + 조건검색 초기화
  useEffect(() => {
    setSortStandard("recent");
    setConditions({
      가격별: [0, 100000],
      상태별: ["전체"],
      날짜별: null,
    });
  }, [selectedRegion]);

  // 페이지네이션 초기화
  useEffect(() => {
    setCurPage(1);
  }, [selectedRegion, conditions, sortStandard]);

  // 화면 너비 조절 이벤트를 듣도록 하기
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  // 지역을 누를 경우 (캘린더가 보기가 아닐 경우) selectedRegion state를 변경
  const changeSelectedRegion = (e, region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="play-list-container">
      {error ? (
        <AlertCustom
          title={"Error"}
          content={error}
          open={isAlertOpen}
          onclose={() => setIsAlertOpen(false)}
          severity={"error"}
        />
      ) : null}
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <RegionSelectBar
            changeSelectedRegion={changeSelectedRegion}
            selectedRegion={selectedRegion}
          />
          <ConditionSearch
            sortStandard={sortStandard}
            conditionTexts={conditionTexts}
            innerWidth={innerWidth}
            conditions={conditions}
            setConditions={setConditions}
            selectedRegion={selectedRegion}
          />
          <Stack direction="row" spacing={2} className="adapted-conditions">
            {conditions["상태별"][0] === "전체" ? (
              <Chip icon={<MovieIcon />} label="공연 상태 전체" />
            ) : (
              conditions["상태별"].map((state, idx) => (
                <Chip icon={<MovieIcon />} label={state} key={idx} />
              ))
            )}
            {conditions["가격별"][0] === 0 &&
            conditions["가격별"][1] === 100000 ? (
              <Chip icon={<LocalAtmIcon />} label="가격 전체" />
            ) : (
              <Chip
                icon={<LocalAtmIcon />}
                label={conditions["가격별"]
                  .map((price) => price + "원")
                  .join(" ~ ")}
              />
            )}
            {conditions["날짜별"] ? (
              <Chip icon={<CalendarMonthIcon />} label={conditions["날짜별"]} />
            ) : null}
          </Stack>
          {!playTotalCnt ? (
            <>
              <PlayListHeader
                count={playTotalCnt}
                setSortStandard={setSortStandard}
                sortStandard={sortStandard}
              />
              <div className="play-no-exsist">
                <h2>연극이 존재하지 않습니다.</h2>
              </div>
            </>
          ) : null}
          {playTotalCnt > 0 ? (
            <>
              <PlayListHeader
                count={playTotalCnt}
                setSortStandard={setSortStandard}
                sortStandard={sortStandard}
              />
              <div className="play-list-main">
                {plays.map((play) => (
                  <PlayBox
                    key={play.showId}
                    playInfo={{
                      playId: play.showId,
                      imgSrc: play.poster,
                      title: play.title,
                      place: play.location,
                      period:
                        play.start_date.split("T")[0] +
                        " ~ " +
                        play.end_date.split("T")[0],
                      price: play.price,
                      state: play.state,
                    }}
                  />
                ))}
              </div>
              {playTotalCnt ? (
                <PaginationBox
                  innerWidth={innerWidth}
                  playsCount={playTotalCnt}
                  plays={plays}
                  selectedRegion={selectedRegion}
                  sortStandard={sortStandard}
                  setCurPage={setCurPage}
                  curPage={curPage}
                />
              ) : null}
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
