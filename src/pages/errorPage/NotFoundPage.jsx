import { Link } from "react-router-dom";
import "./NotFoundPage.scss";
import Button from "@mui/material/Button";

export function NotFoundPage({ prev }) {
  return (
    <div className="not-found-page-container">
      <img src="/notFoundIcon.png" />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>현재 페이지는 존재하지 않거나 사용할 수 없는 페이지입니다.</p>
      <p>입력하신 주소가 정확한지 확인해 주세요. </p>
      <Link to={prev ? -1 : "/"}>
        <Button variant="contained" color="secondary">
          {prev ? "이전 페이지로 이동" : "Teeny Box 메인 페이지로 이동"}
        </Button>
      </Link>
    </div>
  );
}
