import "./PlaySearchHeader.scss";

export default function PlaySearchHeader({ setSortStandard, setCurPage, resultCnt }) {
  return (
    <div className="play-search-header">
      <div>
        <span>연극 검색결과</span>
        <span className="count">({resultCnt.toLocaleString("ko-KR")})</span>
      </div>
      <select
        className="sort-by"
        onChange={(e) => {
          setSortStandard(e.target.value);
          setCurPage(1);
        }}
      >
        <option value="recent">최신순</option>
        <option value="rate">높은 평점순</option>
      </select>
    </div>
  );
}
