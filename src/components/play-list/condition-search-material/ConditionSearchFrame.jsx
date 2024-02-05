import { useContext, useState } from "react";
import "./ConditionSearchFrame.scss";
import ConditionCheckBox from "./ConditionCheckBox";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { ConditionContext } from "../ConditionSearch";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import koLocale from "date-fns/locale/ko"; // 한국어 로케일 추가
import dayjs from "dayjs";
import Button from "@mui/material/Button";

const marks = [
  { value: 0, label: "무료" },
  { value: 10, label: "1만원" },
  { value: 20, label: "2만원" },
  { value: 30, label: "3만원" },
  { value: 40, label: "4만원" },
  { value: 50, label: "5만원" },
  { value: 60, label: "6만원" },
  { value: 70, label: "7만원" },
  { value: 80, label: "8만원" },
  { value: 90, label: "9만원" },
  { value: 100, label: "전체" },
];

function valuetext(value) {
  return `${value}원`;
}

export default function ConditionSearchFrame({
  division,
  options,
  innerWidth,
}) {
  const { conditions, setConditions } = useContext(ConditionContext);
  const [values, setValues] = useState([
    conditions["가격별"][0] ? conditions["가격별"][0] / 1000 : 0,
    conditions["가격별"][1] / 1000,
  ]);

  const handleChangeSlider = (event, newValues) => {
    setValues(newValues);
    const priceRange = newValues.map((val) => val * 1000);
    setConditions((prev) => {
      const newObj = { ...prev };
      newObj["가격별"] = priceRange;
      return newObj;
    });
  };

  const handleChangeDatePicker = (date, info) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    if (!info.validationError && date !== null) {
      setConditions((prev) => {
        const newObj = { ...prev };
        newObj["날짜별"] = formattedDate;
        return newObj;
      });
    }
  };

  const dateReset = () => {
    setConditions((prev) => {
      const newObj = { ...prev };
      newObj["날짜별"] = null;
      return newObj;
    });
  };

  return (
    <div className="flex-layout">
      <span className="condition-label">{division}</span>
      {division === "상태별" && (
        <div className="condition-checkbox">
          {options.map((option, idx) => (
            <ConditionCheckBox key={idx} division={division} option={option} />
          ))}
        </div>
      )}
      {division === "날짜별" && (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale={koLocale}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{ marginLeft: "30px", padding: "5px 0 10px 0" }}
            >
              <DatePicker
                format="YYYY/MM/DD"
                onChange={handleChangeDatePicker}
                value={
                  conditions["날짜별"] ? dayjs(conditions["날짜별"]) : null
                }
              />
            </DemoContainer>
          </LocalizationProvider>
          {conditions["날짜별"] ? (
            <Button
              color="secondary"
              sx={{ marginLeft: "10px" }}
              size="large"
              onClick={dateReset}
              readOnly
            >
              초기화
            </Button>
          ) : (
            <Button size="large" disabled sx={{ marginLeft: "10px" }}>
              초기화
            </Button>
          )}
        </>
      )}
      {division === "가격별" && (
        <div className="condition-checkbox">
          <Box sx={innerWidth >= 800 ? { width: 700 } : { width: 500 }}>
            <Slider
              value={values}
              onChange={handleChangeSlider}
              getAriaValueText={valuetext}
              step={10}
              marks={marks}
              color="secondary"
              sx={{ marginLeft: "13px" }}
            />
          </Box>
        </div>
      )}
    </div>
  );
}
