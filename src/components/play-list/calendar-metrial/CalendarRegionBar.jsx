import React, { useState } from "react";
import "./CalendarRegionBar.scss";

export default function CalendarRegionMenu() {
  const [selectedRegion, setSelectedRegion] = useState("전체");

  const changeRegion = (e) => {
    setSelectedRegion(e.target.innerText.split(" ")[1]);
  };

  return (
    <div className="calendar-region-menu-container">
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
            onClick={(e) => {
              changeRegion(e);
            }}
            className={
              selectedRegion === region
                ? "calendar-region-selected-design"
                : "calendar-region-not-selected"
            }
          >
            # {region}
          </span>
        );
      })}
    </div>
  );
}
