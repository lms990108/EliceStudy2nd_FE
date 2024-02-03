import FreeBoardList from "../../board-free/FreeBoardList";
import "./CommunitySearchResult.scss";

export default function CommunitySearchResult({ searchResult }) {
  return (
    <div className="community-search-result-container">
      <div className="search-header">
        <span>커뮤니티 검색 결과</span>
        <select className="sort-by" onChange={(e) => setSortStandard(e.target.value)}>
          {/* select에서 e.target.value는 option에 부여해준 value가 됨. */}
          <option value="new">최신순</option>
          <option value="old">오래된순</option>
        </select>
      </div>
      <FreeBoardList boardList={searchResult} />
    </div>
  );
}
