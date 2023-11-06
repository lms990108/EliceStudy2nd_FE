import React, { useState, useEffect, useContext } from "react";
import { ConditionContext } from "../../../pages/play-list/PlayList";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export default function ConditionCheckBox({ division, option, defaultCheck }) {
  // 체크박스를 클릭하면 조건 배열에 들어있는 상태가 바뀌어야 하므로 ContextAPI로 상태 변경을 위한 함수를 가져옴.
  const conditionContext = useContext(ConditionContext);
  const { setSelectedCondition } = conditionContext;
  const { setSeatCondition, setStatusCondition, setPriceCondition } =
    setSelectedCondition;

  // 사용자가 체크박스를 클릭했는지 클릭하지 않았는지를 나타냄.
  const [isChecked, setIsChecked] = useState(defaultCheck);

  // 체크박스를 클릭 시 checked 상태 반전
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  // checked 상태가 변했을 시 아래 코드 실행
  // 체크표시가 된 경우 해당 option을 상태 배열에 추가, 해제된 경우 해당 option을 상태 배열에서 없애기
  useEffect(() => {
    if (isChecked) {
      switch (division) {
        case "좌석 규모별":
          setSeatCondition((prev) => {
            return Array.from(new Set([...prev, option]));
          });
          break;
        case "공연 상태별":
          setStatusCondition((prev) => {
            return Array.from(new Set([...prev, option]));
          });
          break;
        case "가격별":
          setPriceCondition((prev) => {
            return Array.from(new Set([...prev, option]));
          });
          break;
        default:
          return;
      }
    } else {
      switch (division) {
        case "좌석 규모별":
          setSeatCondition((prev) =>
            Array.from(new Set(prev.filter((item) => item !== option)))
          );
          break;
        case "공연 상태별":
          setStatusCondition((prev) =>
            Array.from(new Set(prev.filter((item) => item !== option)))
          );
          break;
        case "가격별":
          setPriceCondition((prev) =>
            Array.from(new Set(prev.filter((item) => item !== option)))
          );
          break;
        default:
          return;
      }
    }
  }, [isChecked]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          color="secondary"
          defaultChecked={defaultCheck}
          ischecked={isChecked.toString()}
          value={option}
          onChange={handleCheckboxClick}
        />
      }
      label={
        <Typography fontFamily="Nanum Gothic, sans-serif">{option}</Typography>
      }
    />
  );
}
