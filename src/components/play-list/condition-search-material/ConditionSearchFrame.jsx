import React from "react";
import "./ConditionSearchFrame.scss";
import ConditionCheckBox from "./ConditionCheckBox";

// 조건 검색 부분 반복되는 부분이 많아서 틀 컴포넌트 만듦!
export default function ConditionSearchFrame({ division, options }) {
  return (
    <div className="flex-layout">
      <span className="condition-label">{division}</span>
      <div className="condition-checkbox">
        {options.map((option, idx) => {
          return (
            <ConditionCheckBox key={idx} division={division} option={option} />
          );
        })}
      </div>
    </div>
  );
}
