import React from "react";
import "./RegionSelectBar.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuIcon from "@mui/icons-material/Menu";

export default function RegionSelectBar({
  changeSelectedRegion,
  selectedRegion,
  changeIsCalendar,
  isCalendar,
}) {
  return (
    <div className="play-region-select-container">
      {/* 여기는 지역 조정하는 부분! */}
      <div className="play-region-select">
        {[
          "전체",
          "서울",
          "경기/인천",
          "대전/충청",
          "강원",
          "부산/울산",
          "대구/경상",
          "광주/전라",
          "제주",
        ].map((region) => {
          return (
            <span
              key={region}
              onClick={(e) => changeSelectedRegion(e)}
              className={
                selectedRegion === region ? "play-region-selected-design" : null
              }
            >
              {region}
            </span>
          );
        })}
      </div>
      {/* 여기는 캘린더로 보기 or 리스트로 보기 조정하는 부분! */}
      <div className="play-calendar-select">
        {!isCalendar && (
          <>
            <CalendarMonthIcon color="secondary" fontSize="large" />
            <span
              onClick={() => changeIsCalendar()}
              // className="play-calendar-selected-design"
            >
              캘린더로 보기
            </span>
          </>
        )}
        {isCalendar && (
          <>
            <MenuIcon color="secondary" fontSize="large" />
            <span
              onClick={() => changeIsCalendar()}
              // className="play-calendar-selected-design"
            >
              리스트로 보기
            </span>
          </>
        )}
      </div>
    </div>
  );
}
