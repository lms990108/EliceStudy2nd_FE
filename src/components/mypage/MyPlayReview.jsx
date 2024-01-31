/* 마이페이지 - 내가 작성한 연극 리뷰 게시판 */
import { DataGrid } from "@mui/x-data-grid";
import "./MyPlayReview.scss";
import Button from "@mui/material/Button";
import { reviewUrl } from "../../apis/apiURLs";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "번호", hide: true },
  { field: "tilte", headerName: "연극 제목", width: 250 },
  { field: "createdAt", headerName: "작성 시기", width: 250 },
  { field: "Rating", headerName: "별점", width: 150 },
];

const rows = [
  { id: 1, tilte: "Snow", Rating: "Jon", createdAt: 35 },
  { id: 2, tilte: "Lannister", Rating: "Cersei", createdAt: 42 },
  { id: 3, tilte: "Lannister", Rating: "Jaime", createdAt: 45 },
  { id: 4, tilte: "Stark", Rating: "Arya", createdAt: 16 },
  { id: 5, tilte: "Targaryen", Rating: "Daenerys", createdAt: 32 },
  { id: 6, tilte: "Melisandre", Rating: "sungjae", createdAt: 150 },
  { id: 7, tilte: "Clifford", Rating: "Ferrara", createdAt: 44 },
  { id: 8, tilte: "Frances", Rating: "Rossini", createdAt: 36 },
  { id: 9, tilte: "Roxie", Rating: "Harvey", createdAt: 65 },
];

function MyPlayReview({ user }) {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    console.log(user.user_id);
    const res = await fetch(`${reviewUrl}?userId=3293398850&page=1&limit=100`);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setReviews(data);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <div className="my-play-review-container">
        <div className="my-play-review-header">
          <h1>내가 작성한 연극 리뷰</h1>
          <Button variant="contained" color="orange" sx={{ width: "80px", height: "40px", color: "white" }}>
            <h4>삭제</h4>
          </Button>
        </div>
        <div style={{ height: "628px", width: "800px" }}>
          <DataGrid
            rows={reviews}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}

export default MyPlayReview;
