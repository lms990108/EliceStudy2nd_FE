import "./PaginationBox.scss";
import Pagination from "@mui/material/Pagination";

export default function PaginationBox({ curPage, setCurPage, totalCount }) {
  const handlePageNumberChange = (e, number) => {
    setCurPage(number);
  };

  return (
    <div className="pagination-box-container">
      <Pagination
        count={Math.ceil(totalCount / 10)}
        page={curPage}
        color="secondary"
        onChange={handlePageNumberChange}
      />
    </div>
  );
}
