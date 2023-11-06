import React, { useCallback } from "react";
import "./PlayList.scss";
import ConditionSearch from "../../components/play-list/ConditionSearch";
import PlayListHeader from "../../components/play-list/PlayListHeader";
import PlayBox from "../../components/play-list/PlayBox";
import PaginationBox from "../../components/play-list/PaginationBox";
import RegionSelectBar from "../../components/play-list/RegionSelectBar";
import PlayListCalendar from "../../components/play-list/calendar-material/PlayListCalendar";
import samplePlays from "../../apis/plays/plays";
import { useState, useEffect, createContext } from "react";

// 조건 검색 시 사용할 context (컴포넌트 바깥에 따로 적어주어 export 해야지 undefined로 뜨지 않는다.)
export const ConditionContext = createContext();

export default function PlayList() {
  // 보여져야 할 연극들
  const [plays, setPlays] = useState([]);
  // 선택된 지역
  const [selectedRegion, setSelectedRegion] = useState("전체");
  // 캘린더로 보기 선택 여부 (false가 리스트, true가 캘린더)
  const [isCalendar, setIsCalendar] = useState(false);
  // 조건 검색: 사용자가 선택한 좌석 조건 (초깃값 빈배열로 둔 이유는 ConditionCheckBox.jsx에서 checked의 초깃값을 defaultCheck(전체)로 설정하여 setState 함수 실행하면 자동으로 처음에 배열에 '전체'가 채워지게 해 둠)
  const [seatCondition, setSeatCondition] = useState([]);
  // 조건 검색: 사용자가 선택한 공연 상태
  const [statusCondition, setStatusCondition] = useState([]);
  // 조건 검색: 사용자가 선택한 가격
  const [priceCondition, setPriceCondition] = useState([]);
  // 현재 화면 너비에 따라 다르게 UI가 보여져야 하므로 innerWidth 상태도 정의
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  // 처음에 전체 연극 데이터 한번만 쭉 받아오기
  useEffect(() => {
    setPlays(samplePlays);
  }, []);

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
        <ConditionContext.Provider
          value={{
            selectedCondition: {
              seatCondition,
              statusCondition,
              priceCondition,
            },
            setSelectedCondition: {
              setSeatCondition,
              setStatusCondition,
              setPriceCondition,
            },
          }}
        >
          <ConditionSearch setPlays={setPlays} />
        </ConditionContext.Provider>
      )}
      {isCalendar && <PlayListCalendar innerWidth={innerWidth} />}
      <PlayListHeader count={plays.length} />
      {!plays.length && (
        <div className="play-no-exsist">
          <h2>연극이 존재하지 않습니다.</h2>
        </div>
      )}
      {plays.length > 0 && (
        <div className="play-list-main">
          {plays.map((play) => (
            <PlayBox
              key={play.mt20id}
              playInfo={{
                playId: play.mt20id,
                imgSrc: play.poster,
                title: play.prfnm,
                place: play.fcltynm,
                period: play.prfpdfrom + " ~ " + play.prfpdto,
                price: play.pcseguidance,
              }}
            />
          ))}
        </div>
      )}
      <PaginationBox innerWidth={innerWidth} />
    </div>
  );
}
