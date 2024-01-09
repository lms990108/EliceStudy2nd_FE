import { useState, useEffect } from "react";
import "./PlaySearchHeader.scss";
import useSortPlays from "../../../hooks/playCustomHooks/useSortPlays";

export default function PlaySearchHeader({ setPlaySearchResult }) {
  const [sortStandard, setSortStandard] = useState("new");
  useEffect(() => {
    useSortPlays(sortStandard, setPlaySearchResult);
  }, [sortStandard]);

  return (
    <div className="play-search-header">
      <span>연극 검색 결과</span>
      <select
        className="sort-by"
        onChange={(e) => setSortStandard(e.target.value)}
      >
        {/* select에서 e.target.value는 option에 부여해준 value가 됨. */}
        <option value="new">최신순</option>
        <option value="cheap">낮은 가격순</option>
        <option value="near-end">종료 임박순</option>
        <option value="high-rated">높은 평점순</option>
      </select>
    </div>
  );
}
