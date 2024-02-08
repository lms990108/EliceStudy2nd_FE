import { Button } from "@mui/material";
import "./State.scss";
import { ErrorOutline, ManageSearchOutlined } from "@mui/icons-material";

export default function EmptySearchResult({ onClickBtn, play, type }) {
  return (
    <div className="state-layout search-result">
      <div className="icon empty">
        <ManageSearchOutlined color="empty" />
      </div>
      <h3>검색 결과가 없습니다.</h3>
      <p className="search-result">
        {type && <li>검색 범위를 변경해 보세요.</li>}
        <li>단어의 철자가 정확한지 확인해 보세요.</li>
        <li>한글을 영어로, 영어를 한글로 입력했는지 확인해 보세요.</li>
        {play && <li>정확한 연극명을 모를 경우, 연극명 일부만으로 검색해보세요.</li>}
      </p>
      {onClickBtn && (
        <Button onClick={onClickBtn} color="error" variant="contained">
          다시 시도
        </Button>
      )}
    </div>
  );
}
