import React, { useState, useEffect, createContext } from "react";
// import { ConditionContext } from "../../pages/play-list/PlayList";
import "./ConditionSearch.scss";
import ConditionSearchFrame from "./condition-search-material/ConditionSearchFrame";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";

// 조건 검색 시 사용할 context (컴포넌트 바깥에 따로 적어주어 export 해야지 undefined로 뜨지 않는다.)
export const ConditionContext = createContext();

export default function ConditionSearch({
  selectedRegion,
  filteredPlays,
  setConditionPlays,
  sortPlays,
  innerWidth,
}) {
  // 핸드폰에서 사용자가 펼치기를 눌렀는지 안눌렀는지를 나타내는 상태 정의
  const [isExpandClicked, setIsExpandClicked] = useState(false);
  // 적용하기 버튼이 클릭되었는지를 나타내는 상태
  const [isAdaptBtnClicked, setIsAdaptBtnClicked] = useState(false);

  // 화면에 띄울 조건 검색 텍스트 (반복되어 배열로 뺌)
  const conditionTexts = [
    // {
    //   division: "좌석 규모별",
    //   options: [
    //     "전체",
    //     "소극장 (300석 미만)",
    //     "중극장 (300 ~ 1000석)",
    //     "대극장 (1000석 이상)",
    //   ],
    // },
    {
      division: "공연 상태별",
      options: ["전체", "공연중", "공연예정", "공연완료"],
    },
    {
      division: "가격별",
      options: [
        "전체",
        "1만원 ~ 3만원 미만",
        "3만원 ~ 7만원 미만",
        "7만원 ~ 10만원 미만",
        "10만원 이상",
      ],
    },
  ];

  // 조건 검색 상태 정의
  const [conditions, setConditions] = useState(
    conditionTexts.reduce((acc, curr) => {
      acc[curr.division] = ["전체"];
      return acc;
    }, {})
  );

  useEffect(() => {
    setConditions(
      conditionTexts.reduce((acc, curr) => {
        acc[curr.division] = ["전체"];
        return acc;
      }, {})
    );
  }, [selectedRegion]);

  // 핸드폰 사이즈에서 클릭에 따라 조건 검색 펼치기 접기 상태를 제어하는 함수
  const handleConditionSearchExpand = () => {
    setIsExpandClicked(!isExpandClicked);
  };

  // 적용하기 버튼을 클릭했을 때
  const handleAdaptClick = (conditions) => {
    setConditionPlays(() => {
      let stateArray = [...filteredPlays];
      let priceArray = [];

      // 공연 상태별로 필터링
      if (!conditions["공연 상태별"].includes("전체")) {
        stateArray = stateArray.filter((play) =>
          conditions["공연 상태별"].includes(play.state)
        );
      }

      // 가격별로 필터링
      // 가격 정보에서 먼저 숫자 부분만 빼서 배열로 만들기
      if (!conditions["가격별"].includes("전체")) {
        priceArray = stateArray.filter((play) => {
          const regex = /[^0-9]/g;
          let arrayPrice;

          if (play.price.includes(", ")) {
            arrayPrice = play.price.split(", ").map((price) => {
              if (price.includes("층")) {
                price = price.replace(regex, "");
                price = price.substr(1);
              }
              price = price.replace(regex, "");
              return parseInt(price);
            });
          } else if (play.price.includes("무료")) {
            arrayPrice = [0];
          } else {
            arrayPrice = [parseInt(play.price.replace(regex, ""))];
          }

          return conditions["가격별"].some((priceCondition) => {
            if (priceCondition === "1만원 ~ 3만원 미만") {
              // 가격별로 arrayPrice(가격을 배열로 가공한 것)에서 하나라도 아래 가격 조건을 만족하면 priceArray에 포함될 수 있게 하였다.
              // (some method를 사용해 true이면 priceArray에 포함, 가격 조건을 만족하지 못하면 false가 반환되어 포함되지 않음.)
              return arrayPrice.some(
                (price) => 10000 <= price && price < 30000
              );
            }
            if (priceCondition === "3만원 ~ 7만원 미만") {
              return arrayPrice.some(
                (price) => 30000 <= price && price < 70000
              );
            }
            if (priceCondition === "7만원 ~ 10만원 미만") {
              return arrayPrice.some(
                (price) => 70000 <= price && price < 100000
              );
            }
            if (priceCondition === "10만원 이상") {
              return arrayPrice.some((price) => price >= 100000);
            }
            return false;
          });
        });

        // 가격 조건이 있을 경우 위에서 필터링을 거쳐 priceArray가 반환됨.
        return priceArray;
      }
      // 가격이 '전체' 일 경우 필터링을 거치지 않아도 되므로 이전의 stateArray가 반환됨.
      return stateArray;
    });
    sortPlays();
    setIsAdaptBtnClicked(true);
  };

  return (
    <>
      <div className="condition-search-header">
        <DoneIcon sx={{ fontSize: 40 }} />
        <span>조건 검색</span>
      </div>
      <div className="condition-search-main">
        {innerWidth > 480 && (
          <>
            {conditionTexts.map((conditionText, idx) => {
              return (
                <ConditionContext.Provider
                  value={{
                    conditions,
                    setConditions,
                    setIsAdaptBtnClicked,
                  }}
                  key={idx}
                >
                  <ConditionSearchFrame
                    key={idx}
                    division={conditionText.division}
                    options={conditionText.options}
                  />
                </ConditionContext.Provider>
              );
            })}
            <div className="adapt-button">
              {isAdaptBtnClicked &&
              (conditions["공연 상태별"][0] !== "전체" ||
                conditions["가격별"][0] !== "전체") ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAdaptClick(conditions)}
                >
                  <Typography
                    fontFamily="Nanum Gothic, sans-serif"
                    className="adapt-button-text"
                  >
                    적용중
                  </Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAdaptClick(conditions)}
                >
                  <Typography
                    fontFamily="Nanum Gothic, sans-serif"
                    className="adapt-button-text"
                  >
                    적용하기
                  </Typography>
                </Button>
              )}
            </div>
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
            {isExpandClicked ? (
              <div
              // className={
              // isExpandClicked ? null : "condition-search-display-none"
              // }
              >
                {conditionTexts.map((conditionText, idx) => {
                  return (
                    <ConditionContext.Provider
                      value={{
                        conditions,
                        setConditions,
                        setIsAdaptBtnClicked,
                      }}
                      key={idx}
                    >
                      <ConditionSearchFrame
                        key={idx}
                        division={conditionText.division}
                        options={conditionText.options}
                      />
                    </ConditionContext.Provider>
                  );
                })}
                <div className="adapt-button">
                  {isAdaptBtnClicked &&
                  (conditions["공연 상태별"][0] !== "전체" ||
                    conditions["가격별"][0] !== "전체") ? (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="success">
                        This is a success alert — check it out!
                      </Alert>
                    </Stack>
                  ) : null}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAdaptClick(conditions)}
                  >
                    <Typography
                      fontFamily="Nanum Gothic, sans-serif"
                      className="adapt-button-text"
                    >
                      적용하기
                    </Typography>
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
