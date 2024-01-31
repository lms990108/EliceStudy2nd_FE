import { Button } from "@mui/material";
import "./State.scss";
import { ErrorOutline } from "@mui/icons-material";

export default function ServerError({ onClickBtn }) {
  return (
    <div className="state-layout">
      <div className="icon error">
        <ErrorOutline color="error" />
      </div>
      <h3>500 Internal Server Error</h3>
      <p>시스템의 문제로 데이터가 제공되지 않습니다. 잠시 후 다시 시도해주세요.</p>
      {onClickBtn && (
        <Button onClick={onClickBtn} color="error" variant="contained">
          다시 시도
        </Button>
      )}
    </div>
  );
}
