import "./PlayListHeader.scss";
import { FormControl, MenuItem, Select } from "@mui/material";

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
      <div className="sort">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={sortStandard}
            onChange={(e) => setSortStandard(e.target.value)}
            displayEmpty
          >
            <MenuItem value="recent">최신순</MenuItem>
            <MenuItem value="rate">높은 평점순</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
