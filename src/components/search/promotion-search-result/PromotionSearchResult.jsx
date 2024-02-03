import FreeBoardList from "../../board-free/FreeBoardList";
import PromotionSearchContentBox from "./PromotionSearchContentBox";
import "./PromotionSearchResult.scss";

export default function PromotionSearchResult({ searchResult }) {
  return (
    <div className="promotion-search-result-container">
      <div className="search-header">
        <span>홍보 게시글 검색 결과</span>
        <select className="sort-by" onChange={(e) => setSortStandard(e.target.value)}>
          {/* select에서 e.target.value는 option에 부여해준 value가 됨. */}
          <option value="new">최신순</option>
          <option value="old">오래된순</option>
        </select>
      </div>
      <div className="play-search-content">
        {searchResult.map((content) => (
          <PromotionSearchContentBox content={content} />
        ))}
      </div>
    </div>
  );
}
