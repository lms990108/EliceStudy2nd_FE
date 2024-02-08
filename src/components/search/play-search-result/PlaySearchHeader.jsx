import "./PlaySearchHeader.scss";

export default function PlaySearchHeader({ setSortStandard, setCurPage }) {
  return (
    <div className="play-search-header">
      <span>연극 검색결과</span>
      <select
        className="sort-by"
        onChange={(e) => {
          setSortStandard(e.target.value);
          setCurPage(1);
        }}
      >
        {/* select에서 e.target.value는 option에 부여해준 value가 됨. */}
        <option value="recent">최신순</option>
        <option value="rate">높은 평점순</option>
      </select>
    </div>
  );
}
