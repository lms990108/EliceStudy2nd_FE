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
        <span>{count}개</span>의 연극
      </div>
      <select
        className="sort-by"
        onChange={(e) => setSortStandard(e.target.value)}
        value={sortStandard}
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
