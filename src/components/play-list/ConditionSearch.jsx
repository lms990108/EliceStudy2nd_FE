import React, { useContext } from "react";
import { ConditionContext } from "../../pages/play-list/PlayList";
import "./ConditionSearch.scss";
import ConditionSearchFrame from "./condition-search-material/ConditionSearchFrame";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ConditionSearch() {
  // Context API로 조건 검색 상태들 받아오기
  const conditionContext = useContext(ConditionContext);
  const { selectedCondition } = conditionContext;
  const { seatCondition, statusCondition, priceCondition } = selectedCondition;

  // 화면에 띄울 조건 검색 텍스트 (반복되어 배열로 뺌)
  const conditionTexts = [
    {
      division: "좌석 규모별",
      options: [
        "전체",
        "소극장 (300석 미만)",
        "중극장 (300 ~ 1000석)",
        "대극장 (1000석 이상)",
      ],
    },
    {
      division: "공연 상태별",
      options: ["전체", "공연중", "공연 예정"],
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

  // 적용하기 버튼을 클릭했을 때
  const handleAdaptClick = () => {
    if (!seatCondition.length) alert("좌석 규모별 조건을 선택해 주세요.");
    if (!statusCondition.length) alert("공연 상태별 조건을 선택해 주세요.");
    if (!priceCondition.length) alert("가격별 조건을 선택해 주세요.");
    // 공연을 사용자가 선택한 조건에 따라 필터링하는 로직
    // 공연 상태 설정할 수 있는 것들을 props로 받아야 함!
    // 만약에 상태가 빈 배열이면 빈 배열에 해당하는 부분을 선택해 달라고 알림을 띄워야 함!
    // 상태 배열에 원소가 여러개이더라도 '전체' 가 있으면 무조건 전체로 가기
  };

  return (
    <>
      <div className="condition-search-header">
        <DoneIcon sx={{ fontSize: 40 }} />
        <span>조건 검색</span>
      </div>
      <div className="condition-search-main">
        {conditionTexts.map((conditionText, idx) => {
          return (
            <ConditionSearchFrame
              key={idx}
              division={conditionText.division}
              options={conditionText.options}
            />
          );
        })}
        <div className="adapt-button">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAdaptClick}
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
    </>
  );
}
