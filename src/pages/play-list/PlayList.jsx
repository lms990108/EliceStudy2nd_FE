import { useState, useEffect } from "react";
import "./PlayList.scss";
import ConditionSearch from "../../components/play-list/ConditionSearch";
import PlayListHeader from "../../components/play-list/PlayListHeader";
import PlayBox from "../../components/play-list/PlayBox";
import PaginationBox from "../../components/play-list/PaginationBox";
import RegionSelectBar from "../../components/play-list/RegionSelectBar";
import PlayListCalendar from "../../components/play-list/calendar-material/PlayListCalendar";
import { samplePlays } from "../../apis/plays/plays";

export default function PlayList() {
  // 전체 연극들
  const [plays, setPlays] = useState([]);
  // 지역별로 필터링 + 조건검색 필터링 + 정렬된 연극들 담기
  const [filteredPlays, setFilteredPlays] = useState([]);
  // 조건검색으로 필터링된 연극들 담기
  const [conditionPlays, setConditionPlays] = useState([]);
  // 페이지네이션별 연극들 자르기
  const [paginationPlays, setPaginationPlays] = useState([]);
  console.log(paginationPlays);
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

  // 처음에 전체 연극 데이터 한번만 쭉 받아오기
  useEffect(() => {
    const fetchPlays = async () => {
      try {
        setPlays(samplePlays.shows);
      } catch (err) {
        alert(err);
      }
    };

    fetchPlays();
  }, []);

  // 처음에 필터링된 연극들은 전체 연극들로 설정
  useEffect(() => {
    setFilteredPlays(plays);
  }, [plays]);

  // 연극 필터링하기
  useEffect(() => {
    if (selectedRegion === "전체") {
      setFilteredPlays(plays);
      return;
    }

    const filterByRegion = plays.filter(
      (play) => play.region === selectedRegion
    );
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
    setPaginationPlays(conditionPlays.slice(0, 16));
  }, [filteredPlays, conditionPlays]);

  // 처음 정렬 기준을 최신순으로 설정
  useEffect(() => {
    setSortStandard("new");
  }, [selectedRegion]);

  // 연극을 정렬하기 (처음 정렬 기준은 최신순으로 되어 있음. 정렬 기준을 바꿀 때마다 달라져야 하고, 지역이 바뀔 때 filteredPlays가 달라지므로 지역이 바뀌는지도 listen해야 함.)
  useEffect(() => {
    sortPlays();
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
    sortPlays();
  };

  // 연극 정렬 함수
  const sortPlays = () => {
    switch (sortStandard) {
      // 최신순으로 정렬
      case "new":
        setConditionPlays((pre) => {
          const newFilteredPlays = [...pre];
          newFilteredPlays.sort((play1, play2) => {
            // 최신순을 비교할 두 연극을 1970년 1월 1일로부터 경과한 시간(ms 단위)으로 바꾸어 더 많이 경과한 연극이 앞 순서에 위치할 수 있도록 하기
            const play1MS = new Date(play1.start_date).getTime();
            const play2MS = new Date(play2.start_date).getTime();
            return play2MS - play1MS;
          });
          return newFilteredPlays;
        });
        break;
      // 낮은 가격 순으로 정렬
      case "cheap":
        setConditionPlays((pre) => {
          const newFilteredPlays = [...pre];
          newFilteredPlays.sort((play1, play2) => {
            // 가격이 전석 가격이 아닐 경우 평균 가격으로 비교하기
            const getAveragePrice = (price) => {
              const regex = /[^0-9]/g;

              if (!price.includes("전석")) {
                // 숫자가 아닌 것들을 모두 찾아 빈 문자열로 대체하는 로직
                const splitPrice = price.split(", ").map((price) => {
                  price = price.replace(regex, "");
                  return parseInt(price);
                });
                // 평균 가격 구하기
                const averagePrice = Math.floor(
                  splitPrice.reduce((acc, cur) => acc + cur) / splitPrice.length
                );
                return averagePrice;
              }

              // 전석 가격일 경우 그냥 그 가격에서 숫자만 반환
              price = parseInt(price.replace(regex, ""));
              return price;
            };

            const play1Price = getAveragePrice(play1.price);
            const play2Price = getAveragePrice(play2.price);

            return play1Price - play2Price;
          });
          return newFilteredPlays;
        });
        break;
      // 종료 임박순으로 정렬 (이 부분은 나중에 실제 api 연결 후 잘 돌아가는지 확인하기)
      case "near-end":
        setConditionPlays((prevPlays) => {
          const currentDate = new Date().getTime();

          // 이미 끝난 연극과 끝나지 않은 연극을 나누기
          const filterEndPlays = prevPlays.filter(
            (play) => new Date(play.end_date).getTime() < currentDate
          );
          const filterNotEndPlays = prevPlays.filter(
            (play) => new Date(play.end_date).getTime() >= currentDate
          );

          // 끝나지 않은 연극을 종료 임박순으로 정렬
          filterNotEndPlays.sort((play1, play2) => {
            const play1MSGap = new Date(play1.end_date).getTime() - currentDate;
            const play2MSGap = new Date(play2.end_date).getTime() - currentDate;
            return play1MSGap - play2MSGap;
          });

          // 이미 끝난 연극과 끝나지 않은 연극을 합치고 상태로 설정
          const sortedPlays = [...filterNotEndPlays, ...filterEndPlays];
          return sortedPlays;
        });
        break;
      // 높은 평점순으로 정렬
      case "popular":
        break;
      default:
        break;
    }
  };

  return (
    <div className="play-list-container">
      <RegionSelectBar
        changeSelectedRegion={changeSelectedRegion}
        selectedRegion={selectedRegion}
        changeIsCalendar={changeIsCalendar}
        isCalendar={isCalendar}
      />
      {!isCalendar && (
        <ConditionSearch
          selectedRegion={selectedRegion}
          filteredPlays={filteredPlays}
          setConditionPlays={setConditionPlays}
          sortPlays={sortPlays}
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
          sortPlays={sortPlays}
        />
      )}
      {((!isCalendar && !conditionPlays.length) ||
        (isCalendar && clickedDate !== null && !datePlays[clickedDate])) && (
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
    </div>
  );
}
