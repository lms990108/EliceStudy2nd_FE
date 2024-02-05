import React, { useState, createContext, useEffect } from "react";
import "./ConditionSearch.scss";
import ConditionSearchFrame from "./condition-search-material/ConditionSearchFrame";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

// 조건 검색 시 사용할 context (컴포넌트 바깥에 따로 적어주어 export 해야지 undefined로 뜨지 않는다.)
export const ConditionContext = createContext();

export default function ConditionSearch({
  conditionTexts,
  innerWidth,
  conditions,
  setConditions,
  selectedRegion,
}) {
  const [isExpandClicked, setIsExpandClicked] = useState(false);

  useEffect(() => {
    setIsExpandClicked(false);
  }, [selectedRegion]);

  const handleConditionSearchExpand = () => {
    setIsExpandClicked(!isExpandClicked);
  };

  return (
    <>
      <div className="condition-search-header">
        <ManageSearchIcon sx={{ fontSize: 32 }} />
        <span>&nbsp;조건 검색</span>
      </div>
      <div className="condition-search-main">
        {innerWidth > 480 && (
          <>
            <div
              className="condition-search-accordian"
              style={
                isExpandClicked
                  ? { borderBottom: "1px solid rgba(188, 188, 188, 0.5)" }
                  : {}
              }
              onClick={() => handleConditionSearchExpand()}
            >
              <p>
                {!isExpandClicked ? "조건 검색 펼치기" : "조건 검색 접기"}&nbsp;
              </p>
              {!isExpandClicked ? (
                <KeyboardDoubleArrowDownIcon />
              ) : (
                <KeyboardDoubleArrowUpIcon />
              )}
            </div>
            {isExpandClicked && (
              <div>
                {conditionTexts.map((conditionText, idx) => (
                  <ConditionContext.Provider
                    value={{
                      conditions,
                      setConditions,
                    }}
                    key={idx}
                  >
                    <ConditionSearchFrame
                      key={idx}
                      division={conditionText.division}
                      options={conditionText.options}
                      innerWidth={innerWidth}
                    />
                  </ConditionContext.Provider>
                ))}
              </div>
            )}
          </>
        )}

        {innerWidth <= 480 && (
          <>
            <div
              className="condition-search-accordian"
              onClick={() => handleConditionSearchExpand()}
            >
              <p>
                {!isExpandClicked ? "조건 검색 펼치기 ▼" : "조건 검색 접기 ▲"}
              </p>
            </div>
            {isExpandClicked && (
              <div>
                {conditionTexts.map((conditionText, idx) => (
                  <ConditionContext.Provider
                    value={{
                      conditions,
                      setConditions,
                    }}
                    key={idx}
                  >
                    <ConditionSearchFrame
                      key={idx}
                      division={conditionText.division}
                      options={conditionText.options}
                      innerWidth={innerWidth}
                    />
                  </ConditionContext.Provider>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
