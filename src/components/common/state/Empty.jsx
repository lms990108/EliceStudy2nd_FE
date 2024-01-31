import { Button } from "@mui/material";
import "./State.scss";
import { InsertDriveFileOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Empty({ onClickBtn, children }) {
  return (
    <div className="state-layout">
      <div className="icon empty">
        <InsertDriveFileOutlined />
      </div>
      <h3>아직 데이터가 없습니다.</h3>
      {children || (
        <>
          <p>데이터가 없습니다. {onClickBtn ? "데이터를 추가하려면 아래 작성하기 버튼을 눌러주세요" : "연극을 찾아보고 다양한 기록을 남겨보세요"}</p>
          {onClickBtn ? (
            <Button onClick={onClickBtn} variant="contained">
              작성하기
            </Button>
          ) : (
            <Link className="link" to={`/play`}>
              연극 보러 가기
            </Link>
          )}
        </>
      )}
    </div>
  );
}
