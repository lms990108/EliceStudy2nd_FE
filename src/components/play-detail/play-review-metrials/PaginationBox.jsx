import "./PaginationBox.scss";
import Pagination from "@mui/material/Pagination";

export default function PaginationBox({
  showId,
  curPage,
  setCurPage,
  setAlert,
  setReviews,
  totalCount,
}) {
  const handlePageNumberChange = (e, number) => {
    setCurPage(number);

    fetch(
      `https://dailytopia2.shop/api/reviews?showId=${showId}&page=${number}&limit=10`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data.data))
      .catch(() => {
        setAlert({
          title: "오류",
          content: "리뷰 데이터를 받아오는 데 실패했습니다.",
          severity: "error",
          open: true,
          onclose: () => setAlert(null),
        });
      });
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
