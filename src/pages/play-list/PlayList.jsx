import { useState, useEffect } from "react";
import "./PlayList.scss";
import ConditionSearch from "../../components/play-list/ConditionSearch";
import PlayListHeader from "../../components/play-list/PlayListHeader";
import PlayBox from "../../components/play-list/PlayBox";
import PaginationBox from "../../components/play-list/PaginationBox";
import RegionSelectBar from "../../components/play-list/RegionSelectBar";
import PlayListCalendar from "../../components/play-list/calendar-material/PlayListCalendar";
import { AlertCustom } from "../../../src/components/common/alert/Alerts";
import Loading from "../../components/common/loading/Loading";
import useSortPlays from "../../hooks/playCustomHooks/useSortPlays";

export function PlayList() {
  // 로딩중 여부
  const [isLoading, setIsLoading] = useState(true);
  // 전체 연극들
  const [plays, setPlays] = useState([]);
  // 지역별로 필터링 + 조건검색 필터링 + 정렬된 연극들 담기
  const [filteredPlays, setFilteredPlays] = useState([]);
  // 조건검색으로 필터링된 연극들 담기
  const [conditionPlays, setConditionPlays] = useState([]);
  // 페이지네이션별 연극들 자르기
  const [paginationPlays, setPaginationPlays] = useState([]);
  // 날짜별로 연극들 담기
  const [datePlays, setDatePlays] = useState({});
  // 달력에서 사용자가 클릭한 날짜
  const [clickedDate, setClickedDate] = useState(null);
  // 선택된 지역
  const [selectedRegion, setSelectedRegion] = useState("전체");
  // 캘린더로 보기 선택 여부 (false가 리스트, true가 캘린더)
  const [isCalendar, setIsCalendar] = useState(false);
  // 선택된 정렬 기준 (최신순, 낮은 가격순, 종료 임박순, 인기순)
  const [sortStandard, setSortStandard] = useState("");
  // 현재 화면 너비에 따라 다르게 UI가 보여져야 하므로 innerWidth 상태도 정의
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  // fetch시 에러 상태 저장
  const [error, setError] = useState("");
  // 에러 발생 시 창을 띄우기 위한 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 처음에 전체 연극 데이터 한번만 쭉 받아오기
  useEffect(() => {
    fetch("https://dailytopia2.shop/api/shows?page=1&limit=1000")
      .then((res) => res.json())
      .then((data) => {
        setPlays(data.shows.filter((show) => show.price !== ""));
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(() => {
        setError("연극 목록을 가져오는 데 실패하였습니다.");
        setIsAlertOpen(true);
        setIsLoading(false);
      });
  }, []);

  // 처음에 필터링된 연극들은 전체 연극들로 설정
  useEffect(() => {
    setFilteredPlays(plays);
  }, [plays]);

  // 연극 지역별로 필터링하기
  useEffect(() => {
    if (selectedRegion === "전체") {
      setFilteredPlays(plays);
      return;
    }

    const filterByRegion = plays.filter((play) => {
      if (selectedRegion.includes("/")) {
        return selectedRegion.includes(play.region);
      }
      return play.region === selectedRegion;
    });
    setFilteredPlays(filterByRegion);
    setConditionPlays(filterByRegion);
  }, [selectedRegion]);

  // filteredPlays가 바뀌면 conditionPlays도 따라가야 함.
  useEffect(() => {
    setConditionPlays(filteredPlays);
  }, [filteredPlays]);

  // 처음에는 페이지가 1이므로 paginationPlays를 0번부터 15번까지 연극으로 설정
  // filteredPlays가 달라질 때마다 paginationPlays에서 보여져야 하는 연극들도 달라져야 함
  useEffect(() => {
    setPaginationPlays(conditionPlays.slice(0, 24));
  }, [filteredPlays, conditionPlays]);

  // 처음 정렬 기준을 최신순으로 설정
  useEffect(() => {
    setSortStandard("new");
  }, [selectedRegion]);

  // 연극을 정렬하기 (처음 정렬 기준은 최신순으로 되어 있음. 정렬 기준을 바꿀 때마다 달라져야 하고, 지역이 바뀔 때 filteredPlays가 달라지므로 지역이 바뀌는지도 listen해야 함.)
  useEffect(() => {
    useSortPlays(sortStandard, setConditionPlays);
  }, [sortStandard, selectedRegion, filteredPlays]);

  // 지역이 바뀌면 클릭되어 있는 날짜 상태를 null로 다시 초기화하기
  useEffect(() => {
    setClickedDate(null);
  }, [selectedRegion]);

  // 화면 너비 조절 이벤트를 듣도록 하기
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  // 지역을 누를 경우 (캘린더가 보기가 아닐 경우) selectedRegion state를 변경
  const changeSelectedRegion = (e) => {
    setSelectedRegion((prevRegion) => {
      if (e.target.innerText === "캘린더로 보기") {
        return prevRegion;
      }
      return e.target.innerText;
    });
  };

  // 캘린더로 보기를 누를 경우 isCalendar state를 변경
  // 캘린더로 보기는 지역에 종속된 것이므로 selectedRegion state는 그대로여야 함!
  const changeIsCalendar = () => {
    setIsCalendar((prev) => !prev);
    setConditionPlays(filteredPlays);
    setSortStandard("new");
    setClickedDate(null);
    useSortPlays(sortStandard, setConditionPlays);
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
            changeIsCalendar={changeIsCalendar}
            isCalendar={isCalendar}
          />
          {!isCalendar && (
            <ConditionSearch
              sortStandard={sortStandard}
              selectedRegion={selectedRegion}
              filteredPlays={filteredPlays}
              setConditionPlays={setConditionPlays}
              innerWidth={innerWidth}
            />
          )}
          {isCalendar && (
            <PlayListCalendar
              innerWidth={innerWidth}
              filteredPlays={filteredPlays}
              datePlays={datePlays}
              setDatePlays={setDatePlays}
              setClickedDate={setClickedDate}
              setPaginationPlays={setPaginationPlays}
              setConditionPlays={setConditionPlays}
              sortStandard={sortStandard}
              clickedDate={clickedDate}
            />
          )}
          {((!isCalendar && !conditionPlays.length) ||
            (isCalendar &&
              clickedDate !== null &&
              !datePlays[clickedDate])) && (
            <div className="play-no-exsist">
              <h2>연극이 존재하지 않습니다.</h2>
            </div>
          )}
          {!isCalendar && conditionPlays.length > 0 && (
            <>
              <PlayListHeader
                count={conditionPlays.length}
                setSortStandard={setSortStandard}
                sortStandard={sortStandard}
              />
              <div className="play-list-main">
                {/* 보여져야 하는 것은 페이지네이션 된 연극이므로 filteredPlays 대신 paginationPlays 사용! */}
                {paginationPlays.map((play) => (
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
              {conditionPlays.length ? (
                <PaginationBox
                  innerWidth={innerWidth}
                  playsCount={conditionPlays.length}
                  conditionPlays={conditionPlays}
                  setPaginationPlays={setPaginationPlays}
                  selectedRegion={selectedRegion}
                  sortStandard={sortStandard}
                />
              ) : null}
            </>
          )}
          {isCalendar && clickedDate !== null && datePlays[clickedDate] && (
            <>
              <PlayListHeader
                count={datePlays[clickedDate].length}
                setSortStandard={setSortStandard}
                sortStandard={sortStandard}
              />
              <div className="play-list-main">
                {/* 보여져야 하는 것은 페이지네이션 된 연극이므로 filteredPlays 대신 paginationPlays 사용! */}
                {paginationPlays.map((play) => (
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
                    }}
                  />
                ))}
              </div>
              <PaginationBox
                innerWidth={innerWidth}
                playsCount={conditionPlays.length}
                conditionPlays={conditionPlays}
                setPaginationPlays={setPaginationPlays}
                selectedRegion={selectedRegion}
                sortStandard={sortStandard}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
