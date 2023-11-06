import React from "react";
import ConditionCheckBox from "./ConditionCheckBox";

// 조건 검색 부분 반복되는 부분이 많아서 틀 컴포넌트 만듦!
export default function ConditionSearchFrame({ division, options }) {
  return (
    <div className="flex-layout">
      <span className="condition-label">{division}</span>
      <div className="condition-checkbox">
        {options.map((option, idx) => {
          // 연극 리스트 페이지에 접속했을 때 디폴트로 체크되어 있는 값은 '전체'
          const defaultCheck = option === "전체" ? true : false;
          return (
            <ConditionCheckBox
              key={idx}
              division={division}
              option={option}
              defaultCheck={defaultCheck}
            />
          );
        })}
      </div>
    </div>
  );
}
