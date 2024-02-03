import React from "react";
import "./RegionSelectBar.scss";

export default function RegionSelectBar({
  changeSelectedRegion,
  selectedRegion,
}) {
  return (
    <div className="play-region-select-container">
      {/* 여기는 지역 조정하는 부분! */}
      <div className="play-region-select">
        {[
          ["전체"],
          ["서울"],
          ["경기/인천"],
          ["대전", "충청", "세종"],
          ["강원"],
          ["부산", "울산"],
          ["대구", "경상"],
          ["광주", "전라"],
          ["제주"],
        ].map((region) => {
          return (
            <span
              key={region[0]}
              onClick={(e) => changeSelectedRegion(e, region)}
              className={`${
                selectedRegion[0] === region[0]
                  ? "play-region-selected-design"
                  : "non-selected-design"
              } ${
                selectedRegion[0] === region[0] && region[0] === "전체"
                  ? "all-region-border"
                  : selectedRegion[0] === region[0] && region[0] === "제주"
                  ? "jeju-border"
                  : ""
              }`}
            >
              {region.length[0]
                ? region
                : region.includes("세종")
                ? "대전/충청"
                : region.join("/")}
            </span>
          );
        })}
      </div>
    </div>
  );
}
