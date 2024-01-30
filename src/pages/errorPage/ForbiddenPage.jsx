import { Link } from "react-router-dom";
import "./ForbiddenPage.scss";
import Button from "@mui/material/Button";

export function ForbiddenPage() {
  return (
    <div className="forbidden-page-container">
      <img src="/forbiddenIcon.png" />
      <h1>접근이 불가한 페이지입니다.</h1>
      <p>고객님은 현재 페이지에 대한 권한이 없어 접근이 불가합니다. </p>
      <p>입력하신 주소가 정확한지 확인해 주세요. </p>
      <Link to="/">
        <Button variant="contained" color="secondary">
          Teeny Box 메인 페이지로 이동
        </Button>
      </Link>
    </div>
  );
}
