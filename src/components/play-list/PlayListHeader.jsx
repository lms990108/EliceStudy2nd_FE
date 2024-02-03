import "./PlayListHeader.scss";

// 연극 개수와 정렬 기준
export default function PlayListHeader({
  count,
  setSortStandard,
  sortStandard,
}) {
  return (
    <div className="play-list-header">
      <div className="number-of-plays">
        <div className="play-count">
          <span>{count}개</span>의 연극
        </div>
      </div>
      <select
        className="sort-by"
        onChange={(e) => setSortStandard(e.target.value)}
        value={sortStandard}
      >
        {/* select에서 e.target.value는 option에 부여해준 value가 됨. */}
        <option value="recent">최신순</option>
        <option value="rate">높은 평점순</option>
      </select>
    </div>
  );
}
