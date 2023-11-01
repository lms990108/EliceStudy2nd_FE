import React from "react";
import "./ConditionSearch.scss";
import DoneIcon from "@mui/icons-material/Done";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ConditionSearch() {
  const handleClick = () => {
    console.log("적용하기 버튼 클릭!");
  };

  return (
    <>
      <div className="condition-search-header">
        <DoneIcon sx={{ fontSize: 40 }} />
        <span>조건 검색</span>
      </div>
      <div className="condition-search-main">
        <div className="flex-layout">
          <span className="label">좌석 규모별</span>
          <span className="checkbox">
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  전체
                </Typography>
              }
            />

            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  소극장 (300석 미만)
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  중극장 (300 ~ 1000석)
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  대극장 (1000석 이상)
                </Typography>
              }
            />
          </span>
        </div>
        <div className="flex-layout">
          <span className="label">공연 상태</span>
          <span className="checkbox ">
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  전체
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  공연중
                </Typography>
              }
            />
          </span>
        </div>
        <div className="flex-layout">
          <span className="label">가격</span>
          <span className="checkbox ">
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  전체
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  1만원 ~ 3만원 미만
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  3만원 ~ 7만원 미만
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  7만원 ~ 10만원 미만
                </Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={
                <Typography fontFamily="Nanum Gothic, sans-serif">
                  10만원 이상
                </Typography>
              }
            />
          </span>
        </div>
        <div className="adapt-button">
          <Button variant="contained" color="secondary" onClick={handleClick}>
            <Typography
              fontFamily="Nanum Gothic, sans-serif"
              className="button-text"
            >
              적용하기
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
}
