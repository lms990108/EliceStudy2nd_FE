import React from "react";
import "./RegionSelectBar.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function RegionSelectBar({
  changeSelectedRegion,
  selectedRegion,
}) {
  return (
    <div className="play-region-select-container">
      <div className="play-region-select">
        {[
          "전체",
          "서울",
          "경기/인천",
          "충청",
          "강원",
          "경상",
          "전라",
          "제주",
        ].map((region) => {
          return (
            <span
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
      <div className="play-calendar-select">
        <CalendarMonthIcon color="secondary" fontSize="large" />
        <span
          onClick={(e) => changeSelectedRegion(e)}
          className={
            selectedRegion === "캘린더로 보기"
              ? "play-calendar-selected-design"
              : null
          }
        >
          캘린더로 보기
        </span>
      </div>
    </div>
  );
}
